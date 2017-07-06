<template>
  <table>
    <thead>
      <tr>
        <th @click="currentlyViewedMonth = prevMonth">‹</th>
        <th colspan="5">{{ (this.monthFormat || (x => this.f.date(x, 'mmmm yyyy')))(monthCanonical) }}</th>
        <th @click="currentlyViewedMonth = nextMonth">›</th>
      </tr>
      <tr>
        <th>S</th>
        <th>M</th>
        <th>T</th>
        <th>W</th>
        <th>T</th>
        <th>F</th>
        <th>S</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="week in weeks">
        <td v-for="day in [0,1,2,3,4,5,6]" @click="clicked(week[day])" :class="dayClasses(week[day])">
          {{week[day].day}}
          <span class="annotation" v-if="week[day].annotation">
            {{week[day].annotation}}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import dateformat from 'dateformat'
import _ from 'lodash'

export default {
  props: [
    'value',
    'multiple',
    'offset',
    'month',
    'specialDates',
    'defaultDisable',
    'monthFormat',
  ],
  data () {
    return {
      currentlyViewedMonth: this.month || new Date()
    }
  },
  watch: {
    currentlyViewedMonth (v) {
      this.$emit('month-changed', v)
    }
  },
  computed: {
    f () {
      return {date: dateformat}
    },
    prevMonth () {
      return new Date(Date.UTC(
        this.monthCanonical.getUTCFullYear(),
        this.monthCanonical.getUTCMonth() - 1,
        1,
      ) + this.effectiveOffset)
    },
    nextMonth () {
      return new Date(Date.UTC(
        this.monthCanonical.getUTCFullYear(),
        this.monthCanonical.getUTCMonth() + 1,
        1,
      ) + this.effectiveOffset)
    },
    monthCanonical () {
      const month = this.currentlyViewedMonth || new Date()

      return new Date(month.getTime() - this.effectiveOffset)
    },
    firstDayOfCalendar () {
      const firstDayOfMonth = new Date(Date.UTC(
        this.monthCanonical.getUTCFullYear(),
        this.monthCanonical.getUTCMonth(),
        1
      ))

      return new Date(Date.UTC(
        firstDayOfMonth.getUTCFullYear(),
        firstDayOfMonth.getUTCMonth(),
        firstDayOfMonth.getUTCDate() - firstDayOfMonth.getUTCDay()
      ))
    },
    effectiveOffset () {
      return (typeof this.offset === 'number')
        ? this.offset
        : new Date().getTimezoneOffset() * 60000
    },
    specialDatesByTime () {
      if (!this.specialDates) return () => null

      // Build the date index for raw date values
      const dateIndex = {}
      this.specialDates
        .filter(s => s.date instanceof Date)
        .forEach(specialDate => {
          const canonicalTime = this.canonicalTime(specialDate.date)
          dateIndex[canonicalTime] = dateIndex[canonicalTime] || []
          dateIndex[canonicalTime].push(specialDate)
        })

      const dateFns = this.specialDates
        .filter(s => typeof s.date === 'function')

      return (canonicalTime) => {
        const initial = {}
        if (dateIndex[canonicalTime]) {
          for (let props of dateIndex[canonicalTime]) {
            Object.assign(initial, props)
          }
        }

        for (let dateFn of dateFns) {
          if (dateFn.date(new Date(canonicalTime + this.effectiveOffset))) {
            Object.assign(initial, dateFn)
          }
        }
        return initial
      }
    },
    weeks () {
      return _.range(0, 6).map(
        weekNumber => _.range(0, 7).map(weekDay => {
          const canonical = ((weekNumber * 7) + weekDay) * 24 * 3600 * 1000 + this.firstDayOfCalendar.getTime()
          const canonicalDate = new Date(canonical)

          const specialData = this.specialDatesByTime(canonical)

          return {
            canonical,
            date: canonicalDate,
            day: canonicalDate.getDate(),
            disabled: (this.defaultDisable)
              ? !specialData || !specialData.enabled
              : specialData && specialData.disabled,
            differentMonth: (canonicalDate.getMonth() !== this.monthCanonical.getMonth()),
            classes: (specialData && specialData.classes) || [],
            selected: this.value && (this.multiple
              ? this.value.find(d => this.canonicalTime(d) === canonical)
              : this.canonicalTime(this.value) === canonical),
            annotation: specialData && specialData.annotation
          }
        })
      )
    }
  },
  methods: {
    canonicalTime (date) {
      const tzDate = new Date(date.getTime() - this.effectiveOffset)
      const time = Date.UTC(tzDate.getUTCFullYear(), tzDate.getUTCMonth(), tzDate.getUTCDate())
      return time
    },
    clicked (day) {
      if (day.disabled) return

      if (this.multiple) {
        const index = this.value.findIndex(v => this.canonicalTime(v) === day.canonical)

        if (index === -1) {
          this.$emit('input', this.value.concat([this.toUserDate(day.date)]))
        } else {
          this.$emit('input', this.value
            .filter(v => this.canonicalTime(v) !== day.canonical))
        }
      } else {
        this.$emit('input', this.toUserDate(day.date))
      }
    },
    dayClasses (day) {
      const basic = {
        disabled: day.disabled,
        'different-month': day.differentMonth,
        selected: day.selected,
      }
      for (let d of day.classes) {
        basic[d] = true
      }
      return basic
    },
    toUserDate (date) {
      return new Date(date.getTime() + this.effectiveOffset)
    },
  }
}
</script>
