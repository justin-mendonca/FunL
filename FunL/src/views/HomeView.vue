<script setup lang="ts">
import { inject, ref } from 'vue'
import axios from 'axios'
import TitleDetails from '@/components/TitleDetails.vue'
import Welcome from '@/components/Welcome.vue'
import type { Services } from '@/interfaces/services'
import type { Title } from '@/interfaces/title'
import Carousel from 'primevue/carousel'
const apiKey = import.meta.env.VITE_API_KEY
const host = import.meta.env.VITE_HOST

// Local state
const selectedTitle = ref<Title | null>(null)

const responsiveOptions = ref([
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 3
  },
  {
    breakpoint: '991px',
    numVisible: 2,
    numScroll: 2
  },
  {
    breakpoint: '767px',
    numVisible: 1,
    numScroll: 1
  }
])

// Pull in global state
const services = inject<Services>('services')!
const searchResults = inject<Title[]>('searchResults')!

const formatServices = () => {
  let s = ''
  for (const serviceName in services) {
    if (services[serviceName as keyof Services]) {
      s = s.concat(serviceName.toLowerCase() + ',')
    }
  }
  // remove trailing comma
  return s.slice(0, -1)
}

// const getData = async () => {
//   const formattedServices = formatServices()

//   const getPage = async (nextCursor = null) => {
//     const options = {
//       method: 'GET',
//       url: 'https://streaming-availability.p.rapidapi.com/v2/search/basic',
//       params: {
//         country: 'us',
//         services: formattedServices,
//         cursor: nextCursor
//       },
//       headers: {
//         'X-RapidAPI-Key': apiKey,
//         'X-RapidAPI-Host': host
//       }
//     }

//     try {
//       const response = await axios.request(options)
//       const { data } = response
//       searchResults.value = searchResults.value.concat(data.result)

//       if (data.hasMore) {
//         await getPage(data.nextCursor)
//       } else {
//         console.log(searchResults)
//       }
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   await getPage()
// }

const getDataTest = async () => {
  const formattedServices = formatServices()

  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/v2/search/basic',
    params: {
      country: 'us',
      services: formattedServices
    },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': host
    }
  }

  try {
    const response = await axios.request(options)
    const { data } = response
    searchResults.push(...data.result)
    console.log(searchResults)
  } catch (error) {
    console.error(error)
  }
}

const handleTitleClick = (title: Title) => {
  selectedTitle.value = title
}

const handleBackClick = () => {
  selectedTitle.value = null
}
</script>

<template>
  <div class="home">
    <div v-if="selectedTitle">
      <TitleDetails :title="selectedTitle" @backClick="handleBackClick" />
    </div>
    <div v-if="!selectedTitle" id="title-not-selected">
      <div v-if="searchResults.length === 0" id="welcome">
        <Welcome />
        <ThemeButton @click="getDataTest">Get Data</ThemeButton>
      </div>
      <div id="title-image-container" v-if="searchResults">
        <Carousel
          :value="searchResults"
          :numVisible="6"
          :numScroll="6"
          :responsiveOptions="responsiveOptions"
        >
          <template #item="slotProps">
            <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
              <div class="mb-3">
                <img
                  :src="slotProps.data.posterURLs[185]"
                  :alt="slotProps.data.name"
                  @click="handleTitleClick(slotProps.data)"
                  class="w-6 shadow-2"
                />
              </div>
              <div>
                <h4 class="mb-1">{{ slotProps.data.title }}</h4>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .home {
    background-color: var(--surface-ground);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #title-not-selected {
    width: 100%;
    height: 100%;
  }

  #welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  #title-image-container {
    display: grid;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
}
</style>
