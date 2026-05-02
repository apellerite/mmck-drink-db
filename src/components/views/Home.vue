<template>
    <UPageHero
        title="Welcome to the MMCK Drink Database"
        description="Discover a world of delicious drink recipes and ingredients. Browse through cocktails, mocktails, and more!">
        <h2 class="text-center text-5xl">Featured Artwork</h2>
        <UCarousel
            :items="featuredArtSrc"
            :autoplay="{ delay: 6000 }"
            loop>
            <template #default="{ item, index }">
                <figure class="flex flex-col gap-4 text-center">
                    <img :src="item" class="max-h-[600px] max-w-full m-auto" />
                    <figcaption class="flex flex-col gap-2">
                        <span class="text-3xl italic">
                            {{ featuredArtDetails[index].title }}
                        </span>
                        <span class="text-xl">
                            {{ featuredArtDetails[index].artistInfo }}
                        </span>
                    </figcaption>
                    <UButton
                        v-if="featuredArtDetails[index].url"
                        class="mt-[24px] w-sm text-base self-center justify-center"
                        :to="featuredArtDetails[index].url"
                        target="_blank"
                        trailing-icon="i-lucide-external-link">
                        Read more at the MET Museum
                    </UButton>
                </figure>
            </template>
        </UCarousel>
    </UPageHero>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const featuredArtSrc = ref([]);
const featuredArtDetails = ref([]);

onMounted(async () => {
    try {
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
            21  // Modern Art
        ].join('|');

        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departments}`)
        .then(response => response.json())
        .then(data => {
            const { objectIDs, total } = data;

            const getRandomImage = () => {
                const randomID = objectIDs[Math.floor(Math.random() * total)];
                return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomID}`).then(res => res.json());
            };

            const makeArtPromises = (numPieces) => {
                const promises = [];
                for (let i = 0; i < numPieces; i++) {
                    promises.push(getRandomImage());
                }
                return Promise.all(promises);
            }

            makeArtPromises(10).then(artworks => {
                artworks.forEach(art => {
                    if (art.primaryImage) {
                        featuredArtSrc.value.push(art.primaryImage);
                        featuredArtDetails.value.push({
                            title: art.title,
                            artistInfo: `${art.artistPrefix} ${art.artistDisplayName}`,
                            url: art.objectURL
                        });
                    }
                });
            });
        })
    } catch (error) {
        console.error('Failed to load images:', error);
    }
});
</script>