<script setup lang="ts">
import axios from 'axios'
import ServicePicker from '@/components/ServicePicker.vue'
import type { Services } from '@/interfaces/services'
import { inject } from 'vue'
import Button from 'primevue/button'

const isLoggedIn = inject<boolean>('isLoggedIn')
const services = inject<Services>('services')

const submitPreferences = async () => {
  try {
    const jwtToken = localStorage.getItem('jwtToken')

    const axiosConfig = {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    }

    const response = await axios.post('http://localhost:5161/subscriptions', services, axiosConfig)

    console.log(response)
  } catch (error: any) {
    console.error('Error saving subscriptions:', error)
  }
}
</script>

<template>
  <div class="services">
    <ServicePicker />
    <div v-if="isLoggedIn">
      <Button @click="submitPreferences">Save</Button>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .services {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
