<template>
  <header class="bg-white shadow">
    <nav class="container mx-auto flex items-center justify-between p-4">
      <NuxtLink to="/" class="text-2xl text-blue-600 font-bold">
        MyApp
      </NuxtLink>

      <button @click="toggleMenu" class="md:hidden">
        <FontAwesomeIcon
        :icon="isOpen ? 'fa-times' : 'fa-bars'"
        />
      </button>

      
      <ul
      :class="[
        'md:flex md:space-x-6 md:items-center pt-4',
        isOpen ? 'block': 'hidden'
      ]"
      >
        <li><NuxtLink to="/" class="text-gray-700 hover:text-blue-600">Home</NuxtLink></li>
        <li><NuxtLink to="/" class="text-gray-700 hover:text-blue-600">Contact</NuxtLink></li>
        <li><NuxtLink to="/" class="text-gray-700 hover:text-blue-600">About</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {ref} from 'vue'
const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>