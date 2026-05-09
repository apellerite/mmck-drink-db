import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

async function fetch(order = 'name', range = [0, 59]) {
    const { data } = await supabase.from('ingredients')
        .select()
        .order(order, { ascending: true })
        .range(range[0], range[1])
    
    return data
  }

export const useIngredientsStore = defineStore('ingredients', () => {
  const count = ref(0)
  const countFetched = ref(false)
  const ingredientsData = ref([])

  async function getIngredientCount() {
    if (count.value > 0) return

    const { count: ingredientCount } = await supabase.from('ingredients')
        .select('*', { count: 'exact', head: true })
    count.value = ingredientCount
    countFetched.value = true
  }

  function addIngredients(ingredients) {
    let newIngredients = ingredients
    if (ingredients.length > 0) {
        newIngredients = ingredients.filter(ing => !ingredientsData.value.some(existing => existing.id === ing.id))
    }

    ingredientsData.value = ingredientsData.value.concat(newIngredients)
  }

  async function fetchIngredients(order = 'name', range = [0, 59]) {
    if (countFetched.value && ingredientsData.value.length >= count.value) return

    fetch(order, range).then(data => {
        addIngredients(data)
    }).catch(error => {
        console.error('Error fetching ingredients:', error)
    })
  }
  
  return { count, ingredientsData, addIngredients, fetchIngredients, getIngredientCount }
})