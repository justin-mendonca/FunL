<script setup lang="ts">
import axios from 'axios'

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
    background-color: grey;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
