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
      <UFieldGroup v-if="currentUser">
        <UAvatar :text="userInitial" />
        <UDropdownMenu arrow :items="userDropdownItems">
          <UButton icon="i-lucide-chevron-down" variant="ghost" />
          <template #git-leading>
            <UIcon :name="GithubIcon" class="size-5" />
          </template>
        </UDropdownMenu>
      </UFieldGroup>
      <LoginModal v-else />
    </template>
  </UHeader>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Martini } from '@lucide/vue'
import GithubIcon from '../icons/GithubIcon.vue'

import { useUserStore } from '@/stores/user'
import { useIngredientsStore } from '@/stores/ingredients'

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

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
    icon: currentUser.value ? '' : 'i-lucide-lock',
    disabled: !currentUser.value,
    to: '/recipes',
  },
  {
    label: 'About',
    to: '/about',
  },
])

const userInitial = computed(() => {
  if (currentUser.value?.email) {
    const firstInitial = currentUser.value.email[0]
    return firstInitial.toUpperCase()
  }
  return ''
})

const userDropdownItems = computed(() => [
  [
    {
      label: currentUser.value.email || '',
      type: 'label',
    },
  ],
  [
    {
      label: 'User Profile',
      icon: 'i-lucide-user',
    },
    {
      label: 'GitHub Repo',
      to: 'https://github.com/apellerite/mmck-drink-db',
      target: '_blank',
      slot: 'git',
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      class: 'cursor-pointer',
      onSelect: () => userStore.logoutUser(),
    },
  ],
])

onMounted(() => {
  userStore.getCurrentUser()
  ingredientsStore.fetchIngredientCategories()
})
</script>
