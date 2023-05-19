<template>
  <div class="service-picker">
    <button @click="test">Click me</button>
    <p>Counter: {{ services.Netflix }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'

interface Services {
  Netflix: string
}

export default defineComponent({
  name: 'ServicePicker',
  props: {
    services: {
      type: Object as () => Services,
      required: true
    }
  },
  setup(props) {
    const servicesRef = ref(props.services)

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
      servicesRef.value.Netflix = 'True'
    }

    return {
      incrementCounter,
      test,
      services: servicesRef
    }
  }
})
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
