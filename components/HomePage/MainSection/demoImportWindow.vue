<template>
  <div class="h-screen flex items-center justify-center ">
    <div class="border-2 w-full max-w-[600px] p-4 rounded-2xl shadow-md" v-if="showWindow">

      <!-- upper part -->
      <div class="text-xl pb-10 flex justify-between">
        <div class="font-bold">
          <font-awesome-icon icon="fa-solid fa-file-lines"  class="pr-4"/>
          Import ebook
        </div>

        <button @click="showWindow = false"><font-awesome-icon icon="fa-solid fa-times" /></button>
      </div>

      <!-- Lowerpart -->
      <div>
        <span class=" text-gray-800">Import your digital copy of your favourite book here! Just drag and drop in the selected area or choose a file from your computer.
           All imported books are private and only visible to you.
        </span>

        <div
        role="presentation"
        class="p-2 rounded-lg border-2 border-dashed border-blue-200 hover:border-blue-300 focus-outline-none"
        >
          <input type="file"
          accept="application/*,.epub,.pdf,.mobi,.docx,.ttml,text/*,.txt,.srt,.ass,.vtt"
          class="sr-only"       
          >
          <div class="border-8 border-blue-200 hover:border-blue-300
          flex flex-wrap items-center justify-center gap-2 px-2 py-4 min-h-48 w-full
          ">
          
            <span class="text-xl text-center text-gray-500">Drag and drop your file here or </span>
            <button class="flex items-center bg-blue-950 text-white font-medium px-5 py-3 rounded-lg cursor-pinter ">Select file</button>
          </div>
        </div>

        <div class="pt-4 text-sm text-center ">Supported formats: <span class="text-red-600">EPUB, PDF, DOCX, TXT, MOBI, SRT, ASS, VTT, TTML.</span></div>
      </div>
    </div>
  </div>
</template>


<script setup>
import {ref} from 'vue'

const showWindow = ref(true)

</script>
<!-- EPUB, PDF, DOCX, TXT, MOBI, SRT, ASS, VTT, TTML. -->
<!-- Import your digital copy of your favourite book here! Just drag and drop in the selected area or choose a file from your computer. All imported books are private and only visible to you. -->