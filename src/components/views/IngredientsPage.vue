<template>
  <UPage>
    <UPageHeader title="Ingredients" />
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
          v-for="ingredient in filteredIngredients"
          :key="ingredient.id"
          :title="ingredient.name"
          :description="ingredient.description"
          :ui="{
            footer: 'flex gap-1',
          }"
        >
          <template #footer>
            <UBadge
              v-for="flavor in ingredient.flavors"
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
import { useIngredientsStore } from '@/stores/ingredients'
import { storeToRefs } from 'pinia'

const props = defineProps({
  query: String,
})

const ingredientsStore = useIngredientsStore()
const { count, ingredientsData } = storeToRefs(ingredientsStore)
const { getIngredientCount, fetchIngredients } = ingredientsStore

const formattedIngredients = ref([])
const filteredIngredients = ref([])
const searchQuery = ref(props.query || '')

const searchPlaceholder = computed(() => {
  if (count.value > 0) {
    return `Search from ${count.value} ingredients...`
  }
  return 'Search ingredients...'
})

function formatIngredients(ingredients) {
  const generateDescription = (ingredient) => {
    let description = ingredient.base
    for (let i = 1; i <= 4; i++) {
      const addtlInfo = ingredient[`base_category${i}`]
      if (addtlInfo) {
        description += ` | ${addtlInfo}`
      }
    }
    return description
  }

  const formatFlavors = (flavorString) => {
    if (!flavorString || flavorString === 'None') return []
    return flavorString.split(',').map((flavor) => flavor.trim())
  }

  formattedIngredients.value = ingredients.map((ingredient) => ({
    id: ingredient.ingredient_id,
    name: ingredient.ingredient_name,
    description: generateDescription(ingredient),
    flavors: formatFlavors(ingredient.flavor),
  }))
}

function filterIngredients() {
  if (!searchQuery.value) {
    filteredIngredients.value = formattedIngredients.value
    return
  }

  const lowercaseQuery = searchQuery.value.toLowerCase()
  filteredIngredients.value = formattedIngredients.value.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(lowercaseQuery) ||
      ingredient.description.toLowerCase().includes(lowercaseQuery) ||
      ingredient.flavors?.some((flavor) => flavor.includes(lowercaseQuery)),
  )
}

watch(searchQuery, filterIngredients)

onMounted(async () => {
  getIngredientCount()
  fetchIngredients().then(() => {
    formatIngredients(ingredientsData.value)
    filterIngredients()
  })
})
</script>
