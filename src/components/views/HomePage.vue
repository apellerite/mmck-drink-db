<template>
  <UPageHero
    title="Welcome to the MMCK Drink Database"
    description="Discover a world of delicious drink recipes and ingredients. Browse through cocktails, mocktails, and more!"
    :links="buttonLinks"
  />
  <UPageSection title="Featured Artwork" description="Made possible by The Met Museum">
    <UCarousel
      class="mx-auto w-sm sm:w-xl"
      :items="featuredArtSrc"
      :autoplay="{ delay: 10000 }"
      dots
      fade
      loop
    >
      <template #default="{ item, index }">
        <UProgress v-if="loadingArt" />
        <div v-else class="flex flex-col">
          <figure class="flex flex-col gap-4 text-center">
            <img :src="item" class="max-h-[600px] m-auto" />
            <figcaption class="flex flex-col gap-2">
              <span class="text-3xl italic">
                {{ featuredArtDetails[index].title }}
              </span>
              <span class="text-xl">
                {{ featuredArtDetails[index].artistInfo }}
              </span>
            </figcaption>
          </figure>
          <UButton
            v-if="featuredArtDetails[index].url"
            class="mt-[24px] mx-auto"
            :to="featuredArtDetails[index].url"
            target="_blank"
            label=" Read more about this piece"
            color="neutral"
            variant="soft"
            trailing-icon="i-lucide-external-link"
          />
        </div>
      </template>
    </UCarousel>
  </UPageSection>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const featuredArtSrc = ref([])
const featuredArtDetails = ref([])
const loadingArt = ref(true)

const buttonLinks = [
  {
    label: 'Browse Cocktails',
    to: '/recipes',
    icon: 'i-lucide-wine',
  },
  {
    label: 'Browse Ingredients',
    to: '/ingredients',
    icon: 'i-lucide-sprout',
  },
]

const loadFeaturedArt = async () => {
  const departments = [
    1, // American Decorative Arts
    3, // Ancient West Asian Art
    5, // Arts of Africa, Oceania, and the Americas
    6, // Asian Art
    9, // Drawings and Prints
    10, // Egyptian Art
    11, // European Paintings
    12, // European Sculpture and Decorative Arts
    13, // Greek and Roman Art
    14, // Islamic Art
    17, // Medieval Art
    21, // Modern Art
  ].join('|')

  try {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departments}`,
    )
    const data = await response.json()
    const { objectIDs, total } = data

    const getRandomImage = async () => {
      const randomID = objectIDs[Math.floor(Math.random() * total)]
      const res = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomID}`,
      )
      return res.json()
    }

    const makeArtPromises = (numPieces) => {
      const promises = []
      for (let i = 0; i < numPieces; i++) {
        promises.push(getRandomImage())
      }
      return Promise.all(promises)
    }

    const artworks = await makeArtPromises(10)
    artworks.forEach((art) => {
      if (art.primaryImage) {
        featuredArtSrc.value.push(art.primaryImage)
        featuredArtDetails.value.push({
          title: art.title,
          artistInfo: `${art.artistPrefix} ${art.artistDisplayName}`,
          url: art.objectURL,
        })
      }
    })
  } catch (error) {
    console.error('Failed to load images:', error)
  } finally {
    loadingArt.value = false
  }
}

onMounted(() => {
  loadFeaturedArt()
})
</script>
