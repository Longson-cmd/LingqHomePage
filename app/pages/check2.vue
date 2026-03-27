<template>
  <div class="flex gap-2 items-center">
    <!-- Input -->
    <input
      v-model="phrase"
      type="text"
      placeholder="Enter English phrase..."
      class="border rounded px-3 py-2 w-full"
    />

    <!-- Button -->
    <button
      @click="openTranslatePopup(phrase)"
      :disabled="!phrase.trim()"
      class="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-gray-400"
    >
      Translate
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const phrase = ref("");

function openTranslatePopup(text) {
  const q = text.trim();
  if (!q) return;

  const url =
    "https://translate.google.com/?sl=en&tl=vi&op=translate&text=" +
    encodeURIComponent(q);

  window.open(
    url,
    "translatePopup",
    "width=1000,height=600,noopener,noreferrer"
  );
}
</script>