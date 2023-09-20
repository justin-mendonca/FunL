<script setup lang="ts">
import { inject, ref, onMounted, computed } from 'vue'
import axios from 'axios'
import TitleDetails from '@/components/TitleDetails.vue'
import Welcome from '@/components/Welcome.vue'
import Carousel from 'primevue/carousel'
import ProgressSpinner from 'primevue/progressspinner'
import type { FetchedTitle } from '@/interfaces/fetchedTitle'
import type { SubscribedService } from '@/interfaces/subscribedService'

// Pull in global state
const searchResults = inject<FetchedTitle[]>('searchResults')!

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
  const filteredMap: Record<string, FetchedTitle[]> = {}

  for (const [genre, resultsArray] of genreMap.value) {
    if (resultsArray.length > 0) {
      filteredMap[genre] = resultsArray
    }
  }

  return filteredMap
})

const getData = async (subscriptionResponse: any) => {
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

onMounted(async () => {
  const isLoggedIn = !!localStorage.getItem('jwtToken')

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
    console.log(response)
    if (response.status === 200) {
      await getData(response)
    }
  } else {
    isLoading.value = false
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
    <ProgressSpinner v-if="isLoading" aria-label="Loading" class="spinner" />
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
  display: grid;
  width: 100%;
  justify-content: center;
  align-items: center;
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
}
</style>
