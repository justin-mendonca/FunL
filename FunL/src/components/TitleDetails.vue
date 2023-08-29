<template>
  <div class="selected-title">
    <ThemeButton label="Back" icon="pi pi-arrow-left" size="small" @click="$emit('backClick')" />
    <div id="title-detail-container">
      <div id="title-image">
        <img id="poster" :src="props.title?.posterURLs[500]" alt="Movie/series poster" />
      </div>
      <Card id="title-details">
        <template #title>{{ props.title?.name }}</template>
        <template #subtitle>{{ props.title?.tagline }}</template>
        <template #content>
          <p>{{ props.title?.overview }}</p>
        </template>
        <template #footer>
          <Panel header="Cast">
            <p class="m-0">
              {{ formattedCast }}
            </p>
          </Panel>
          <div id="footer-container">
            <imdbScore :imdbScore="props.title!.imdbRating" class="imdb"/>
            <div id="available-services">
              <div v-for="service in props.title!.streamingServices.$values" :key="service.$id">
                <a :href="service.link" target="_blank" rel="noreferrer noopener">
                  <img
                    :src="getServiceLogo(service.platform)"
                    :alt="`${service.platform} logo`"
                    class="service-imglink"
                  />
                </a>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FetchedTitle } from '@/interfaces/fetchedTitle'
import Card from 'primevue/card'
import Panel from 'primevue/panel'
import imdbScore from './Score.vue'

const props = defineProps({
  title: {
    type: Object as () => FetchedTitle
  }
})

const formattedCast = computed(() => {
  console.log(props.title?.posterURLs)
  return props.title?.cast.$values.join(', ')
})

// Only useful when fetching data directly from external API - when fetching from backend titles are already filtered to only include platforms by subscription only

/* const filterServices = () => {
  availableServices.value = Object.entries(props.title?.streamingInfo.us ?? {})
    .filter(([, value]) => {
      if (Array.isArray(value)) {
        return value.some(obj => obj.type === 'subscription');
      }
      return false;
    })
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        const obj = value.find(obj => obj.type === 'subscription');
        return { ...obj, name: key };
      }
      return null;
    })
    .filter(Boolean);
}; */

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
  font-size: 1.5rem;
  font-weight: 700;
}

#title-detail-container {
  display: flex;
  min-width: 100%;
}

#title-image {
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 40%;
}

#poster {
  border-radius: 2%;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0.19);
  margin-right: 3%;
}

#title-details {
  width: 50%;
}

#footer-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2%;
  align-items: center;
}

.imdb {
  width: 60%;
}

#available-services {
  display: flex;
  gap: 10px;
}
.service-imglink {
  width: 300px;
  height: 150px;
  margin-top: 5%;
  object-fit: cover;
  border-radius: 3%;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0.19);
}

.service-imglink :hover {
  
}
</style>
