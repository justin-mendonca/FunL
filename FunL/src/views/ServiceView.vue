<script setup lang="ts">
import ServicePicker from '@/components/ServicePicker.vue'
import { inject } from 'vue'
import Button from 'primevue/button'

const isLoggedIn = inject<boolean>('isLoggedIn')

</script>

<template>
  <div class="services">
    <ServicePicker/>
    <div v-if="isLoggedIn">
      <Button>Save</Button>
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
