<template>
  <div class="title">
    <img :src="props.title?.posterURLs[185]" alt="Movie/series poster" class="title-poster" @click="$emit('titleClick', props.title)">
  </div>
</template>

<script setup lang="ts">
import type { Title } from '@/interfaces/title'

const props = defineProps({
  title: {
    type: Object as () => Title
  }
})

</script>

<style scoped>

.title-poster {
    width: 100%;
    height: 100%;
}
</style>
