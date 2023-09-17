<template>
  <div class="service-picker">
    <div id="services-container">
      <div v-for="(value, key) in services" :key="key">
        <StreamingService :serviceName="key" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { inject } from 'vue'
import StreamingService from '@/components/StreamingService.vue'
import type { Services } from '@/interfaces/services'

export default {
  name: 'ServicePicker',
  components: {
    StreamingService
  },
  setup() {
    const services = inject<Services>('services')!

    return {
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

@media (max-width: 768px) {
  .service-picker {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2%;
    margin-top: 2%;
  }

  #services-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
    height: 100%;
  }
}
</style>
