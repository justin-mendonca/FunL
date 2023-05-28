<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { reactive, provide } from 'vue';

const services = reactive({
  netflix: false,
  apple: false,
  hulu: false,
  prime: false,
  disney: false,
  hbo: false,
  peacock: false,
  showtime: false,
  starz: false,
  paramount: false,
});

const searchResults = reactive([])
// Cannot guarantee that shape of title object will not change since it is fetched from API

provide('services', services);
provide('searchResults', searchResults)

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
