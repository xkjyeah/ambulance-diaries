<template>
  <div class="entry entry-content" :class="{
    cancelled: entry.status === 'cancelled',
    'is-event': (/event/i).test(entry.source)
    }">
    <div class="index">
      {{index + 1}}
    </div>
    <DatasheetCell class="team"
      :value="entry.team"
      @input="updateEntry('team', $event)"
    />
    <!-- <div class="team">
      <input type="text" :value="entry.team" @input="updateEntry('team', $event.target.value)" />
    </div> -->
    <DatasheetCell :value="entry.startTime">
      <TimeInput slot="editor" class="the-editor"
        type="text" :value="entry.startTime"
        @input="updateEntry('startTime', $event)" />
    </DatasheetCell>

    <DatasheetCell :value="entry.endTime" :class="{invalid: !entry.endTime && entry.twoWay}">
      <TimeInput slot="editor" class="the-editor"
        type="text" :value="entry.endTime"
        @input="updateEntry('endTime', $event)" />
    </DatasheetCell>
    <DatasheetCell class="source"
      :value="entry.source"
      @input="updateEntry('source', $event)"
      />
    <div class="twoway">
      <TwoWayIndicator :value="entry.twoWay" @input="updateEntry('twoWay', $event)"/>
    </div>

    <DatasheetCell :value="entry.price">
      <PriceInput slot="editor" class="the-editor"
        type="text" :value="entry.price"
        @input="updateEntry('price', $event)" />
    </DatasheetCell>
    <!-- <div>
      <input type="text" :value="entry.receiptNumber" @input="updateEntry('receiptNumber', $event.target.value)" />
    </div> -->
    <DatasheetCell class="description"
      :value="entry.description"
      @input="updateEntry('description', $event)"
      >
      <div class="textarea">{{entry.description}}</div>
    </DatasheetCell>
    <div class="actions">
      <!-- cancel / uncancel -->
      <a class="btn btn-xs btn-danger"
        href="#"
        @click.prevent="updateEntry('status', 'cancelled')"
          v-if="entry.status !== 'cancelled'">
        Cancel
      </a>
      <a class="btn btn-xs btn-success"
        href="#"
        @click.prevent="updateEntry('status', null)"
          v-else>
        <!-- <span class="glyphicon glyphicon-repeat"></span> -->
        Restore
      </a>

      <!-- view history -->
      <!-- <button class="btn btn-default" @click="$emit('view-history')">
        <span class="glyphicon glyphicon-hourglass"></span>
      </button> -->
    </div>
    <div class="editedBy"><Initials :value="entry.lastEditedBy" /></div>
    <div class="indicator">
      <SyncIndicator :lastModified="lastModified" :lastSaved="lastSaved" />
    </div>
  </div>
</template>
<script>

function blankEntry () {
  return {
    id: null,
    source: null,
    price: null,
    twoWay: false,
    team: null,
    time: null,
    description: null,
    status: null,
    lastModified: null,
    lastSaved: null
  }
}

export default {
  props: ['index', 'value', 'lastModified', 'lastSaved', 'showExtra'],
  data () {
    return {
      entry: null,
      internalLastModified: 0,
    }
  },
  components: {
    DatasheetCell: require('./DatasheetCell.vue'),
    TimeInput: require('~/components/TimeInput.vue'),
    PriceInput: require('~/components/PriceInput.vue'),
    SyncIndicator: require('~/components/SyncIndicator.vue'),
    TwoWayIndicator: require('~/components/TwoWayIndicator.vue'),
    Initials: require('~/components/Initials.vue'),
    AutogrowTextarea: require('~/components/AutogrowTextarea.vue')
  },
  watch: {
    value: {
      immediate: true,
      handler (v) {
        if (!v) {
          this.entry = blankEntry()
        } else {
          this.entry = {
            ...blankEntry(),
            ...v
          }
        }
      }
    }
  },
  methods: {
    updateEntry (field, value) {
      this.entry[field] = value
      this.internalLastModified = Date.now()
      this.sync()
    },
    sync: function () {
      this.$emit('input', this.entry)
    }
  }
}
</script>
<style lang="scss">
.entry {
  // td {
  //   vertical-align: top;
  //   label {
  //     display: inline;
  //     font-weight: normal;
  //     margin: 0;
  //     padding: 0;
  //   }
  // }
  &.cancelled {
    &, & textarea, & input {
      text-decoration: line-through;
    }
  }

  .invalid {
    background-color: #FCC;
  }
}
</style>
