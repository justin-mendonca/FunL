<script setup lang="ts">
import ServicePicker from '@/components/ServicePicker.vue'

</script>

<template>
  <div class="services">
    <ServicePicker/>
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
