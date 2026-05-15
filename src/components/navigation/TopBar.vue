<template>
    <UHeader to="/">
        <template #title>
            <Martini />
            MMCK Drink DB
        </template>
        <UNavigationMenu :items="navItems" />
    </UHeader>
</template>

<script setup>
import { computed } from 'vue';
import { Martini } from '@lucide/vue';

const navItems = computed(() => [
    { 
        label: 'Ingredients',
        to: '/ingredients',
        children: [
            { label: 'Spirits', to: '/ingredients/spirits' },
            { label: 'Mixers', to: '/ingredients/mixers' },
            { label: 'Garnishes', to: '/ingredients/garnishes' },
        ]
    },
    { 
        label: 'Recipes', 
        to: '/recipes' 
    },
    { 
        label: 'About', 
        to: '/about' 
    },
]);
</script>