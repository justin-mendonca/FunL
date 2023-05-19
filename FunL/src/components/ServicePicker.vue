<template>
  <div class="service-picker">
    <button @click="test">Click me</button>
    <p>Counter: {{ services.Netflix }}</p>
  </div>
</template>

<script lang="ts">
import { inject } from 'vue'
import axios from 'axios'

interface Services {
  Netflix: boolean
}

export default {
  name: 'ServicePicker',
  setup() {
    const services = inject<Services | undefined>('services')!

    const incrementCounter = async () => {
      const options = {
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/v2/services',
        headers: {
          'X-RapidAPI-Key': '6120f55f4emsh1386c664758d179p13f11fjsn88c946ecbd9b',
          'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
      }

      try {
        const response = await axios.request(options)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    const test = () => {
      services.Netflix = !services.Netflix
    }

    return {
      incrementCounter,
      test,
      services
    }
  }
}
</script>

<style scoped>
.service-picker {
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
