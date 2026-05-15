<template>
  <UModal title="Authentication">
    <UButton label="Login" variant="outline" icon="i-lucide-log-in" />
    <template #body>
      <UAuthForm
        icon="i-lucide-beer"
        title="Welcome"
        description="With valid credentials, you may view more of the site or edit content"
        :fields="authFields"
        :schema="authSchema"
        @submit="onSubmit"
      />
    </template>
  </UModal>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { z } from 'zod'

const userStore = useUserStore()

const authFields = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    required: true,
  },
]

const authSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required'),
})

function onSubmit(payload) {
  userStore.loginUser(payload.data)
}
</script>
