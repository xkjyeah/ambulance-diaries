<template>
  <DatePicker :month="currentlyViewedMonth" :value="value" @input="selectDate"
    class="date-picker" :offset="0"
    :specialDates="specialDates"
    @month-changed="currentlyViewedMonth = $event"/>
</template>
<style lang="scss">
table.date-picker {
  border-collapse: collapse;

  th {
    background-color: #DDDDDD;
    width: 2em;
  }
  td, th {
    text-align: center;
    padding: 0em 0.5em 1em;
    cursor: pointer;
    border: solid 0.5px #CCC;
  }
  td {
    position: relative;

    .annotation {
      position: absolute;
      background-color: #F05;
      bottom: 0;
      right: 0;
    }

    &.today {
      text-decoration: underline;
    }
    &:hover {
      background-color: #FDD;
    }
    &.selected {
      background-color: #800;
      color: #FFF;
    }
    &.different-month {
      color: #DDD;
    }
  }
}
</style>
<script>
import firebase from 'firebase'
import _ from 'lodash'

export default {
  props: [
    'value', 'month'
  ],
  data () {
    return {
      currentlyViewedMonth: this.month || new Date(),
      counts: []
    }
  },
  components: {
    DatePicker: require('./DatePicker.vue')
  },
  methods: {
    selectDate (date) {
      this.$router.push({
        name: 'diaries-id-date',
        params: {
          id: this.$route.params.id,
          date: date.toISOString().substr(0, 10),
        }
      })
    }
  },
  computed: {
    countResource () {
      if (!process.BROWSER_BUILD) return null

      return firebase.database()
      .ref(`countCache/${this.$route.params.id}`)
    },
    specialDates () {
      const now = new Date()

      return [
        {
          date: now,
          classes: ['today']
        }
      ].concat(this.counts)
    }
  },
  watch: {
    'countResource': {
      immediate: true,
      handler (res, oldRes) {
        if (oldRes) oldRes.off()
        if (!res) return

        res.on('value', (r) => {
          const val = r.val()

          if (!val) {
            this.counts = []
          } else {
            this.counts = _(val)
              .toPairs()
              .map(([date, count]) => ({
                date: new Date(date),
                annotation: `${count}`
              }))
              .value()
          }
        })
      }
    }
  },
  destroyed () {
    this.countResource && this.countResource.off()
  }
}
</script>
