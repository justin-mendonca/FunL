<template>
  <div id="img-container">
    <img
      :src="getServiceLogo(serviceName!)"
      :alt="`${serviceName} logo`"
      class="serviceImage"
      @click="toggleService"
    />
    <img
      v-if="services[serviceName as keyof Services]"
      id="checkmark"
      src="../assets/Checkmark.png"
      alt="Green checkmark"
    />
  </div>
</template>

<script lang="ts">
import { inject } from 'vue'
import type { Services } from '@/interfaces/services'

export default {
  name: 'StreamingService',
  props: {
    serviceName: String
  },
  setup(props) {
    const getServiceLogo = (serviceName: String) => {
      return new URL(`../assets/logos/${serviceName}_logo.webp`, import.meta.url).href
    }

    const services = inject<Services>('services')!

    const toggleService = () => {
      services[props.serviceName as keyof Services] = !services[props.serviceName as keyof Services]
    }

    return {
      getServiceLogo,
      toggleService,
      services
    }
  }
}
</script>

<style scoped>
#img-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
}

.serviceImage {
  height: 100%;
  width: 100%;
}

#checkmark {
  position: absolute;
  height: 20px;
  width: 20px;
}
</style>
