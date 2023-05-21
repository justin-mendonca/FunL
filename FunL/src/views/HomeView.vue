<script setup lang="ts">
import { inject } from 'vue'
import axios from 'axios'
const apiKey = import.meta.env.VITE_API_KEY;
const host = import.meta.env.VITE_HOST;

interface Services {
  Netflix: boolean
  Apple: boolean
  Hulu: boolean
  Prime: boolean
  Disney: boolean
  HBO: boolean
  Peacock: boolean
  Showtime: boolean
  Starz: boolean
}

const services = inject<Services | undefined>('services')!

const formatServices = () => {
  let s = ''
  for (const serviceName in services) {
    if (services[serviceName as keyof Services]) {
      s = s.concat(serviceName.toLowerCase() + ',')
    }
  }
  // remove trailing comma
  return s.slice(0, -1)
}

const getData = async () => {
  const formattedServices = formatServices();
  
  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/v2/search/basic',
    params: {
      country: 'us',
      services: formattedServices
    },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': host
    }
  }

  try {
    const response = await axios.request(options)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="home">
    <button @click="getData">Get Data</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .home {
    background-color: grey;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
