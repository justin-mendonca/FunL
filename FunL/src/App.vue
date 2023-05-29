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
// Cannot guarantee that shape of title object will not change since it is fetched from API

provide('services', services)
provide('searchResults', searchResults)

const menuItems = ref([
  { label: 'Home', icon: 'pi pi-home', to: '/' },
  { label: 'Services', icon: 'pi pi-list', to: '/services' },
  { label: 'About', icon: 'pi pi-info', to: '/about' }
])

const endTemplate = `<Button label="Logout" />`
</script>

<template>
  <MenuBar class="nav" :model="menuItems" :end="endTemplate">
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
