<template>
  <div class="container" v-if="mount">
    <Calendar />

    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Actions</th>
          <th>Last edited by</th>
        </tr>
      </thead>
      <tbody>
        <Entry v-for="(entry, index) in entries" :key="entry.id"
          value="entry"
          @input="updateEntry(index, entry)" />
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from 'firebase'
import leftPad from 'left-pad'
import _ from 'lodash'
import assert from 'assert'

export default {
  data () {
    return {
      mount: false,
      entries: null,
    }
  },
  mounted () {
    this.mount = true
  },
  components: {
    Entry: require('~/components/Entry.vue'),
  },
  computed: {
    chosenDate () {
      const re = /^(20[0-9]{2})-([0-9]{2})-([0-9]{2})$/

      if (!this.params.date || !re.test(this.params.date)) {
        const dt = new Date()

        return [
          leftPad(dt.getFullYear(), 4, '0'),
          leftPad(dt.getMonth() + 1, 2, '0'),
          leftPad(dt.getDate(), 2, '0'),
        ].join('-')
      } else {
        return this.params.date
      }
    },
    dbResource () {
      if (!process.BROWSER_BUILD) return null

      return firebase.database()
      .ref(`diaries/${this.$route.params._id}/${this.chosenDate}`)
    }
  },
  watch: {
    dbResource: {
      immediate: true,
      handler (res) {
        if (!res) return

        res.on('value', (r) => {
          this.entries = _(r.val())
            .toPairs()
            .map(([id, data]) => ({
              ...data,
              id
            }))
            .value()
        })
      }
    },
  },
  methods: {
    /* Does two things:
    1. update the local cache
    2. sync with firebase
    */
    updateEntry (index, entry) {
      assert(entry.id)
      this.entries[index] = entry

      this.dbResource.child(entry.id)
        .set(entry)
    }
  }
}
</script>
