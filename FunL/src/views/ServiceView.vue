<script setup lang="ts">
import axios from 'axios'
import Button from 'primevue/button'
import { type Ref, inject } from 'vue'
import router from '../router'
import ServicePicker from '@/components/ServicePicker.vue'
import type { Services } from '@/interfaces/services'
import { useToast } from 'primevue/usetoast'

const isLoggedIn = inject<Ref<boolean>>('isLoggedIn')!;
const services = inject<Services>('services')
const toast = useToast()

const routeAndSave = async () => {
  router.push('/')

  if (isLoggedIn.value === true) {
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
}
</script>

<template>
  <div class="services">
    <ServicePicker />
    <Button @click="routeAndSave" style="margin-bottom: 10px">Next</Button>
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
