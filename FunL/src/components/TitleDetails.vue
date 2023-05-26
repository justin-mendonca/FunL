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
            <button @click="filterServices">See service info</button>
            <div v-for="service in props.title?.streamingInfo.us" :key="service">
              {{ service }}
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

const availableServices = ref<any>([])
const props = defineProps({
  title: {
    type: Object
  }
})

const formattedCast = computed(() => {
  return props.title?.cast.join(', ')
})

// CONTINUE HERE TRYING TO FIGURE OUT HOW TO FILTER SERVICES
const filterServices = () => {
  const servicesObj = props.title?.streamingInfo.us
  for (const service in servicesObj) {
    console.log(servicesObj[service])
    if (servicesObj[service][0].type == 'subscription') {
        availableServices.value.push({service: servicesObj[service]})
    }
  }
}


</script>

<style scoped>
.selected-title {
  width: 100vw;
  padding: 1%;
}

#title-text {
  text-align: center;
  margin-bottom: 2%;
}

#title-detail-container {
  display: flex;
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
}
</style>
