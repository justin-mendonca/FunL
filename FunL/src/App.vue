<script setup lang="ts">
import { RouterView } from 'vue-router'
import { reactive, provide, ref } from 'vue'
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';

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

const menuItems = ref([
  { label: 'Library', icon: 'pi pi-images', to: '/' },
  { label: 'Services', icon: 'pi pi-list', to: '/services' },
  { label: 'About', icon: 'pi pi-info', to: '/about' },
])

const user = ref({
  email: '',
  password: ''
});

const loginForm = ref()

const handleSubmit = async () => {
  // Form validation and form submission logic
  console.log(user.value);
  hideOverlay();  // You can also decide to close the form here based on the form submission response
};

const toggleOverlay = (event: any) => {
  loginForm.value.toggle(event);
};

const hideOverlay = () => {
  loginForm.value.hide();
  user.value.email = '';
  user.value.password = '';
};

// provide global state
provide('services', services)
provide('searchResults', searchResults)
provide('menuItems', menuItems)
</script>

<template>
  <MenuBar class="nav" :model="menuItems">
    <template #start>
      <img alt="logo" src="./assets/logoicon.png" height="40" />
    </template>
    <template #end>
      <Button ref="btn" @click="toggleOverlay" class="p-mr-2" label="Log In" icon="pi pi-user-plus"></Button>
      <OverlayPanel ref="loginForm">
        <form @submit.prevent="handleSubmit" class="login-form">
          <h3>Log In</h3>
          <InputText v-model="user.email" class="input-field" placeholder="Email" />
          <Password v-model="user.password" class="input-field" placeholder="Password" />
          <Button type="submit" label="Log In" class="login-button" />
        </form>
      </OverlayPanel>
    </template>
  </MenuBar>
  <RouterView :services="services" class="view" />
</template>

<style scoped>
.nav {
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
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.input-field {
  width: 200px;
  margin-bottom: 1rem;
}

.login-button {
  width: 200px;
}
</style>
