<script setup lang="ts">
import { defineProps } from 'vue';
import ServicePicker from '@/components/ServicePicker.vue'

defineProps({
  services: Object,
});

</script>

<template>
  <div class="services">
    <ServicePicker :services="services" />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .services {
    background-color: grey;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
