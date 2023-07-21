<script setup lang="ts">
import { RouterView } from 'vue-router'
import { reactive, provide, ref, nextTick } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import OverlayPanel from 'primevue/overlaypanel'

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
  { label: 'About', icon: 'pi pi-info', to: '/about' }
])

const user = ref({
  email: '',
  password: ''
})

// Used to toggle the forms
const loginForm = ref()
const registerForm = ref()

// Used to pass the button element from the DOM to the toggleOverlay function so forms can be dynamically opened
const btnLogin = ref<any>(null)
const btnRegister = ref<any>(null)

const showLoginForm = ref(true)

const handleSubmit = async () => {
  // Form validation and form submission logic
  console.log(user.value)
  hideOverlay() // You can also decide to close the form here based on the form submission response
}

const toggleOverlay = (event: Event) => {
  if (loginForm.value) loginForm.value.toggle(event)
  else registerForm.value.toggle(event)
}

const hideOverlay = () => {
  loginForm.value && loginForm.value.hide()
  registerForm.value && registerForm.value.hide()
  user.value.email = ''
  user.value.password = ''
}

const handleToggleForm = () => {
  showLoginForm.value = !showLoginForm.value
  nextTick(() => {
    if (showLoginForm.value && btnLogin.value.$el) {
      btnLogin.value.$el.click()
    } else if (!showLoginForm.value && btnRegister.value.$el) {
      btnRegister.value.$el.click()
    }
  })
}

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
      <div v-if="showLoginForm">
        <Button
          ref="btnLogin"
          @click="toggleOverlay"
          class="p-mr-2"
          label="Log In"
          icon="pi pi-user-plus"
        />
        <OverlayPanel ref="loginForm">
          <form @submit.prevent="handleSubmit" class="login-form">
            <h3>Log In</h3>
            <InputText v-model="user.email" class="input-field" placeholder="Email" />
            <Password v-model="user.password" class="input-field" placeholder="Password" />
            <Button type="submit" label="Log In" class="login-button" />
            <div class="swap-form">
              <p>Don't have an account yet?</p>
              <a class="swap-link" @click.stop="handleToggleForm">Register now</a>
            </div>
          </form>
        </OverlayPanel>
      </div>
      <div v-else>
        <Button
          ref="btnRegister"
          @click="toggleOverlay"
          class="p-mr-2"
          label="Register"
          icon="pi pi-user-plus"
        />
        <OverlayPanel ref="registerForm">
          <form @submit.prevent="handleSubmit" class="login-form">
            <h3>Log In</h3>
            <InputText v-model="user.email" class="input-field" placeholder="Email" />
            <Password v-model="user.password" class="input-field" placeholder="Password" />
            <Button type="submit" label="Log In" class="login-button" />
            <div class="swap-form">
              <p>Already have an account?</p>
              <a class="swap-link" @click.stop="handleToggleForm">Log in</a>
            </div>
          </form>
        </OverlayPanel>
      </div>
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

.swap-form {
  display: flex;
  font-size: 0.9em;
  gap: 3px;
}

.swap-link {
  font-weight: 600;
}
</style>
