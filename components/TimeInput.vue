<template>
  <input type="text" :value="value" @change="verify" />
</template>
<script>
import leftPad from 'left-pad'
const timeRE = /^([0-9]{1,2}):?([0-9]{2})$/

export default {
  props: ['value'],
  methods: {
    verify ($event) {
      const value = $event.target.value

      if (!value) {
        this.$emit('input', null)
      } else {
        const match = timeRE.match(value)
        if (match) {
          this.$emit('input', [
            leftPad(timeRE[1], 2, '0'),
            leftPad(timeRE[2], 2, '0')
          ].join(':'))
        } else {
          // do nothing -- don't update
        }
      }
    }
  }
}
</script>
