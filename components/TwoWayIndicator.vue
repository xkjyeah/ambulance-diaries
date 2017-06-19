<template>
  <div>
    <div class="printable">
      {{ value ? '2W' : '' }}
    </div>
    <div class="screen-only">
      <label>
        <input type="checkbox" :checked="value"
          @change="$emit('input', $event.target.checked)"/>
        2W
      </label>
    </div>
  </div>
</template>
<script>
export default {
  props: ['value']
}
</script>
<style lang="scss">
@media print {
  .printable {
    display: block;
  }
  .screen-only {
    display: none;
  }
}
@media screen {
  .printable {
    display: none;
  }
  .screen-only {
    display: block;
  }
}
</style>
