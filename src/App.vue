<template>
  <UApp>
    <TopBar />
    <UMain>
      <UBanner id="construction-banner" class="z-0" title="This site is under construction and is subject to change." icon="i-lucide-info" close />
      <UContainer>
        <RouterView />
      </UContainer>
    </UMain>
    <UFooter>
      <div class="flex gap-2 items-center">
        <p>Created as a fun side project</p>
        <Smile size="14" />
      </div>
    </UFooter>
  </UApp>
</template>

<script setup>
import TopBar from '@components/navigation/TopBar.vue'
import { Smile } from '@lucide/vue'
</script>
