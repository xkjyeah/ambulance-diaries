<template>
  <div class="entry entry-content" :class="{
    cancelled: entry.status === 'cancelled',
    'is-event': (/event/i).test(entry.source),

    completed: entry.completed,
    soon: timeStatus(entry) === 'soon',
    over: timeStatus(entry) === 'over',
    }">
    <div class="index">
      {{index + 1}}
    </div>
    <DatasheetCell class="team"
      :value="entry.team"
      @input="updateEntry('team', $event)"
    />
    <!-- <div class="team">
      <input type="text" :value="entry.team" @input="updateEntry('team', $event.target.value)" />
    </div> -->
    <DatasheetCell :value="entry.startTime">
      <TimeInput slot="editor" class="the-editor"
        type="text" :value="entry.startTime"
        @input="updateEntry('startTime', $event)" />
    </DatasheetCell>

    <DatasheetCell :value="entry.endTime" :class="{invalid: !entry.endTime && entry.twoWay}">
      <TimeInput slot="editor" class="the-editor"
        type="text" :value="entry.endTime"
        @input="updateEntry('endTime', $event)" />
    </DatasheetCell>
    <DatasheetCell class="source"
      :value="entry.source"
      @input="updateEntry('source', $event)"
      />
    <div class="twoway">
      <TwoWayIndicator :value="entry.twoWay" @input="updateEntry('twoWay', $event)"/>
    </div>

    <DatasheetCell :value="entry.price">
      <PriceInput slot="editor" class="the-editor"
        type="text" :value="entry.price"
        @input="updateEntry('price', $event)" />
    </DatasheetCell>
    <!-- <div>
      <input type="text" :value="entry.receiptNumber" @input="updateEntry('receiptNumber', $event.target.value)" />
    </div> -->
    <DatasheetCell class="description"
      :value="entry.description"
      @input="updateEntry('description', $event)"
      >
      <div class="textarea">{{entry.description}}</div>
    </DatasheetCell>
    <div class="actions">
      <!-- cancel / uncancel -->
      <a class="btn btn-xs btn-danger"
        href="#"
        @click.prevent="updateEntry('status', 'cancelled')"
          v-if="entry.status !== 'cancelled'">
        <i class="mdi mdi-cancel"></i>
      </a>

      <a class="btn btn-xs btn-success"
        href="#"
        @click.prevent="updateEntry('status', null)"
          v-else>
        <i class="mdi mdi-backup-restore"></i>
      </a>

      &nbsp;

      <a class="btn btn-xs btn-danger"
        href="#"
        @click.prevent="updateEntry('completed', !entry.completed)"
        >
        <i v-if="!entry.completed" class="mdi mdi-checkbox-marked-circle-outline"></i>
        <i v-else class="mdi mdi-checkbox-marked-circle"></i>
      </a>

      <!-- view history -->
      <!-- <button class="btn btn-default" @click="$emit('view-history')">
        <span class="glyphicon glyphicon-hourglass"></span>
      </button> -->
    </div>
    <div class="editedBy"><Initials :value="entry.lastEditedBy" /></div>
    <div class="indicator">
      <SyncIndicator :lastModified="lastModified" :lastSaved="lastSaved" />
    </div>
  </div>
</template>
<script>

function blankEntry () {
  return {
    id: null,
    source: null,
    price: null,
    twoWay: false,
    team: null,
    time: null,
    description: null,
    status: null,
    completed: false,
    lastModified: null,
    lastSaved: null
  }
}

export default {
  props: ['index', 'value', 'lastModified', 'lastSaved', 'showExtra', 'now', 'date'],
  data () {
    return {
      entry: null,
      internalLastModified: 0,
    }
  },
  components: {
    DatasheetCell: require('./DatasheetCell.vue'),
    TimeInput: require('~/components/TimeInput.vue'),
    PriceInput: require('~/components/PriceInput.vue'),
    SyncIndicator: require('~/components/SyncIndicator.vue'),
    TwoWayIndicator: require('~/components/TwoWayIndicator.vue'),
    Initials: require('~/components/Initials.vue'),
    AutogrowTextarea: require('~/components/AutogrowTextarea.vue')
  },
  watch: {
    value: {
      immediate: true,
      handler (v) {
        if (!v) {
          this.entry = blankEntry()
        } else {
          this.entry = {
            ...blankEntry(),
            ...v
          }
        }
      }
    }
  },
  methods: {
    updateEntry (field, value) {
      this.entry[field] = value
      this.internalLastModified = Date.now()
      this.sync()
    },
    sync: function () {
      this.$emit('input', this.entry)
    },
    timeStatus (entry) {
      const start = combineDateTime(this.date, entry.startTime)
      const end = combineDateTime(this.date, entry.endTime)

      if (!start) {
        return false
      } else if (!end) {
        return (Math.abs(this.now - start.getTime()) < 15 * 60000) ? 'soon' : false
      } else {
        return (this.now - start.getTime() < -15 * 60000) ? false
          : (this.now - end.getTime() < 0) ? 'soon'
          : (this.now - end.getTime() < 15 * 60000) ? 'over'
          : false
      }
    }
  }
}

const hhmmRE = /([0-9]{2}):([0-9]{2})/

function combineDateTime (date, timeStr) {
  if (!timeStr || !date) return null

  const match = timeStr.match(hhmmRE)
  if (!match) return null

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    parseInt(match[1]),
    parseInt(match[2]),
  )
}
</script>
<style lang="scss">
.entry {
  // td {
  //   vertical-align: top;
  //   label {
  //     display: inline;
  //     font-weight: normal;
  //     margin: 0;
  //     padding: 0;
  //   }
  // }
  &.cancelled {
    &, & textarea, & input {
      text-decoration: line-through;
    }
  }

  .invalid {
    background-color: #FCC;
  }

  &.completed:nth-child(even) > div {
    background-color: #8F8;
  }
  &.completed:nth-child(odd) > div {
    background-color: #AFA;
  }

  &.soon {
    border: solid 2px red;
    box-sizing: border-box;
  }
  &.over {
    border: dotted 2px #C66;
    box-sizing: border-box;
  }
}
</style>
