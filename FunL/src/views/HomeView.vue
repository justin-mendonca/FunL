<script setup lang="ts">
import { inject, ref, onMounted, computed } from 'vue'
import axios from 'axios'
import TitleDetails from '@/components/TitleDetails.vue'
import Welcome from '@/components/Welcome.vue'
import Carousel from 'primevue/carousel'
import ProgressSpinner from 'primevue/progressspinner'
import InlineMessage from 'primevue/inlinemessage'
import type { FetchedTitle } from '@/interfaces/fetchedTitle'
import type { SubscribedService } from '@/interfaces/subscribedService'

// Pull in global state
const cachedResults = inject<Record<string, FetchedTitle[]>>('cachedResults')!
const searchResults = inject<FetchedTitle[]>('searchResults')!
const services = inject('services') as any

// Local state
const selectedTitle = ref<FetchedTitle | null>(null)
const genreMap = ref(new Map())
const isLoading = ref(true)
const responsiveOptions = ref([
  {
    breakpoint: '1199px',
    numVisible: 8,
    numScroll: 8
  },
  {
    breakpoint: '991px',
    numVisible: 4,
    numScroll: 4
  },
  {
    breakpoint: '767px',
    numVisible: 3,
    numScroll: 3
  }
])

const filteredGenreMap = computed(() => {
  if (!Object.entries(cachedResults).length) {
    cacheResults(genreMap.value)
  }

  return cachedResults
})

const cacheResults = (genreMap: Map<string, FetchedTitle[]>) => {
  for (const [genre, resultsArray] of genreMap) {
    if (resultsArray.length > 0) {
      cachedResults[genre]= resultsArray
    }
  }
}

const getUserData = async (subscriptionResponse: any) => {
  const arr: string[] = []

  const userSubscriptions = subscriptionResponse.data.data.$values

  userSubscriptions.forEach((subscription: SubscribedService) => {
    arr.push(subscription.streamingPlatformName)
  })

  try {
    const response = await axios.post(
      'https://jpmoregain-001-site1.gtempurl.com/platform/GetTitles',
      arr
    )
    const fetchedTitles = response.data.data.$values
    fetchedTitles.forEach((title: FetchedTitle) => {
      if (title.genres.$values.length > 0) {
        const genre = title.genres.$values[title.genres.$values.length - 1]

        if (!genreMap.value.has(genre)) {
          genreMap.value.set(genre, [])
        }

        genreMap.value.get(genre).push(title)
      }
    })
    searchResults.push(...fetchedTitles)
    isLoading.value = false
  } catch (error: any) {
    console.log(error)
  }
}

const getSelectedServicesData = async (servicesArr: string[]) => {
  const arr: string[] = []

  for (const platformName in services) {
    if (services[platformName] === true) arr.push(platformName)
  }

  try {
    const response = await axios.post(
      'https://jpmoregain-001-site1.gtempurl.com/platform/GetTitles',
      arr
    )
    const fetchedTitles = response.data.data.$values
    fetchedTitles.forEach((title: FetchedTitle) => {
      if (title.genres.$values.length > 0) {
        const genre = title.genres.$values[title.genres.$values.length - 1]

        if (!genreMap.value.has(genre)) {
          genreMap.value.set(genre, [])
        }

        genreMap.value.get(genre).push(title)
      }
    })
    searchResults.push(...fetchedTitles)
    isLoading.value = false
  } catch (error: any) {
    console.log(error)
  }
}

onMounted(async () => {
  if (Object.entries(cachedResults).length) {
    isLoading.value = false
  } else {
    const isLoggedIn = !!localStorage.getItem('jwtToken')

    let servicesAreSelected = false

    const arr: string[] = []

    for (const platformName in services) {
      if (services[platformName] === true) {
        servicesAreSelected = true
        arr.push(platformName)
      }
    }

    if (!isLoggedIn && !servicesAreSelected) {
      isLoading.value = false
      return
    }

    if (isLoggedIn) {
      const jwtToken = localStorage.getItem('jwtToken')

      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      }

      const response = await axios.get(
        'https://jpmoregain-001-site1.gtempurl.com/subscriptions',
        axiosConfig
      )
      if (response.status === 200) {
        await getUserData(response)
      }
    } else if (!isLoggedIn) {
      await getSelectedServicesData(arr)
    } else {
      isLoading.value = false
    }
  }
})

const handleTitleClick = (title: FetchedTitle) => {
  selectedTitle.value = title
}

const handleBackClick = () => {
  selectedTitle.value = null
}
</script>

<template>
  <div class="library">
    <div v-if="isLoading" class="loading-container">
      <InlineMessage severity="info" class="loading-message"
        >We're building your personalized library - This may take a moment.</InlineMessage
      >
      <ProgressSpinner aria-label="Loading" class="spinner" />
    </div>
    <div v-else class="library-container">
      <div v-if="selectedTitle">
        <TitleDetails :title="selectedTitle" @backClick="handleBackClick" />
      </div>
      <div v-else id="title-not-selected">
        <div v-if="searchResults.length === 0" id="welcome">
          <Welcome />
        </div>
        <div v-else id="title-image-container">
          <div v-for="(resultsArray, genre) in filteredGenreMap" :key="genre">
            <div class="genre-badge">{{ genre }}</div>
            <Carousel
              :value="resultsArray"
              :numVisible="8"
              :numScroll="8"
              :responsiveOptions="responsiveOptions"
              :showIndicators="false"
              class="carousel"
            >
              <template #item="slotProps">
                <div class="carousel-image-container">
                  <div class="mb-3">
                    <img
                      :src="slotProps.data.posterURLs[185]"
                      :alt="slotProps.data.name"
                      @click="handleTitleClick(slotProps.data)"
                      class="poster"
                    />
                  </div>
                </div>
              </template>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.library {
  background-color: var(--surface-ground);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
}

.p-carousel {
  max-width: 95vw;
}

.library-container {
  width: 100%;
  height: 100%;
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
}

#title-image-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.loading-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3%;
}

.loading-message {
  width: 25%;
}
.spinner {
  width: 30% !important;
  height: 30% !important;
}

.genre-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  background: transparent;
  border: 2px solid var(--text-color);
  border-radius: 20px;
  color: var(--text-color);
  margin: 0.5%;
  font-weight: 700;
  font-size: 1.3rem;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0.19);
  background-color: var(--surface-overlay);
}

.p-carousel-items-content {
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0.19);
}

@media (min-width: 1024px) {
  #welcome {
    height: 100%;
  }
  .carousel-image-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
  }

  .mb-3 {
    height: 100%;
    width: 100%;
  }

  .poster {
    width: 100%;
    height: 100%;
  }
}

@media (max-width: 768px) {
  .carousel-image-container {
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
  }

  .mb-3 {
    height: 100%;
    width: 100%;
  }

  .poster {
    width: 100%;
    height: 100%;
  }

  .genre-badge {
    margin: 3%;
    font-size: 1rem;
  }

  .loading-message {
    width: 80%;
  }
}
</style>
