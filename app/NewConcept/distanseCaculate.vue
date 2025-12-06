<template>
  <div class="p-6">

    <!-- Parent container -->
    <div
      id="text-container"
      ref="parentRef"
      class="p-4 bg-gray-100 rounded-md overflow-auto max-h-[300px] leading-8"
      style="position: relative;"
    >
      <!-- Render each word -->
      <span
        v-for="word in words"
        :key="word.id"
        :id="word.id"
        class="cursor-pointer bg-blue-50 hover:bg-blue-200 px-1 py-0.5 rounded inline-block mx-0.5"
        @click="onClickWord(word.id)"
      >
        {{ word.text }}
      </span>
    </div>

    <!-- Result -->
    <div class="mt-4 text-lg">
      Distance from top of parent:
      <span class="font-bold text-blue-600">{{ distance }}px</span>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const parentRef = ref(null)
const distance = ref(0)

// Long text sample (split into words)
const longText = `Voilà, c'est déjà l'heure de finir ce podcast. 
Merci de m'avoir écouté jusqu'au bout. 
Aujourd'hui nous avons parlé de la routine, des habitudes, 
et de la façon dont on peut améliorer son apprentissage de langue. 
Je vous souhaite une excellente journée et à très bientôt 
pour un nouvel épisode. Prenez soin de vous !`

// Split into words and assign IDs: w1, w2, w3...
const words = longText
  .split(/\s+/)
  .map((text, index) => ({
    id: `w${index + 1}`,
    text
  }))

// When clicking a word → calculate distance to parent
function onClickWord(id) {
  const wordEl = document.getElementById(id)
  const parentEl = parentRef.value

  // direct method
  const d = wordEl.offsetTop

  distance.value = d
}
</script>
