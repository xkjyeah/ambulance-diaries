<template>
  <div class="container">
    Example diary:

    <router-link :to="{
      name: 'diaries-id-date',
      params: { id: 'ambulance-medical-service' }
      }">
      Ambulance Medical Service
    </router-link>
  </div>
</template>

<script>
</script>
