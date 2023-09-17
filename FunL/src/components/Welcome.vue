<template>
  <Message severity="warn" class="message">Your library is empty</Message>
  <div class="welcome">
    <img alt="user header" src="../assets/funl_logo.png" class="logo" />
    <Card class="card">
      <template #title>How It Works</template>
      <template #subtitle
        >FunL lets you browse all of the titles available on your subscribed streaming services in
        one place.</template
      >
      <template #content>
        <p>
          Before we can load your library we need to know what streaming services you are subscribed
          to.
        </p>
        <ol>
          <li>Click the button below to navigate to the streaming service selection page.</li>
          <li>
            Select all of the streaming services you are subscribed to by clicking on each of them -
            you will know when a streaming service is selected because it will have a green
            checkmark on it.
          </li>
          <li>Click the "Save" button to save your subscriptions.</li>
          <li>
            Next time you click on the "Library" tab, your library will load with all of the titles
            available across all of your streaming platforms!
          </li>
        </ol>
      </template>
      <template #footer>
        <Button
          @click="navigateToServices"
          icon="pi pi-arrow-circle-right"
          label="Save Streaming Subscriptions"
        />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import Message from 'primevue/message'
import router from '../router'

const navigateToServices = () => {
  router.push('/services')
}
</script>

<style scoped>
.message {
  margin-bottom: 2%;
}

.p-message.p-message-warn {
  display: flex;
  height: 5%;
  width: 25%;
}

.p-message.p-message-warn .p-message-wrapper {
  width: 100%;
}

:deep(.p-message-wrapper) {
  width: 100%;
}

.welcome {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2%;
  gap: 2%;
}

.card {
  justify-content: center;
  width: 50%;
  height: 100%;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0.19);
  border-radius: 2%;
}

:deep(.p-card .p-card-title) {
  text-align: center;
  font-size: 2rem;
}

:deep(.p-card .p-card-subtitle) {
  font-size: 1.2rem;
}
.p-card .p-card-content ol li {
  margin-top: 10px;
}

:deep(.p-card .p-card-footer) {
  display: flex;
  justify-content: center;
  margin-bottom: 2%;
}

.logo {
  width: 50%;
  height: 100%;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0.19);
  border-radius: 2%;
}

@media (max-width: 768px) {
  .p-message.p-message-warn {
    width: 80%;
    height: 50px;
  }

  .welcome {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
  .logo {
    width: 95%;
    height: 30%;
    box-shadow:
      0 4px 8px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0.19);
    border-radius: 2%;
    margin-top: 2%;
    margin-bottom: 5%;
  }

  .card {
    justify-content: center;
    width: 95%;
    height: 100%;
    box-shadow:
      0 4px 8px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0.19);
    border-radius: 2%;
  }
}
</style>
