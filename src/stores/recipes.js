import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'
import { toTitleCase } from '@/utils/stringFormat'

export const useRecipesStore = defineStore('recipes', () => {
  const count = ref(0)
  const countFetched = ref(false)
  const recipeTypes = ref([])
  const recipesData = ref([])

  async function getRecipeCount() {
    if (count.value > 0) return

    const { count: recipeCount } = await supabase
      .from('cocktails')
      .select('*', { count: 'exact', head: true })
    count.value = recipeCount
    countFetched.value = true
  }

  function addRecipes(recipes) {
    let newRecipes = recipes
    if (recipes.length > 0) {
      newRecipes = recipes.filter(
        (ing) => !recipesData.value.some((existing) => existing.id === ing.id),
      )
    }

    recipesData.value = recipesData.value.concat(newRecipes)
  }

  async function fetchRecipes({ order, range } = { order: 'name', range: [0, 49] }) {
    if (countFetched.value && recipesData.value.length >= count.value) return

    const { data } = await supabase
      .from('cocktails')
      .select()
      .order(order, { ascending: true })
      .range(range[0], range[1])
    addRecipes(data)
  }

  async function fetchRecipeTypes() {
    const { data } = await supabase.rpc('get_unique_cocktail_roots')
    recipeTypes.value = data.map((row) => toTitleCase(row.root))
  }

  return {
    count,
    recipeTypes,
    recipesData,

    addRecipes,
    fetchRecipes,
    fetchRecipeTypes,
    getRecipeCount,
  }
})
