<script setup lang="ts">
import ServicePicker from '@/components/ServicePicker.vue';
</script>

<template>
  <div class="home">
    <ServicePicker/>
    <button>Get Data</button>
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
