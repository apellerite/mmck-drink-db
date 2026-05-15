<template>
    <UPageHero
        title="Welcome to the MMCK Drink Database"
        description="Discover a world of delicious drink recipes and ingredients. Browse through cocktails, mocktails, and more!">
        <UCarousel
            v-if="!loadingImages"
            v-slot="{ item }"
            :items="carouselItems"
            :autoplay="{ delay: 6000 }">
            <img :src="item" />
        </UCarousel>
    </UPageHero>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const carouselItems = ref([]);
const loadingImages = ref(true);

onMounted(async () => {
    try {
        const response = await fetch(
            `https://api.artic.edu/api/v1/artworks?limit=2&page=${Math.floor(Math.random() * 10000) + 1}&fields=id,title,image_id`
        );
        const results = await response.json();
        const baseUrl = results.config.iiif_url;

        const itemsWithImages = results.data.filter((item) => item.image_id);

        // Use Vite proxy to fetch images (bypasses CORS)
        Promise.all(
            itemsWithImages.map(async (item) => {
                const imageUrl = `${baseUrl}/${item.image_id}/full/400,/0/default.jpg`;
                try {
                    const imgResponse = await fetch(imageUrl);
                    if (!imgResponse.ok) {
                        throw new Error(`Failed to load image: ${imgResponse.statusText}`);
                    }
                    return imageUrl;
                } catch (error) {
                    console.error(`Error loading image for item ${item.id}:`, error);
                    return null; // Skip this image
                }
            })
        ).then((urls) => {
            carouselItems.value = urls.filter((url) => url !== null); // Filter out failed images
        });
        // carouselItems.value = itemsWithImages.map(
        //     (item) => `/api/image/${item.image_id}/full/400,/0/default.jpg`
        // );
    } catch (error) {
        console.error('Failed to load carousel images:', error);
    } finally {
        loadingImages.value = false;
    }
});
</script>