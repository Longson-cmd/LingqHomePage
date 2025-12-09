<template>
  <div class="p-4 space-y-4">
    <h2 class="font-semibold mb-2">Mini LingQ-style phrase demo</h2>

    <!-- Sentence display -->
    <p class="leading-8">
      <template v-for="chunk in chunks" :key="chunk.key">
        <!-- Phrase chunk -->
        <span
          v-if="chunk.type === 'phrase'"
          class="bg-yellow-200 rounded px-1 cursor-pointer hover:bg-yellow-300 transition-colors"
          @click="onPhraseClick(chunk)"
        >
          <span
            v-for="w in chunk.words"
            :key="w.id"
            class="inline"
          >
            {{ w.text }}<span v-if="w.spaceAfter"> </span>
          </span>
        </span>

        <!-- Single word chunk -->
        <span
          v-else
          class="cursor-pointer"
          :class="{
            'bg-blue-100 rounded px-1': chunk.index === selectionStartIndex
          }"
          @click="onWordClick(chunk.index)"
        >
          {{ chunk.word.text }}<span v-if="chunk.word.spaceAfter"> </span>
        </span>
      </template>
    </p>

    <!-- Instructions -->
    <div class="text-sm text-gray-600">
      <p>➤ Click a word to set <strong>start</strong>, then click another word to set <strong>end</strong>.</p>
      <p>➤ All words between them (inclusive) become one clickable phrase.</p>
    </div>

    <!-- Debug: show phrases created -->
    <div class="border rounded p-2 text-sm">
      <div class="font-semibold mb-1">Phrases data (for debugging):</div>
      <div v-if="phrases.length === 0" class="text-gray-500">
        No phrases yet. Click start + end word to create one.
      </div>
      <ul v-else class="list-disc list-inside space-y-1">
        <li v-for="p in phrases" :key="p.id">
          <span class="font-mono">#{{ p.id }}</span>:
          "{{ p.text }}"
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ----------------------------------------
// 1. Base words (like LingQ's w16, w17, ...)
// ----------------------------------------
const words = ref([
  { id: 16, text: 'Salut',      spaceAfter: true,  phraseId: null },
  { id: 17, text: 'à',          spaceAfter: true,  phraseId: null },
  { id: 18, text: 'tous',       spaceAfter: true,  phraseId: null },
  { id: 19, text: 'et',         spaceAfter: true,  phraseId: null },
  { id: 20, text: 'bienvenue',  spaceAfter: true,  phraseId: null },
  { id: 21, text: 'dans',       spaceAfter: true,  phraseId: null },
  { id: 22, text: "l'épisode",  spaceAfter: true,  phraseId: null },
  { id: 23, text: '33,',        spaceAfter: true,  phraseId: null },
  { id: 24, text: 'aujourd’hui',spaceAfter: true,  phraseId: null },
  { id: 25, text: 'on',         spaceAfter: true,  phraseId: null },
  { id: 26, text: 'va',         spaceAfter: true,  phraseId: null },
  { id: 27, text: 'voir',       spaceAfter: true,  phraseId: null },
  { id: 28, text: 'comment',    spaceAfter: true,  phraseId: null },
  { id: 29, text: 'se',         spaceAfter: true,  phraseId: null },
  { id: 30, text: 'préparer',   spaceAfter: true,  phraseId: null },
  { id: 31, text: 'pour',       spaceAfter: true,  phraseId: null },
  { id: 32, text: '2018.',      spaceAfter: false, phraseId: null }
])

// Used to create unique phrase IDs
const nextPhraseId = ref(1)

// Temporary selection start index (first clicked word)
const selectionStartIndex = ref(null)

// ----------------------------------------
// 2. Group words into chunks (word or phrase)
//    This mimics LingQ's "phrase-cluster"
// ----------------------------------------
const chunks = computed(() => {
  const result = []
  let currentPhrase = null

  words.value.forEach((w, index) => {
    if (w.phraseId) {
      // This word belongs to some phrase
      if (!currentPhrase || currentPhrase.phraseId !== w.phraseId) {
        // Start a new phrase chunk
        currentPhrase = {
          type: 'phrase',
          phraseId: w.phraseId,
          words: [w],
          key: `p-${w.phraseId}-${index}`
        }
        result.push(currentPhrase)
      } else {
        // Continue current phrase chunk
        currentPhrase.words.push(w)
      }
    } else {
      // Single word (no phrase)
      currentPhrase = null
      result.push({
        type: 'word',
        word: w,
        index,
        key: `w-${w.id}`
      })
    }
  })

  return result
})

// ----------------------------------------
// 3. Derived list of phrases for debugging
// ----------------------------------------
const phrases = computed(() => {
  const map = new Map()
  words.value.forEach((w) => {
    if (!w.phraseId) return
    if (!map.has(w.phraseId)) map.set(w.phraseId, [])
    map.get(w.phraseId).push(w.text)
  })

  return Array.from(map.entries()).map(([id, texts]) => ({
    id,
    text: texts.join(' ')
  }))
})

// ----------------------------------------
// 4. Create a phrase by assigning phraseId
//    to all words from startIndex to endIndex
// ----------------------------------------
function createPhrase(startIndex, endIndex) {
  const phraseId = nextPhraseId.value++
  for (let i = startIndex; i <= endIndex; i++) {
    words.value[i].phraseId = phraseId
  }
}

// ----------------------------------------
// 5. Click handling:
//    - 1st click: remember start index
//    - 2nd click: treat as end, create phrase
// ----------------------------------------
function onWordClick(index) {
  if (selectionStartIndex.value === null) {
    // First click → set starting word
    selectionStartIndex.value = index
  } else {
    // Second click → create phrase between start and this index
    const start = Math.min(selectionStartIndex.value, index)
    const end = Math.max(selectionStartIndex.value, index)
    createPhrase(start, end)
    selectionStartIndex.value = null
  }
}

// When clicking an existing phrase
function onPhraseClick(chunk) {
  alert(`Clicked phrase #${chunk.phraseId}: "${chunk.words.map(w => w.text).join(' ')}"`)
}
</script>

<style scoped>
/* Optional: just to make it look a bit nicer without Tailwind */
/* You can remove this if you're fully on Tailwind */
</style>
