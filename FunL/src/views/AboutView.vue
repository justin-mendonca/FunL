<script setup lang="ts">
import axios from 'axios'
const apiKey = import.meta.env.VITE_API_KEY;
const host = import.meta.env.VITE_HOST;

const incrementCounter = async () => {
  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/v2/services',
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
  <div class="about">
    <h1>Click the button below to get data about the available streaming services</h1>
    <button @click="incrementCounter">Click me</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
