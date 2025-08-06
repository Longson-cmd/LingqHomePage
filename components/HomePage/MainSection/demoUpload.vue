<template>
  <div>
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      @change="handleFileChange"
    />

    <button
      class="px-4 py-2 bg-blue-600 text-white rounded"
      @click="() => fileInput.value?.click()"
    >
      Select File
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fileInput = ref(null)

async function handleFileChange(event) {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  try {
    const res = await fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      const result = await res.json()
      console.log('Upload success:', result)
    } else {
      console.error('Upload failed:', res.statusText)
    }
  } catch (error) {
    console.error('Error uploading:', error)
  }
}
</script>
