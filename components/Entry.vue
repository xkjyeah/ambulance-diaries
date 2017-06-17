<template>
  <tr>
    <td><TimeInput type="text" v-model="entry.time" @input="updateEntry('time', $event.target.value)" /></td>
    <td><textarea :value="entry.description" @change="updateEntry('description', $event.target.value)" /></td>
    <td><SyncIndicator ref="syncIndicator" /></td>
  </tr>
</template>
<script>
import _ from 'lodash'
import firebase from 'firebase'

function blankEntry () {
  return {id: null, time: null, description: null}
}

export default {
  props: ['value'],
  data () {
    return {
      entry: null
    }
  },
  components: {
    TimeInput: require('~/components/TimeInput.vue'),
  },
  watch: {
    value: {
      immediate: true,
      handler (v) {
        if (!v) {
          this.entry = blankEntry()
        } else {
          // extract from history
          this.entry = v.current
        }
      }
    }
  },
  methods: {
    updateEntry (field, value) {
      this.entry[field] = value
    },
    sync: _.debounce(function () {
      const newKey = firebase.db().ref('/dummy').push()
      this.$emit('input', {
        current: this.entry,
        history: {
          ...this.value.history,
          [newKey]: this.entry
        }
      })
    }, 5000, {leading: false, trailing: true})
  }
}
</script>
