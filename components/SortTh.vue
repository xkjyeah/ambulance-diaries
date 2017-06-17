<script>
export default {
  props: ['order', 'orderBy', 'field', 'tag'],
  computed: {
    nextOrder () {
      return ((this.order === 'asc') ^ (this.orderBy === this.field)) ? 'asc' : 'desc'
    }
  },
  render (h) {
    return h(
      this.tag || 'th',
      {
        on: {
          click () {
            this.$emit('sort', {orderBy: this.field, order: this.nextOrder})
          }
        },
        'class': {
          sortable: this.field,
          'sort-asc': this.orderBy === this.field && this.order === 'asc',
          'sort-desc': this.orderBy === this.field && this.order === 'desc',
        }
      },
      this.$slots.default
    )
  }
}
</script>
