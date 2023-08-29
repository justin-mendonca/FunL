<script setup lang="ts">
import axios from 'axios'
import { RouterView } from 'vue-router'
import { computed, reactive, provide, ref, nextTick, watchEffect, type Ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import OverlayPanel from 'primevue/overlaypanel'
import ProgressSpinner from 'primevue/progressspinner'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast';
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import type { Services } from '@/interfaces/services'
import type { SubscribedService } from '@/interfaces/subscribedService'

const toast = useToast()

const services: Services = reactive({
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

const isLoggedIn = ref(!!localStorage.getItem('jwtToken'))
const authRequestPending = ref(false)

watchEffect(async () => {
  isLoggedIn.value = !!localStorage.getItem('jwtToken')

  const jwtToken = localStorage.getItem('jwtToken')

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    }
  }

  if (isLoggedIn.value === true) {
    const response = await axios.get('http://jpmoregain-001-site1.gtempurl.com/subscriptions', axiosConfig)

    if (response.status === 200) {
      const subscribedServicesArr = response.data.data.$values

      subscribedServicesArr.forEach((subscribedService: SubscribedService) => {
        const platformKey = subscribedService.streamingPlatformName as keyof Services

        services[platformKey] = true
      })
    }
  }
})

const searchResults = reactive([])

const menuItems = ref([
  { label: 'Library', icon: 'pi pi-images', to: '/' },
  { label: 'Services', icon: 'pi pi-list', to: '/services' },
  { label: 'About', icon: 'pi pi-info', to: '/about' }
])

// Used to toggle the forms
const loginForm = ref()
const registerForm = ref()

// Used to pass the button element from the DOM to the toggleOverlay function so forms can be dynamically opened
const btnLogin = ref<any>(null)
const btnRegister = ref<any>(null)

const showLoginForm = ref(true)

// form validation
const loginSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
})

const registerSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
})

const activeSchema = computed(() => {
  return showLoginForm.value ? loginSchema : registerSchema
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: activeSchema
})

const { value: email, errorMessage: emailErrorMessage } = useField('email') as {
  value: Ref<string | null>
  errorMessage: Ref<string | undefined>
}
const { value: password, errorMessage: passwordErrorMessage } = useField('password') as {
  value: Ref<string | null>
  errorMessage: Ref<string | undefined>
}
const { value: confirmPassword, errorMessage: confirmPasswordErrorMessage } = useField(
  'confirmPassword'
) as { value: Ref<string | null>; errorMessage: Ref<string | undefined> }
//

const onSubmit = handleSubmit(async (values) => {
  authRequestPending.value = true
  const endpoint = showLoginForm.value ? 'login' : 'register'
  const url = `http://jpmoregain-001-site1.gtempurl.com/user/${endpoint}`
  try {
    const response = await axios.post(url, values)

    const { token } = response.data

    localStorage.setItem('jwtToken', token)

    isLoggedIn.value = true

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } catch (error: any) {
    console.error('Error during login:', error)

    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: showLoginForm.value? 'An error occurred while logging in. Please try again.' : 'An error occurred while registering. Please try again.',
      life: 5000
    })
  }
  authRequestPending.value = false
  hideOverlay()
})

const toggleOverlay = (event: Event) => {
  if (loginForm.value) {
    loginForm.value.toggle(event)
    resetForm()
  } else {
    registerForm.value.toggle(event)
    resetForm()
  }
}

const hideOverlay = () => {
  loginForm.value && loginForm.value.hide()
  registerForm.value && registerForm.value.hide()
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

const logout = () => {
  localStorage.removeItem('jwtToken')
  isLoggedIn.value = false
  searchResults.length = 0
}

// provide global state
provide('services', services)
provide('searchResults', searchResults)
provide('menuItems', menuItems)
provide('isLoggedIn', isLoggedIn)
</script>

<template>
  <MenuBar class="nav" :model="menuItems">
    <template #start>
      <img alt="logo" src="./assets/funl_logo_icon.png" height="40" id="logo-icon" />
    </template>
    <template #end>
      <div v-if="isLoggedIn">
        <Button @click="logout" label="Log Out" icon="pi pi-sign-out"></Button>
      </div>
      <div v-else>
        <div v-if="showLoginForm">
          <Button
            ref="btnLogin"
            @click="toggleOverlay"
            class="p-mr-2"
            label="Log In"
            icon="pi pi-user-plus"
          />
          <OverlayPanel ref="loginForm">
            <form @submit.prevent="onSubmit" class="form-container">
              <div v-if="authRequestPending">
                <ProgressSpinner />
              </div>
              <div v-else class="auth-form">
                <span class="p-float-label">
                  <InputText
                    v-model="email"
                    type="text"
                    :class="{ 'p-invalid': emailErrorMessage }"
                    aria-describedby="email-error"
                  />
                  <label for="email">Email</label>
                </span>
                <small v-if="emailErrorMessage" class="p-error">{{ emailErrorMessage }}</small>
                <span class="p-float-label">
                  <InputText
                    id="login-password-field"
                    v-model="password"
                    type="password"
                    :class="{ 'p-invalid': passwordErrorMessage }"
                    aria-describedby="password-error"
                  />
                  <label for="password">Password</label>
                </span>
                <small v-if="passwordErrorMessage" class="p-error">{{
                  passwordErrorMessage
                }}</small>
                <Button type="submit" label="Log In" class="submit-button" />
                <div class="swap-form">
                  <p>Don't have an account?</p>
                  <a class="swap-link" @click.stop="handleToggleForm">Register Now</a>
                </div>
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
            <form @submit.prevent="onSubmit" class="form-container">
              <div v-if="authRequestPending">
                <ProgressSpinner />
              </div>
              <div v-else class="auth-form">
                <span class="p-float-label">
                  <InputText
                    v-model="email"
                    type="text"
                    :class="{ 'p-invalid': emailErrorMessage }"
                    aria-describedby="email-error"
                  />
                  <label for="email">Email</label>
                </span>
                <small v-if="emailErrorMessage" class="p-error">{{ emailErrorMessage }}</small>
                <span class="p-float-label">
                  <InputText
                    id="login-password-field"
                    v-model="password"
                    type="password"
                    :class="{ 'p-invalid': passwordErrorMessage }"
                    aria-describedby="password-error"
                  />
                  <label for="password">Password</label>
                </span>
                <small v-if="passwordErrorMessage" class="p-error">{{
                  passwordErrorMessage
                }}</small>
                <span class="p-float-label">
                  <InputText
                    id="register-confirm-password-field"
                    v-model="confirmPassword"
                    type="password"
                    :class="{ 'p-invalid': confirmPasswordErrorMessage }"
                    aria-describedby="confirm-password-error"
                  />
                  <label for="confirmPassword">Confirm Password</label>
                </span>
                <small v-if="confirmPasswordErrorMessage" class="p-error">
                  {{ confirmPasswordErrorMessage }}
                </small>
                <Button type="submit" label="Register" class="submit-button" />
                <div class="swap-form">
                  <p>Already have an account?</p>
                  <a class="swap-link" @click.stop="handleToggleForm">Log In</a>
                </div>
              </div>
            </form>
          </OverlayPanel>
        </div>
      </div>
    </template>
  </MenuBar>
  <Toast />
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

.form-container {
  min-width: 270px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  gap: 20px;
}

.auth-form span input {
  width: 250px;
}

.p-error {
  margin-top: -20px;
  text-align: center;
}

.submit-button {
  width: 65%;
  margin-top: -10px;
}

.swap-form {
  display: flex;
  font-size: 0.9em;
  gap: 3px;
  margin-top: -10px;
}

.swap-link {
  font-weight: 600;
}

:deep(.p-menubar-start) {
  display: flex;
}

#logo-icon {
  margin-top: 1px;
}
</style>
