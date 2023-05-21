<template>
  <div class="service-picker">
    <div id="services-container">
      <div v-for="(value, key) in services" :key="key">
        <StreamingService :serviceName="key"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { inject } from 'vue'
import StreamingService from '@/components/StreamingService.vue'

interface Services {
  Netflix: boolean,
  Apple: boolean,
  Hulu: boolean,
  Prime: boolean,
  Disney: boolean,
  HBO: boolean,
  Peacock: boolean,
  Showtime: boolean,
  Starz: boolean,
}

export default {
  name: 'ServicePicker',
  components: {
    StreamingService
  },
  setup() {
    const services = inject<Services | undefined>('services')!

    const test = () => {
      services.Netflix = !services.Netflix
    }

    return {
      test,
      services
    }
  }
}
</script>

<style scoped>
.service-picker {
  width: 70%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#services-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  min-height: 200px;
}

</style>
