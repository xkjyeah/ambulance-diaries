<template>
  <tr class="entry" :class="{
    cancelled: entry.status === 'cancelled'
    }">
    <td class="index">
      {{index + 1}}
    </td>
    <td class="team">
      <input type="text" :value="entry.team" @input="updateEntry('team', $event.target.value)" />
    </td>
    <td class="time">
      <TimeInput type="text" :value="entry.startTime" @input="updateEntry('startTime', $event)" />
      <TimeInput type="text" :value="entry.endTime" @input="updateEntry('endTime', $event)" />
    </td>
    <td>
      <input type="text" :value="entry.source" @input="updateEntry('source', $event.target.value)" />
      <!-- <br/> -->
    </td>
    <td>
      <label><input type="checkbox" :checked="entry.twoWay" @change="updateEntry('twoWay', $event.target.checked)"/>2W</label>
    </td>
    <td>
      <input type="number" step="0.01" :value="entry.price" @input="updateEntry('price', $event.target.value)" />
    </td>
    <!-- <td>
      <input type="text" :value="entry.receiptNumber" @input="updateEntry('receiptNumber', $event.target.value)" />
    </td> -->
    <td><AutogrowTextarea :value="entry.description" @input="updateEntry('description', $event)" /></td>
    <td>
      <!-- cancel / uncancel -->
      <a class="btn btn-xs btn-danger" @click="updateEntry('status', 'cancelled')"
          v-if="entry.status !== 'cancelled'">
        <span class="glyphicon glyphicon-remove"></span>
      </a>
      <a class="btn btn-xs btn-success" @click="updateEntry('status', null)"
          v-else>
        <span class="glyphicon glyphicon-repeat"></span>
      </a>

      <!-- view history -->
      <!-- <button class="btn btn-default" @click="$emit('view-history')">
        <span class="glyphicon glyphicon-hourglass"></span>
      </button> -->
    </td>
    <td>??</td>
    <td>
      <SyncIndicator :lastModified="lastModified" :lastSaved="lastSaved" />
    </td>
  </tr>
</template>
<script>
// import _ from 'lodash'
// import * as firebase from 'firebase'

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
    lastModified: null,
    lastSaved: null
  }
}

export default {
  props: ['index', 'value', 'lastModified', 'lastSaved', 'showExtra'],
  data () {
    return {
      entry: null,
      internalLastModified: 0,
    }
  },
  components: {
    TimeInput: require('~/components/TimeInput.vue'),
    SyncIndicator: require('~/components/SyncIndicator.vue'),
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
    }
  }
}
</script>

<style lang="scss">
.entry {
  td {
    vertical-align: top;
    label {
      display: inline;
      font-weight: normal;
      margin: 0;
      padding: 0;
    }
  }
  &.cancelled {
    &, & textarea, & input {
      text-decoration: line-through;
    }
  }
}
</style>
