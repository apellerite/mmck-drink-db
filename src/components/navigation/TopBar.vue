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

    <template #right>
      <div class="hidden lg:contents">
        <UFieldGroup v-if="currentUser">
          <UAvatar :text="userInitial" />
          <UDropdownMenu arrow :items="userDropdownItems">
            <UButton icon="i-lucide-chevron-down" variant="ghost" />
            <template #git-leading>
              <SimpleIcon icon="github" class="size-5" aria-hidden="true" />
            </template>
          </UDropdownMenu>
        </UFieldGroup>
        <LoginModal v-else />
      </div>
    </template>

    <template #body>
      <UNavigationMenu
        :items="popupNavItems"
        orientation="vertical">
        <template #profile-leading>
          <UAvatar :text="userInitial" size="xs" class="size-5" />
        </template>
        <template #git-leading>
          <SimpleIcon icon="github" class="size-5" aria-hidden="true" />
        </template>
      </UNavigationMenu>
      <LoginModal v-if="!currentUser" class="mt-3" />
    </template>
  </UHeader>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Martini } from '@lucide/vue'

import { useUserStore } from '@/stores/user'
import { useIngredientsStore } from '@/stores/ingredients'
import { useRecipesStore } from '@/stores/recipes'

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const ingredientsStore = useIngredientsStore()
const { ingredientCategories } = storeToRefs(ingredientsStore)

const recipesStore = useRecipesStore()
const { recipeTypes } = storeToRefs(recipesStore)

// Reusable nav objects
const aboutNav = {
  label: 'About',
  to: '/about',
}

const ingredientNav = {
  label: 'Ingredients',
  to: '/ingredients',
}

const profileNav = {
  label: 'User Profile',
  icon: 'i-lucide-user',
  class: 'cursor-pointer',
  slot: 'profile'
}

const gitNav = {
  label: 'GitHub Repo',
  to: 'https://github.com/apellerite/mmck-drink-db',
  target: '_blank',
  slot: 'git',
}

const logoutBtn = computed(() => {
  return {
    label: 'Logout',
    icon: 'i-lucide-log-out',
    class: 'cursor-pointer',
    onSelect: () => userStore.logoutUser()
  }
})

const recipeNav = computed(() => {
  return {
    label: 'Recipes',
    icon: currentUser.value ? '' : 'i-lucide-lock',
    disabled: !currentUser.value,
    to: '/recipes',
  }
})

const userInitial = computed(() => {
  if (currentUser.value?.email) {
    const firstInitial = currentUser.value.email[0]
    return firstInitial.toUpperCase()
  }
  return ''
})

// Various nav layouts
const navItems = computed(() => [
  {
    ...ingredientNav,
    children: ingredientCategories.value.map((category) => ({
      label: category,
      to: `/ingredients?q=${encodeURIComponent(category)}`,
    })),
  },
  {
    ...recipeNav.value,
    children: recipeTypes.value.map((root) => ({
      label: root,
      to: `/recipes?q=${encodeURIComponent(root)}`,
    })),
  },
  aboutNav
])

const popupNavItems = computed(() => {
  const items = [[ ingredientNav, recipeNav.value, aboutNav ]]
  const userItems = [ gitNav ]

  if (currentUser.value) {
    items.unshift([profileNav])
    userItems.push(logoutBtn.value)
  }
  items.push(userItems)

  return items
})

const userDropdownItems = computed(() => [
  [
    {
      label: currentUser.value.email || '',
      type: 'label',
    },
  ],
  [ profileNav, gitNav ],
  [ logoutBtn.value ],
])

onMounted(() => {
  userStore.getCurrentUser()
  ingredientsStore.fetchIngredientCategories()
  recipesStore.fetchRecipeTypes()
})
</script>
