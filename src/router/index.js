import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@components/views/HomePage.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@components/views/AboutPage.vue')
    },
    {
      path: '/ingredients',
      name: 'Ingredients',
      component: () => import('@components/views/IngredientsPage.vue')
    },
    {
      path: '/ingredients/:id',
      component: () => import('@components/views/IngredientDetails.vue')
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: () => import('@components/views/RecipesPage.vue')
    },
    {
      path: '/recipes/:id',
      component: () => import('@components/views/RecipeDetails.vue')
    }
  ],
})

export default router
