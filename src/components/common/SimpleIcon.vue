<template>
    <img class="simple-icon" :src="`https://simpleicons.org/icons/${props.icon}.svg`" :alt="`${props.icon} logo`" />
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    icon: String
})
</script>