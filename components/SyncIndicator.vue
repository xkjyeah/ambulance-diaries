<template>
  <span v-if="status2 === 'dirty'">
    …
  </span>
  <span v-else-if="status2 === 'justSaved'">
    ✔
  </span>
</template>

<script>
export default {
  props: ['lastSaved', 'lastModified'],
  data () {
    return {status2: false}
  },
  computed: {
    status () {
      if (this.lastSaved >= this.lastModified) {
        return 'justSaved'
      } else {
        return 'dirty'
      }
    }
  },
  watch: {
    status () {
      this.status2 = this.status
      if (this.status2 === 'justSaved') {
        setTimeout(() => {
          this.status2 = ''
        }, 1000)
      }
    }
  }
}
</script>
