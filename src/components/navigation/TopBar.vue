<template>
  <UHeader to="/">
    <template #title>
      <Martini />
      MMCK Drink DB
    </template>
    <UNavigationMenu
      :items="navItems"
      :ui="{
        list: 'min-w-[600px] justify-center',
      }"
    />
  </UHeader>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Martini } from '@lucide/vue'
import { useIngredientsStore } from '@/stores/ingredients'

const ingredientsStore = useIngredientsStore()
const { ingredientCategories } = storeToRefs(ingredientsStore)

const navItems = computed(() => [
  {
    label: 'Ingredients',
    to: '/ingredients',
    children: ingredientCategories.value.map((category) => ({
      label: category,
      to: `/ingredients?q=${encodeURIComponent(category)}`,
    })),
  },
  {
    label: 'Recipes',
    to: '/recipes',
  },
  {
    label: 'About',
    to: '/about',
  },
])

onMounted(() => {
  ingredientsStore.fetchIngredientCategories()
})
</script>
