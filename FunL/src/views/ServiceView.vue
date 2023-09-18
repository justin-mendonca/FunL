<script setup lang="ts">
import axios from 'axios'
import ServicePicker from '@/components/ServicePicker.vue'
import type { Services } from '@/interfaces/services'
import { inject } from 'vue'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

const isLoggedIn = inject<boolean>('isLoggedIn')
const services = inject<Services>('services')
const toast = useToast()

const submitPreferences = async () => {
  try {
    const jwtToken = localStorage.getItem('jwtToken')

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    }

    const response = await axios.post(
      'https://jpmoregain-001-site1.gtempurl.com/subscriptions',
      services,
      axiosConfig
    )

    console.log(response)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Subscriptions updated successfully!',
      life: 5000
    })
  } catch (error: any) {
    console.error('Error saving subscriptions:', error)

    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'An error occurred while updating subscriptions.',
      life: 5000
    })
  }
}
</script>

<template>
  <div class="services">
    <ServicePicker />
    <div v-if="isLoggedIn">
      <Button @click="submitPreferences" style="margin-bottom: 10px;">Save</Button>
    </div>
  </div>
</template>

<style>
.services {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
