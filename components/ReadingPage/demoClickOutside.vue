<template>
  <div>
    <span
    class="relative inline-block cursor-pointer border-2 border-transparent
    px-2 rounded hover:border-gray-200
    "
    @click.stop="openWordPopup('hello')"
    >
    Hello
    <wordPopUp 
    v-if="currentword"
    :new-word="currentword"
    />
    </span>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'

import wordPopUp from './ReadingPage/wordPopUp.vue';


const currentword = ref('')

const openWordPopup = (word) => {
  currentword.value = word
}

const handleClickOutside = (e) => {
  if (!currentword.value) return
  if (e.target.closet(".word-popup")) return

  currentword.value = ''
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside)
})

</script>