<template>
  <UPage>
    <UPageHeader title="Recipes" />
    <UPageBody>
      <UInput
        v-model="searchQuery"
        class="w-full"
        type="search"
        :placeholder="searchPlaceholder"
        icon="i-lucide-search"
        size="xl"
      />
      <UPageGrid>
        <UPageCard
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          :title="recipe.name"
          :description="recipe.description"
          :ui="{
            footer: 'flex gap-1',
          }"
        >
          <template #footer>
            <UBadge
              v-for="flavor in recipe.flavors"
              :key="flavor"
              :label="flavor"
              variant="outline"
            />
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageBody>
  </UPage>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import { storeToRefs } from 'pinia'
import { toTitleCase } from '@/utils/stringFormat'

const props = defineProps({
  query: String,
})

const recipesStore = useRecipesStore()
const { count, recipesData } = storeToRefs(recipesStore)
const { getRecipeCount, fetchRecipes } = recipesStore

const formattedRecipes = ref([])
const filteredRecipes = ref([])
const searchQuery = ref(props.query || '')

const searchPlaceholder = computed(() => {
  if (count.value > 0) {
    return `Search from ${count.value} recipes...`
  }
  return 'Search recipes...'
})

function formatRecipes(recipes) {
  const generateDescription = (recipe) => {
    let description = []
    if (recipe.parent) description.push(toTitleCase(recipe.parent))
    if (recipe.methodology) description.push(toTitleCase(recipe.methodology))

    return description.join(' | ')
  }

  const formatFlavors = (flavorString) => {
    if (!flavorString || flavorString === 'None') return []
    return flavorString.split(',').map((flavor) => flavor.trim())
  }

  formattedRecipes.value = recipes.map((recipe) => ({
    id: recipe.id,
    name: recipe.name,
    description: generateDescription(recipe),
    flavors: formatFlavors(recipe.flavor),
  }))
}

function filterRecipes() {
  if (!searchQuery.value) {
    filteredRecipes.value = formattedRecipes.value
    return
  }

  const lowercaseQuery = searchQuery.value.toLowerCase()
  filteredRecipes.value = formattedRecipes.value.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(lowercaseQuery) ||
      recipe.description.toLowerCase().includes(lowercaseQuery) ||
      recipe.flavors?.some((flavor) => flavor.includes(lowercaseQuery)),
  )
}

watch(searchQuery, filterRecipes)

onMounted(async () => {
  getRecipeCount()
  fetchRecipes().then(() => {
    formatRecipes(recipesData.value)
    filterRecipes()
  })
})
</script>
