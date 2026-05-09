<template>
    <UPage>
        <UPageHeader title="Ingredients" />
        <UPageBody>
            <UInput
                v-model="searchQuery"
                class="w-full"
                type="search"
                placeholder="Search ingredients..."
                icon="i-lucide-search"
                size="xl" />
            <UPageGrid>
                <UPageCard
                    v-for="ingredient in filteredIngredients"
                    :key="ingredient.id"
                    :title="ingredient.name"
                    :description="`${ingredient.category}${ingredient.subCategory ? ' | ' + ingredient.subCategory: ''}${ingredient.flavor ? ' | ' + ingredient.flavor: ''}`" />
            </UPageGrid>
        </UPageBody>
    </UPage>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue'
import { useIngredientsStore } from '@/stores/ingredients'

    const ingredientsStore = useIngredientsStore()

    const filteredIngredients = ref([])
    const searchQuery = ref('')

    function filterIngredients() {
        if (!searchQuery.value) {
            filteredIngredients.value = ingredientsStore.ingredientsData.value
            return
        }

        filteredIngredients.value = ingredientsStore.ingredientsData.value.filter(ingredient =>
            ingredient.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            ingredient.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            ingredient.subCategory?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            ingredient.flavor?.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    }

    watch(searchQuery, filterIngredients)

    onMounted(() => {
        ingredientsStore.getIngredientCount()
        ingredientsStore.getIngredients()
        filterIngredients()
    })

</script>