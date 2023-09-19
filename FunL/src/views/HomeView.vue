<script setup lang="ts">
import { inject, ref, onMounted } from 'vue'
import axios from 'axios'
import TitleDetails from '@/components/TitleDetails.vue'
import Welcome from '@/components/Welcome.vue'
import Carousel from 'primevue/carousel'
import ProgressSpinner from 'primevue/progressspinner'
import type { FetchedTitle } from '@/interfaces/fetchedTitle'
import type { SubscribedService } from '@/interfaces/subscribedService'

// Local state
const selectedTitle = ref<FetchedTitle | null>(null)
const comedyResults = ref<FetchedTitle[]>([])
const dramaResults = ref<FetchedTitle[]>([])
const thrillerResults = ref<FetchedTitle[]>([])
const documentaryResults = ref<FetchedTitle[]>([])
const crimeResults = ref<FetchedTitle[]>([])
const horrorResults = ref<FetchedTitle[]>([])
const biographyResults = ref<FetchedTitle[]>([])
const actionResults = ref<FetchedTitle[]>([])
const adventureResults = ref<FetchedTitle[]>([])
const warResults = ref<FetchedTitle[]>([])
const romanceResults = ref<FetchedTitle[]>([])
const musicResults = ref<FetchedTitle[]>([])
const familyResults = ref<FetchedTitle[]>([])
const fantasyResults = ref<FetchedTitle[]>([])
const historyResults = ref<FetchedTitle[]>([])
const scienceFictionResults = ref<FetchedTitle[]>([])
const sportResults = ref<FetchedTitle[]>([])
const mysteryResults = ref<FetchedTitle[]>([])
const westernResults = ref<FetchedTitle[]>([])
const animationResults = ref<FetchedTitle[]>([])
const musicalResults = ref<FetchedTitle[]>([])
const shortResults = ref<FetchedTitle[]>([])
const realityResults = ref<FetchedTitle[]>([])
const gameShowResults = ref<FetchedTitle[]>([])
const talkShowResults = ref<FetchedTitle[]>([])
const newsResults = ref<FetchedTitle[]>([])
const noirResults = ref<FetchedTitle[]>([])

const genreMap = new Map([
  ['Comedy', comedyResults],
  ['Drama', dramaResults],
  ['Thriller', thrillerResults],
  ['Documentary', documentaryResults],
  ['Crime', crimeResults],
  ['Horror', horrorResults],
  ['Biography', biographyResults],
  ['Action', actionResults],
  ['War', warResults],
  ['Adventure', adventureResults],
  ['Romance', romanceResults],
  ['Music', musicResults],
  ['Family', familyResults],
  ['Fantasy', fantasyResults],
  ['History', historyResults],
  ['Science Fiction', scienceFictionResults],
  ['Sport', sportResults],
  ['Mystery', mysteryResults],
  ['Western', westernResults],
  ['Animation', animationResults],
  ['Musical', musicalResults],
  ['Short', shortResults],
  ['Reality', realityResults],
  ['Game Show', gameShowResults],
  ['Talk Show', talkShowResults],
  ['News', newsResults],
  ['Film Noir', noirResults]
])

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

const isLoading = ref(true)

// Pull in global state
const searchResults = inject<FetchedTitle[]>('searchResults')!

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
        const resultsArray = genreMap.get(genre)!
        resultsArray.value?.push(title)
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
    <ProgressSpinner v-if="isLoading" aria-label="Loading" />
    <div v-else class="library-container">
      <div v-if="selectedTitle">
        <TitleDetails :title="selectedTitle" @backClick="handleBackClick" />
      </div>
      <div v-else id="title-not-selected">
        <div v-if="searchResults.length === 0" id="welcome">
          <Welcome />
        </div>
        <div v-else id="title-image-container">
          <div v-if="comedyResults">
            <h2>Comedies</h2>
            <Carousel
              :value="comedyResults"
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
          <div v-if="thrillerResults">
            <h2>Thrillers</h2>
            <Carousel
              :value="thrillerResults"
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
          <div v-if="actionResults">
            <h2>Action</h2>
            <Carousel
              :value="actionResults"
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
          <div v-if="dramaResults">
            <h2>Drama</h2>
            <Carousel
              :value="dramaResults"
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
}
</style>
