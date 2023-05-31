<template>
  <div class="welcome">
    <img src="../assets/funl_logo.png" alt="FunL logo with brand name" class="logo">
    <p>Uh oh, it looks like your library is empty.</p>
    
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.welcome {
  width: 50%;
  height: 70%;
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
</style>
