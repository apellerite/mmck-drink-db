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
        <template #log>
          <LoginModal v-if="!currentUser" />
        </template>
      </UNavigationMenu>
    </template>
  </UHeader>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Martini } from '@lucide/vue'

import { useUserStore } from '@/stores/user'
import { useIngredientsStore } from '@/stores/ingredients'

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const ingredientsStore = useIngredientsStore()
const { ingredientCategories } = storeToRefs(ingredientsStore)

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

const logControl = computed(() => {
  const itemAttrs = {
    label: 'Logout',
    icon: 'i-lucide-log-out',
    class: 'cursor-pointer',
    slot: 'log'
  }

  if (currentUser.value) {
    itemAttrs.onSelect = () => userStore.logoutUser()
  }

  return itemAttrs
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
  recipeNav.value,
  aboutNav
])

const popupNavItems = computed(() => [
  [ profileNav ],
  [ ingredientNav, recipeNav.value, aboutNav ],
  [ gitNav, logControl.value ]
])

const userDropdownItems = computed(() => [
  [
    {
      label: currentUser.value.email || '',
      type: 'label',
    },
  ],
  [ profileNav, gitNav ],
  [ logControl.value ],
])

onMounted(() => {
  userStore.getCurrentUser()
  ingredientsStore.fetchIngredientCategories()
})
</script>
