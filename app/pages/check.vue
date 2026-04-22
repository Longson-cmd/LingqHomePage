<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-4xl mx-auto bg-white border rounded-2xl shadow-md p-6">
      <h1 class="text-2xl font-bold text-[#0B1B32] mb-4">YouTube Subtitle Checker</h1>

      <div class="flex flex-col gap-3">
        <input
          v-model="videoUrl"
          type="text"
          placeholder="https://www.youtube.com/watch?v=..."
          class="border rounded-lg px-3 py-2"
        />
        <input
          v-model="lang"
          type="text"
          placeholder="en (optional)"
          class="border rounded-lg px-3 py-2 md:w-40"
        />
        <button
          @click="checkSubtitles"
          :disabled="loading"
          class="px-4 py-2 rounded-lg bg-[#0B1B32] text-white hover:bg-black disabled:opacity-60"
        >
          {{ loading ? 'Checking...' : 'Check subtitles' }}
        </button>
      </div>

      <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
      <p v-if="count !== null" class="mt-4 text-gray-700">Subtitle items: {{ count }}</p>

      <pre
        v-if="items.length > 0"
        class="mt-4 p-3 bg-gray-50 border rounded-lg text-xs overflow-auto max-h-[420px]"
      >{{ JSON.stringify(items.slice(0, 20), null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type TranscriptItem = {
  start: number
  duration: number
  text: string
}

const videoUrl = ref('')
const lang = ref('en')
const loading = ref(false)
const errorMessage = ref('')
const count = ref<number | null>(null)
const items = ref<TranscriptItem[]>([])

async function checkSubtitles() {
  loading.value = true
  errorMessage.value = ''
  count.value = null
  items.value = []

  try {
    const data = await $fetch<{ count: number; items: TranscriptItem[] }>('/api/transcript', {
      query: {
        videoUrl: videoUrl.value,
        lang: lang.value || undefined
      }
    })

    count.value = data.count
    items.value = data.items
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || error?.message || 'Failed to fetch subtitles'
  } finally {
    loading.value = false
  }
}
</script>
