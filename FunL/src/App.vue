<script setup lang="ts">
import { RouterView } from 'vue-router'
import { reactive, provide, ref } from 'vue'

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
  paramount: false
})

const searchResults = reactive([])

provide('services', services)
provide('searchResults', searchResults)

const menuItems = ref([
  { label: 'Library', icon: 'pi pi-images', to: '/' },
  { label: 'Services', icon: 'pi pi-list', to: '/services' },
  { label: 'About', icon: 'pi pi-info', to: '/about' }
])

</script>

<template>
  <MenuBar class="nav" :model="menuItems" >
    <template #start>
      <img alt="logo" src="./assets/logoicon.png" height="40" />
    </template>
  </MenuBar>
  <RouterView :services="services" class="view" />
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5vh;
  width: 100%;
  padding: 0 10px;
}

.nav img {
  margin-right: auto;
}

.view {
  width: 100vw;
  height: 95vh;
}
</style>
