<script setup lang="ts">
import { inject, ref } from 'vue'
import axios from 'axios'
import TitleDetails from '@/components/TitleDetails.vue'
import Welcome from '@/components/Welcome.vue'
import type { Services } from '@/interfaces/services'
import type { Title } from '@/interfaces/title'
import Carousel from 'primevue/carousel'
import type { StreamingInfo } from '@/interfaces/streamingInfo'
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
//       searchResults.push(...data.result)

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

const flattenStreamingInfo = (streamingInfo: StreamingInfo, country: string) => {
  const flattenedInfo = []

  const servicesAvailable = streamingInfo[country]

  for (const service in servicesAvailable) {
    const waysToWatchTitleOnService = servicesAvailable[service]
    for (const wayToWatch of waysToWatchTitleOnService) {
      if (wayToWatch.type !== 'subscription') continue

      flattenedInfo.push({
        ...wayToWatch,
        Country: country,
        Platform: service
      })
    }
  }
  return flattenedInfo
}

// const getDataTest = async () => {
//   const formattedServices = formatServices()

//   const options = {
//     method: 'GET',
//     url: 'https://streaming-availability.p.rapidapi.com/v2/search/basic',
//     params: {
//       country: 'us',
//       services: formattedServices
//     },
//     headers: {
//       'X-RapidAPI-Key': apiKey,
//       'X-RapidAPI-Host': host
//     }
//   }

//   try {
//     const response = await axios.request(options)
//     const { data } = response
//     searchResults.push(...data.result)
//     console.log(searchResults)
//   } catch (error) {
//     console.error(error)
//   }
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
    searchResults.push(
      ...data.result.map((result) => ({
        ...result,
        streamingInfo: flattenStreamingInfo(result.streamingInfo, options.params.country)
      }))
    )
    console.log(searchResults)
  } catch (error) {
    console.error(error)
  }
}

const saveDataTest = async () => {
  console.log(searchResults)
  try {
    const response = await axios.post('http://localhost:5161/platform', searchResults)
    console.log(response)
  } catch (error) {
    console.log(error.response)
  }
}

// const getData = async () => {
//   try {
//     const response = await axios.get('http://localhost:5161/platform', {
//       params: {
//         country: 'us',
//         service: 'apple'
//       }
//     })
//     console.log(response.data)
//   } catch (error) {
//     console.log(error.response)
//   }
// }

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
      <div v-else id="title-image-container">
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
        <ThemeButton @click="saveDataTest">Save in db</ThemeButton>
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
