<template>
  <div>
    {{initials}}
  </div>
</template>
<script>
export default {
  props: ['value'],
  computed: {
    initials () {
      return (this.value || '').split(' ')
        .map(x => x.charAt(0).toUpperCase())
        .join('.')
    }
  }
}
</script>
