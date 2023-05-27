<template>
  <div class="selected-title">
    <button @click="$emit('backClick')">Back</button>
    <p id="title-text">{{ props.title?.title }}</p>
    <div id="title-detail-container">
      <div id="title-image">
        <img :src="props.title?.posterURLs[342]" alt="Movie/series poster" />
        <p>{{ props.title?.tagline }}</p>
      </div>
      <div id="title-details">
        <p>Description</p>
        <p>{{ props.title?.overview }}</p>
        <p>Cast: {{ formattedCast }}</p>
        <p>IMDb rating: {{ props.title?.imdbRating }}</p>
        <div id="link-container">
          <p>Watch on:</p>
          <div id="available-services">
            <div v-for="service in availableServices" :key="service">
              <a :href="service.link" target="_blank" rel="noreferrer noopener">
                <img :src="getServiceLogo(service.name)" :alt="`${service.name} logo`" class="service-imglink"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

onMounted(() => {
  filterServices()
})

const availableServices = ref<any>(null)
const props = defineProps({
  title: {
    type: Object
  }
})

const formattedCast = computed(() => {
  return props.title?.cast.join(', ')
})

// FIX TYPE SAFETY
// Filters out services where you have to purchase/rent the title
const filterServices = () => {
  availableServices.value = Object.entries(props.title?.streamingInfo.us)
    .filter(([, value]) => value.some((obj) => obj.type === 'subscription'))
    .map(([key, value]) => {
      const obj = value.find((obj) => obj.type === 'subscription')
      return { ...obj, name: key }
    })

  console.log(availableServices.value)
}

// Reused function from StreamingService.vue, refactor to prevent duplicate code
const getServiceLogo = (serviceName: String) => {
  return new URL(`../assets/logos/${serviceName}_logo.webp`, import.meta.url).href
}
</script>

<style scoped>
.selected-title {
  width: 100vw;
  box-sizing: border-box;
  padding: 1%;
}

#title-text {
  text-align: center;
  margin-bottom: 2%;
}

#title-detail-container {
  display: flex;
  min-width: 100%;
}

#title-image {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#title-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

#link-container {
    width: 100%;
    text-align: center;
}

#available-services {
    display: flex;
    gap: 10px;
    justify-content: center;
}
.service-imglink {
    width: 300px;
    height: 150px;
    object-fit: cover;
    border-radius: 3%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0.19);
}
</style>
