<template>
  <div class="service-picker">
    <button @click="incrementCounter">Click me</button>
    <p>Counter: {{ counter }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ServicePicker',
  setup() {
    const counter = ref(0);

    const incrementCounter = () => {
      counter.value++;
    };

    return {
      counter,
      incrementCounter,
    };
  },
});
</script>

<style scoped>
.service-picker {
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>