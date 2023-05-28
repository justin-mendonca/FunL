<script setup lang="ts">
import { inject, ref } from 'vue'
import axios from 'axios'
import TitleImage from '@/components/TitleImage.vue'
import TitleDetails from '@/components/TitleDetails.vue'
import type { Services } from '@/interfaces/services';
import type { Title } from '@/interfaces/title';
const apiKey = import.meta.env.VITE_API_KEY
const host = import.meta.env.VITE_HOST

// Local state
const selectedTitle = ref<Title | null>(null)

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
      <ThemeButton @click="getDataTest">Get Data</ThemeButton>
      <div id="title-image-container">
        <div v-for="title in searchResults" :key="title.tmdbId">
          <TitleImage :title="title" @titleClick="handleTitleClick" />
        </div>
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

  #title-image-container {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
  }
}
</style>
