<template>
  <textarea :value="value" @input="$emit('input', $event.target.value)"
    :style="{height: height}"
    @keyup="regrow"
    ref="textarea"
    class="autogrow"/>
</template>
<script>
export default {
  props: [
    'defaultHeight',
    'value'
  ],
  data () {
    return {
      height: this.defaultHeight || '2em'
    }
  },
  mounted () {
    // this.$watch('value', () => this.regrow(), {immediate: true})
    this.regrow()
  },
  methods: {
    regrow () {
      // Auto-Grow-TextArea script.
      // Script copyright (C) 2011 www.cryer.co.uk.
      // Script is free to use provided this copyright header is included.
      const textField = this.$refs.textarea

      if (textField.clientHeight < textField.scrollHeight) {
        this.height = textField.scrollHeight + 'px'
      }
    }
  }
}
</script>

<style>
textarea.autogrow {
  resize: none;
  font-family: sans-serif;
  overflow: hidden;
  transition: height 0.1s linear;
}
</style>
