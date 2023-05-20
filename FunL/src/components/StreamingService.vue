<template>
  <div id="img-container">
    <img :src="getServiceLogo(serviceName!)" :alt="`${serviceName} logo`" class="serviceImage"/>
  </div>
</template>

<script lang="ts">
import { inject, computed } from 'vue'

export default {
  name: 'StreamingService',
  props: {
    serviceName: String,
    serviceValue: Boolean
  },
  setup() {
    const getServiceLogo = (serviceName: String) => {
      return new URL(`../assets/logos/${serviceName}_logo.webp`, import.meta.url).href
    }
    return {
      getServiceLogo
    }
  }
}
</script>

<style scoped>
#img-container {
  width: 100%;
  height: 100%;
}

.serviceImage {
  height: 100%;
  width: 100%;
}
</style>
