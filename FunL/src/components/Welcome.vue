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
        <div class="instructions-list">
          <div class="instruction">
            <Badge value="1"></Badge>
            <p>Click the button below to navigate to the streaming service selection page.</p>
          </div>
          <Button
            @click="navigateToServices"
            icon="pi pi-arrow-circle-right"
            label="Save Streaming Subscriptions"
            class="save-subscriptions"
          />
          <div class="instruction">
            <Badge value="2"></Badge>
            <p>
              Select all of the streaming services you are subscribed to by clicking on each of
              them.
            </p>
          </div>
          <div class="instruction">
            <Badge value="3"></Badge>
            <p>
              Click on the "Library" tab to view all of the titles available across all of your
              streaming platforms!
            </p>
          </div>
          <div class="optional-instruction">
            <InlineMessage severity="info" class="optional">Optional</InlineMessage>
            <div class="instruction">
              <Badge value="4"></Badge>
              <p>
                Create an account and log in to be able to save your subscriptions -
                that way your library will automatically load each time you log into FunL!
              </p>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import Message from 'primevue/message'
import router from '../router'
import Badge from 'primevue/badge'
import InlineMessage from 'primevue/inlinemessage'

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

.instructions-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2%;
}

.save-subscriptions {
  width: 60%;
  margin: 2%;
}

.instruction {
  display: flex;
  gap: 5px;
  margin: 1%;
}

.optional-instruction {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 1%;
}

.optional {
  margin: 2%;
  background-color: var(--highlight-bg) !important;
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

@media (min-width: 768px) and (max-width: 1024px) {
  .p-message.p-message-warn {
    width: 70%;
  }

  .welcome {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 20px;
  }

  .logo {
    width: 95%;
    height: 30%;
    box-shadow:
      0 4px 8px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0.19);
    border-radius: 2%;
  }

  .card {
    justify-content: center;
    width: 95%;
    height: 100%;
    box-shadow:
      0 4px 8px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0.19);
    border-radius: 2%;
    font-size: 1.4rem;
  }

  :deep(.p-card .p-card-title) {
    font-size: 3rem;
  }

  :deep(.p-card .p-card-subtitle) {
    font-size: 1.8rem;
  }
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
