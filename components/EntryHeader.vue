<template>
<div class="entry entry-header">
  <SortTh class="index" tag="div"></SortTh>
  <SortTh class="team" tag="div" @sort="$emit('sort', $event)" :orderBy="orderBy" :order="order" field="data.team">Team</SortTh>
  <SortTh class="time" tag="div" @sort="$emit('sort', $event)" :orderBy="orderBy" :order="order" field="data.startTime">Time</SortTh>
  <SortTh class="source" tag="div" @sort="$emit('sort', $event)" :orderBy="orderBy" :order="order" field="data.source">Source</SortTh>
  <SortTh class="twoway" tag="div" @sort="$emit('sort', $event)" :orderBy="orderBy" :order="order" field="data.source">2W</SortTh>
  <SortTh class="price" tag="div" @sort="$emit('sort', $event)" :orderBy="orderBy" :order="order" field="data.price">Price</SortTh>
  <!-- <SortTh  tag="div" @sort="$emit('sort', $event)" :orderBy="orderBy" :order="order" field="data.receiptNumber">Receipt</SortTh> -->
  <SortTh class="description" tag="div" @sort="$emit('sort', $event)" :orderBy="orderBy" :order="order" field="data.description">Description</SortTh>
  <SortTh class="actions" tag="div">Actions</SortTh>
  <SortTh class="editedBy" tag="div">Last edited by</SortTh>
  <SortTh class="indicator" tag="div"></SortTh>
</div>
</template>
<script>
export default {
  props: ['order', 'orderBy'],
  data () {
    return {
      entry: null,
      internalLastModified: 0,
    }
  },
  components: {
    SortTh: require('~/components/SortTh.vue'),
  }
}
</script>
