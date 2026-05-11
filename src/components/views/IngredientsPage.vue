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
        size="xl"
      />
      <UPageGrid>
        <UPageCard
          v-for="ingredient in filteredIngredients"
          :key="ingredient.id"
          :title="ingredient.name"
          :description="`${ingredient.category}${ingredient.subCategory ? ' | ' + ingredient.subCategory : ''}${ingredient.flavor ? ' | ' + ingredient.flavor : ''}`"
        />
      </UPageGrid>
    </UPageBody>
  </UPage>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useIngredientsStore } from '@/stores/ingredients'
import { storeToRefs } from 'pinia'

const props = defineProps({
  query: String,
})

const ingredientsStore = useIngredientsStore()
const { ingredientsData } = storeToRefs(ingredientsStore)
const { getIngredientCount, fetchIngredients } = ingredientsStore

const filteredIngredients = ref([])
const searchQuery = ref(props.query || '')

function filterIngredients() {
  if (!searchQuery.value) {
    filteredIngredients.value = ingredientsData.value
    return
  }

  filteredIngredients.value = ingredientsData.value.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ingredient.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ingredient.subCategory?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ingredient.flavor?.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
}

watch(searchQuery, filterIngredients)

onMounted(async () => {
  getIngredientCount()
  await fetchIngredients()
  filterIngredients()
})
</script>
