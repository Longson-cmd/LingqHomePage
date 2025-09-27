
<template>

  <div class="px-16 flex flex-col space-y-10  mdlg:flex-row mdlg:items-center mdlg:justify-between mdlg:space-y-0 mdlg:h-20 ">

    <!-- Search bar field   -->

    <div class="self-center flex items-center border-gray-300 rounded-lg">
      <input type="text" 
      placeholder="Search Library" class=" bg-white rounded-l-md p-2 border border-r-transparent border-gray-300 hover:border-gray-500  h-10 focus:ring-1 focus:ring-gray-100">
    
      <button class=" bg-white text-sm px-3 h-10 text-gray-500 hover:text-gray-600  rounded-r-md border border-l-transparent border-gray-300 hover:border-gray-500">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" class="hover:scale-125"/>
      </button>
    </div>


     <!-- Slider field   -->
    <div class="self-center w-[448px] px-4 relative">
      <div class="relative  flex items-center space-x-4 z-10">
        <span class="w-28 text-sm text-right truncate text-gray-600">{{levels[value[0]-1]}}</span>
        <div>
  
          <Slider
          v-model="value"
          :min="1"
          :max="6"
          :step="1"
          :range="true"
          :tooltip="false" 
          class="w-[200px]"     
          />
        </div>
        <span class="w-28 text-sm text-left truncate text-gray-600">{{levels[value[1]-1]}}</span>
      </div>


      <div class="absolute left-1/2 translate-x-[-50%] w-[200px] bottom-[-25px] ">
        <div class="relative h-10">
          <div></div>
          <div
          v-for="(label, index) in levels" :key="index"
          >
            <div class="absolute flex flex-col items-center text-xs text-gray-600 -translate-x-1/2" :style="{left: `${(index / (levels.length -1)) * 100}%`}">
              <div class="w-px h-4 bg-gray-400 mb-1"></div>
            </div>
          </div>
        </div>
      </div>    
    </div>

    <!-- import field   -->

    <button @click="showWindow = true" class="self-center flex w-32 items-center justify-center space-x-2  bg-blue-950 hover:bg-blue-900 text-white px-2 py-3 rounded-lg shadow-xl font-bold">
      <font-awesome-icon icon="fa-solid fa-file-circle-plus" />
      <div>Import</div>
      <font-awesome-icon icon="fa-solid fa-chevron-down" />
    </button>
  </div>

  <div v-if="showWindow" class="fixed z-50 top-2/3 left-1/2 translate-x-[-50%] translate-y-[-50%]">
    <div class="mx-auto border-2 bg-white w-full max-w-[600px] p-4 rounded-2xl shadow-md" >
  
      <!-- upper part -->
      <div class="text-xl pb-10 flex justify-between">
        <div class="font-bold">
          <font-awesome-icon icon="fa-solid fa-file-lines" class="pr-4"/>
          Import ebook
        </div>
  
        <button @click="showWindow = false">
          <font-awesome-icon icon="fa-solid fa-times"/>
        </button>
      </div>
  
      <!-- Lowerpart -->
      <div>
        <span class=" text-gray-800">
          Import your digital copy of your favourite book here! Just drag and drop in the selected area or choose a file from your computer. All imported books are private and only visible to you.
        </span>
  
        <div role="presentation" class="p-2 rounded-lg border-2 border-dashed border-blue-200 hover:border-blue-300 focus-outline-none">
          <input type="text" accept="application/*,.epub,.pdf,.mobi,.docx,.ttml,text/*,.txt,.srt,.ass,.vtt" class="sr-only"   >
          <div
            class="border-8 border-blue-200 hover:border-blue-300
                flex flex-wrap items-center justify-center gap-2 px-2 py-4 min-h-48 w-full
                "
          >
            <span class="text-xl text-center text-gray-500">
              Drag and drop your file here or 
            </span>
            <button class="flex items-center bg-blue-950 font-medium px-5 py-3 rounded-lg shadow-lg cursor-pointer text-white">Select file</button>
          </div>
        </div>
  
        <div class="pt-4 text-sm text-center ">Supported formats: <span class="text-red-600">EPUB, PDF, DOCX, TXT, MOBI, SRT, ASS, VTT, TTML.</span></div>
      </div>
    </div>
  </div>


</template>



<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Slider from '@vueform/slider';
import {ref} from 'vue'

const value = ref([1, 6])
const levels = ["Beginner 1", "Beginner 2", "Intermediate 1", "Intermediate 2", "Advanced 1", "Advanced 2"]

const showWindow = ref(false)

</script>


<!-- CAN REMOVE NUMBER ABOVE STICKS IN THE SLIDER -->

