<script setup>
// Import ref from Vue to create reactive variables
import { ref } from 'vue'

// Reactive variable to store user input text (English)
const input = ref('')

// Reactive variable to store translated result (Vietnamese)
const result = ref('')


// 🟢 Translate English → Vietnamese
async function onTranslate(text) {
  console.log('text', text)
  // Source language code: English
  const source = 'en'

  // Target language code: Vietnamese
  const target = 'vi'

  // Get the current value typed by the user
  const text = input.value

  // Call Google Translate's public endpoint
  // encodeURIComponent ensures special characters don’t break the URL
  const res = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`
  )

  // Convert the HTTP response to JSON
  const data = await res.json()

  // Extract the translated text from Google’s response structure
  // data[0][0][0] = translated sentence
  result.value = data[0][0][0]
}


// 🟢 Speak English input text
function speakEnglish() {
  // Create a speech utterance using the input text
  const utterance = new SpeechSynthesisUtterance(input.value)

  // Set the language/accent for pronunciation
  utterance.lang = 'en-US'

  // Control speaking speed (1 = normal)
  utterance.rate = 1

  utterance.voice = speechSynthesis
    .getVoices()
    .find(v => v.name === 'Google français')

  // Send the utterance to the browser’s speech engine to play audio
  speechSynthesis.speak(utterance)
}
</script>


<template>
  <div class="p-5 space-y-3">
    <input
      v-model="input"
      placeholder="Enter English text"
      class="border p-2 rounded w-full"
    />

    <div class="flex gap-2">
      <button
        @click="onTranslate"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Translate
      </button>

      <button
        @click="speakEnglish"
        class="bg-green-500 text-white px-4 py-2 rounded"
      >
        Speak English
      </button>
    </div>

    <p class="text-lg">
      Result (Vietnamese): {{ result }}
    </p>
  </div>
</template>

<!-- 
Microsoft David – English (United States)

Microsoft Mark – English (United States)

Microsoft Zira – English (United States)

Google US Englis

Microsoft Huihui – Chinese (Simplified, PRC)

Google français -->