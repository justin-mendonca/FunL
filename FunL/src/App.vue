<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { reactive, provide } from 'vue';

const services = reactive({
  Netflix: false,
  Apple: false,
  Hulu: false,
  Prime: false,
  Disney: false,
  HBO: false,
  Peacock: false,
  Showtime: false,
  Starz: false,
});

provide('services', services);
</script>

<template>
    <div class="nav">
      <nav>
        <RouterLink to="/" class="navtab">Home</RouterLink>
        <RouterLink to="/services" class="navtab">Services</RouterLink>
        <RouterLink to="/about" class="navtab">About</RouterLink>
      </nav>
    </div>
  <RouterView :services="services" class="view"/>
</template>

<style scoped>

nav {
  display: flex;
  justify-content: center;
  height: 5vh;
}

.navtab {
  height: 100%;
  display: flex;
  align-items: center;
}

nav a {
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.view {
  width: 100vw;
  height: 95vh;
}

</style>
