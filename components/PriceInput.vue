<template>
  <input type="number" :value="value" @change="verify" />
</template>
<script>
import numeral from 'numeral'

export default {
  props: ['value'],
  methods: {
    verify ($event) {
      const value = $event.target.value
      const parsed = parseFloat(value)

      if (value === '' || isNaN(parsed)) {
        this.$emit('input', null)
      } else {
        this.$emit('input', numeral(parsed).format('0,0.00'))
      }
    }
  }
}
</script>
