<template>
  <div class="container" v-if="mount">
    <div class="left">

      <div v-if="!user">
        <button @click="logIn()">Log In</button>
      </div>
      <div v-else>
        Logged in as {{user.email}}
        <button @click="logOut()">Log Out</button>
      </div>
      <br/>
      <br/>

      <Calendar :month="chosenDateAsDate" :value="chosenDateAsDate" />

      <br/>
      <br/>

      <div>
        <button @click="addEntry" class="btn btn-primary">
          <span class="glyphicon glyphicon-plus"></span>
          Add Entry
        </button>
      </div>
      <br/>
      <br/>

      <FirebaseACL :store="`acls/${this.$route.params.id}`"/>
      <div>
        <!-- <label>
          <input type="checkbox" v-model="showExtra" />
          Show Extra
        </label> -->
      </div>
    </div>
    <div class="right">

      <div v-if="syncError">
        Oh noes! Error synchronizing!
        {{syncError.message}}
      </div>

      <div class="entry-list">

        <template v-if="entries">
          <EntryHeader @sort="filter.order = $event.order, filter.orderBy=$event.orderBy"
            :order="filter.order"
            :orderBy="filter.orderBy" />
          <EntryContent v-for="(entry, index) in sortedEntries"
            :index="index"
            :showExtra="showExtra"
            :key="entry.id"
            :value="entry.data"
            :lastSaved="entry.lastSaved"
            :lastModified="entry.lastModified"
            @input="updateEntry(entry.id, $event)" />
        </template>
        <div v-else>
          <img src="../../../assets/img/spinner.svg" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    Not mounted for scriptsrc
  </div>
</template>

<script>
import firebase from 'firebase'
import leftPad from 'left-pad'
import _ from 'lodash'
// import assert from 'assert'

export default {
  data () {
    return {
      mount: false,
      showExtra: false,
      entries: null,
      uncommitted: {},
      syncError: false,
      currentSync: null,
      filter: {
        order: 'asc',
        orderBy: 'data.startTime',
      },
      user: null,
    }
  },
  mounted () {
    this.mount = true
    firebase.auth().onAuthStateChanged(() => {
      this.user = _.clone(firebase.auth().currentUser)

      // Update our user entry
      const currentUser = firebase.auth().currentUser

      if (currentUser) {
        firebase.database()
        .ref(`/users/${currentUser.uid}`)
        .set({
          email: currentUser.email
        })
      }
    })
  },
  components: {
    EntryContent: require('~/components/EntryContent.vue'),
    EntryHeader: require('~/components/EntryHeader.vue'),
    FirebaseACL: require('~/components/FirebaseACL.vue'),
    Calendar: require('~/components/Calendar.vue'),
    SortTh: require('~/components/SortTh.vue'),
  },
  computed: {
    chosenDate () {
      const re = /^(20[0-9]{2})-([0-9]{2})-([0-9]{2})$/

      if (!this.$route.params.date || !re.test(this.$route.params.date)) {
        const dt = new Date()

        return [
          leftPad(dt.getFullYear(), 4, '0'),
          leftPad(dt.getMonth() + 1, 2, '0'),
          leftPad(dt.getDate(), 2, '0'),
        ].join('-')
      } else {
        return this.$route.params.date
      }
    },
    chosenDateAsDate () {
      return this.chosenDate && new Date(this.chosenDate)
    },
    dbResource () {
      if (!process.BROWSER_BUILD) return null

      return firebase.database()
      .ref(`diaries/${this.$route.params.id}/${this.chosenDate}`)
    },
    cacheResource () {
      if (!process.BROWSER_BUILD) return null

      return firebase.database()
      .ref(`countCache/${this.$route.params.id}/${this.chosenDate}`)
    },
    mergedEntries () {
      // Merge entries committed with current changes
      const entryIds = _.keyBy(this.entries, 'id')

      const result = this.entries.map((entry) => {
        // For now, automatically discard uncommitted changes
        const uncommitted = this.uncommitted[entry.id]
        const hasUncommitedChanges = uncommitted && uncommitted.lastModified >= entry.lastModified
        const mergedData = hasUncommitedChanges
              ? uncommitted.data
              : entry.data

        return {
          id: entry.id,
          data: mergedData,
          lastModified: hasUncommitedChanges ? uncommitted.lastModified : entry.lastModified,
          lastSaved: entry.lastModified,
        }
      })
      // Append the new entries
      .concat(_(this.uncommitted)
        .values()
        .filter(c => !entryIds[c.id])
        .map(c => ({
          ...c,
          lastSaved: null,
        }))
        .value()
      )
      return result
    },
    sortedEntries () {
      /* eslint-disable no-unused-vars */
      // const [oldEntries, newEntries] = _.partition(this.mergedEntries, 'lastCommitId')
      const [oldEntries, newEntries] = _.partition(this.mergedEntries, x => x.lastSaved)
      const [active, cancelled] = _.partition(oldEntries, x => _.get(x, 'data.status') !== 'cancelled')

      return _.orderBy(
        active,
        [this.filter.orderBy],
        [this.filter.order]
      ).concat(_.orderBy(
        cancelled,
        [this.filter.orderBy],
        [this.filter.order]
      )).concat(newEntries)
    },
    activeCount () {
      return this.entries && this.entries.filter(x => x.data.status !== 'cancelled').length
    }
  },
  watch: {
    activeCount () {
      this.updateCounts()
    },
    cacheResource (res, oldRes) {
      if (oldRes) oldRes.off()
    },
    dbResource: {
      immediate: true,
      handler (res, oldRes) {
        if (oldRes) oldRes.off()
        if (!res) return

        res.on('value', (r) => {
          const rv = r.val()

          if (!rv) {
            this.entries = []
          } else {
            this.entries = _(rv)
              .toPairs()
              .map(([id, data]) => ({
                ...data,
                id
              }))
              .value()
          }
        })
      }
    },
    'mount' () {
      this.entries = null
      if (!this.mount && this.$el) {
        this.mount = true
      }
    },
  },
  methods: {
    /* Does two things:
    1. update the local cache
    2. sync with firebase
    */
    updateEntry (entryId, entry) {
      this.uncommitted = {
        ...this.uncommitted,
        [entryId]: {
          id: entryId,
          data: entry,
          lastModified: Date.now(),
        }
      }
      this.sync()
    },
    sync: _.throttle(function () {
      // Previous sync in progress
      if (this.currentSync) {
        return
      } else {
        // snapshot of current changes
        const changes = this.uncommitted

        // gather all the merges:
        const updates = _(changes)
          .values()
          .map(c => {
            const newKey = this.dbResource.push().key

            return [
              `/${c.id}`,
              c
            ]
          })
          .fromPairs()
          .value()

        this.currentSync = this.dbResource.update(updates)
          .then(() => {
            this.currentSync = null
            this.syncError = false

            // clear out the old commits
            this.uncommitted = _(this.uncommitted)
              .toPairs()
              .filter(([key, value]) => value.lastModified > changes[key].lastModified)
              .fromPairs()
              .value()
          })
          .catch((err) => {
            console.log(err)
            this.syncError = err
            this.currentSync = null
          })
      }
    }, 1000, {leading: false, trailing: true}),
    addEntry () {
      const newKey = this.dbResource.push().key
      this.uncommitted = {
        ...this.uncommitted,
        [newKey]: {
          id: newKey,
          data: {
            id: newKey
          },
          lastModified: null,
        }
      }
    },
    updateCounts () {
      if (!this.cacheResource || this.activeCount === null) return

      this.cacheResource.on('value', (c) => {
        const cv = c.val()

        if (this.activeCount === 0) {
          if (cv !== null && cv !== undefined) {
            this.cacheResource.remove()
          }
        } else if (c.val() !== this.activeCount) {
          this.cacheResource.set(this.activeCount)
        }
      })
    },
    logIn () {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider)
      .then(() => {
        // Update our user entry
        const currentUser = firebase.auth().currentUser

        console.log(currentUser)

        firebase.database()
        .ref(`/users/${currentUser.uid}`)
        .set({
          email: currentUser.email
        })
      })
    },
    logOut () {
      firebase.auth().signOut()
    }
  },
  destroyed () {
    this.dbResource && this.dbResource.off()
    this.cacheResource && this.cacheResource.off()
  }
}
</script>

<style lang="scss">

@media print {
  .container .left {
    display: none;
  }
}
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  .left {
    flex: 0 1 240px;
  }
  .right {
    flex: 1 1 auto;
  }
}

.entry-list {
  width: 100%;

  tbody tr {
    td.team {
      input[type=text] {
        width: 100%;
      }
    }
    td.index {
      text-align: center;
    }
    td.time {
      input[type="text"], input[type="number"] {
        width: 50%;
      }
    }
  }

  thead {
    tr {
      th.team {
        width: 8em;
      }
      th.time {
        width: 8em;
      }
      th.description {
        width: 50%;
      }
      th {
        width: 4em;
        border-right: solid 0.5px black;
        border-left: solid 0.5px black;
      }
      th:last-child {
        width: 5%;
      }
    }
  }

  tbody {
    tr td {
      position: relative;
      line-height: 1.0;

      border-right: solid 0.5px black;
      border-left: solid 0.5px black;

      input[type="text"], input[type="number"] {
        width: 4em;
      }
      textarea {
        width: 100%;
      }
      input[type="text"], textarea, input[type="number"] {
        background: transparent;
        border: solid 0.5px #DDD;
        margin: 0; padding: 0;
        height: 20px;
        display: inline-block;
        vertical-align: baseline;
      }
    }
  }

  th:not(.sortable) {
    background-color: #DDD;
  }
  th.sortable {
    background-color: #FFF;
    position: relative;
    cursor: pointer;

    &.sort-asc {
      &:after {
        content: "˄";
        position: absolute;
        bottom: 0.5em;
        right: 0.5em;
      }
    }
    &.sort-desc {
      &:after {
        content: "˅";
        position: absolute;
        bottom: 0.5em;
        right: 0.5em;
      }
    }
  }
}
</style>