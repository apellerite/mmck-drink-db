<template>
  <UError :error="{ statusMessage, message }">
    <template #links>
      <UButton label="Return to home" icon="i-lucide-move-left" @click="directHome" />
      <LoginModal v-if="isRedirect" />
    </template>
  </UError>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  isRedirect: {
    type: Boolean,
    default: false,
  },
})

const statusMessage = computed(() => {
  if (props.isRedirect) {
    return 'Restricted Page'
  }

  return 'Page Not Found'
})

const message = computed(() => {
  if (props.isRedirect) {
    return 'Only authenticated users may view this content'
  }

  return 'There is no content for this path'
})

function directHome() {
  router.push({
    path: '/',
  })
}
</script>
