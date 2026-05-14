import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

export const useIngredientsStore = defineStore('ingredients', () => {
  const count = ref(0)
  const countFetched = ref(false)
  const ingredientCategories = ref([])
  const ingredientsData = ref([])

  async function getIngredientCount() {
    if (count.value > 0) return

    const { count: ingredientCount } = await supabase
      .from('ingredients')
      .select('*', { count: 'exact', head: true })
    count.value = ingredientCount
    countFetched.value = true
  }

  function addIngredients(ingredients) {
    let newIngredients = ingredients
    if (ingredients.length > 0) {
      newIngredients = ingredients.filter(
        (ing) => !ingredientsData.value.some((existing) => existing.id === ing.id),
      )
    }

    ingredientsData.value = ingredientsData.value.concat(newIngredients)
  }

  async function fetchIngredients({ order, range } = { order: 'ingredient_name', range: [0, 49] }) {
    if (countFetched.value && ingredientsData.value.length >= count.value) return

    const { data } = await supabase
      .from('ingredients')
      .select()
      .order(order, { ascending: true })
      .range(range[0], range[1])
    addIngredients(data)
  }

  async function fetchIngredientCategories() {
    const { data } = await supabase.rpc('get_unique_ingredient_categories')
    ingredientCategories.value = data.map((row) => row.category)
  }

  return {
    count,
    ingredientCategories,
    ingredientsData,

    addIngredients,
    fetchIngredients,
    fetchIngredientCategories,
    getIngredientCount,
  }
})
