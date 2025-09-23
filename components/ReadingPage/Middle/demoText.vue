<template>
  <div
    v-for="(para, paraIndex) in paragraphs"
    :key="paraIndex"
    class="flex p-10 flex-wrap gap-4"
  >
    <span
      v-for="(word, index) in para.split(' ')"
      :key="index"
      class="relative inline-flex items-start leading-none 
      whitespace-nowrap shrink-0 cursor-pointer 
      border-2 border-transparent hover:border-gray-200 px-1 rounded"
      @click.stop="openWordPopup(word, index, paraIndex)"
    >
      <!-- the word box stays the same size -->
      <span :class="knownwords.includes(word) ? 'bg-yellow-300' : 'bg-transparent'">
        {{ word }}
      </span>

      <!-- ABSOLUTE wrapper ensures popup doesn’t resize the word -->
      <div class="word-popup absolute left-0 top-full mt-2 z-50 pointer-events-none">
        <wordPopUp
          v-if="isActive(paraIndex, index)"
          :new-word="currentword?.word"
          class="pointer-events-auto"
          @click.stop
        />
      </div>
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import wordPopUp from './ReadingPage/Middle/wordPopUp.vue'

const paragraphs = [
  "BLeo Babauta, créateur du blog Zen Habits, raconte son parcours personnel : il est passé d’une vie marquée par l’anxiété, les dettes, les mauvaises habitudes et l’insatisfaction, à une existence simple et apaisée.",
  "Ce « petit livre » est pensé comme un guide pratique et accessible, destiné à être mis en œuvre, pas seulement lu. Babauta invite le lecteur à consacrer un temps réel à la lecture et surtout à appliquer les principes proposés."
]

const knownwords = ref(['personnel', 'du', 'et', 'livre'])
// null when closed
const currentword = ref(null) // { word, index, paraIndex } | null

const openWordPopup = (word, index, paraIndex) => {
  currentword.value = { word, index, paraIndex }   // ✅ proper assignment

  // optional toggle logic
  if (knownwords.value.includes(word)) {
    knownwords.value = knownwords.value.filter(w => w !== word)
  } else {
    knownwords.value.push(word)
  }
}

const isActive = (paraIndex, index) => {
  const c = currentword.value
  return !!c && c.paraIndex === paraIndex && c.index === index
}

// Close when clicking anywhere outside the popup
const handleClickOutside = (e) => {
  if (!currentword.value) return
  if (!(e.target instanceof Element)) return
  if (e.target.closest('.word-popup')) return
  currentword.value = null                          // ✅ reset correctly
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>


