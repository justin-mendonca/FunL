<template>
  <div class="welcome">
    <img src="../assets/funl_logo.png" alt="FunL logo with brand name" class="logo" />
    <div class="instructions">
      <p :style="{ fontSize: '1.3rem', textAlign: 'center' }">
        Uh oh, it looks like your library is empty.
      </p>
      <p :style="{ fontSize: '1.1em', marginBottom: '1%' }">Here's how to get started:</p>
      <ol>
        <li>
          <div class="navigation-instructions">
            <p>Click</p>
            <img src="../assets/services_button.png" alt="Picture of Services button" />
          </div>
        </li>
        <li>
          <p>Select the streaming services that you are subscribed to.</p>
        </li>
        <li>
          <div class="navigation-instructions">
            <p>Click</p>
            <img src="../assets/library_button.png" alt="Picture of Library button" />
            <p>to see the available titles across all of your streaming services.</p>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.welcome {
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--surface-card);
  margin-bottom: 2%;
  gap: 2%;
  border-radius: 1%;
}

.logo {
  width: 70%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0.19);
  border-radius: 2%;
}

.instructions {
  width: 70%;
  line-height: 2.6em;
}

.navigation-instructions {
  display: flex;
  align-items: center;
  gap: 1%;
}
</style>
