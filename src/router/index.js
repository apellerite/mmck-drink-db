import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

function checkAuthenticated() {
  const userStore = useUserStore()
  const { currentUser } = storeToRefs(userStore)

  if (!currentUser.value) {
    return { path: '/restricted' }
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@components/views/HomePage.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@components/views/AboutPage.vue'),
    },
    {
      path: '/ingredients',
      name: 'Ingredients',
      component: () => import('@components/views/IngredientsPage.vue'),
      props: (route) => ({ query: route.query.q }),
    },
    {
      path: '/ingredients/:id',
      component: () => import('@components/views/IngredientDetails.vue'),
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: () => import('@components/views/RecipesPage.vue'),
      beforeEnter: [checkAuthenticated],
    },
    {
      path: '/recipes/:id',
      component: () => import('@components/views/RecipeDetails.vue'),
      beforeEnter: [checkAuthenticated],
    },
    {
      path: '/restricted',
      component: () => import('@components/views/NoAccess.vue'),
      props: { isRedirect: true },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@components/views/NoAccess.vue'),
    },
  ],
})

export default router
