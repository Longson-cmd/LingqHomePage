<template>
  <div class=" relative pl-5 pr-3 py-10 h-20 flex justify-between items-center bg-gray-50">
    <!-- AUDIO PART -->
    <font-awesome-icon  icon='fa-play-circle' :class="['text-4xl', openAudio? 'invisible' : '']" @click="toggleOpenAudioBox"/>

    <!-- AUDIO BOX -->
    <div v-if="openAudio" class="absolute p-2  w-[400px] -top-10  rounded-3xl bg-white shadow-md flex items-center justify-between gap-3">
      <font-awesome-icon icon="fa-play-circle" class="text-3xl"/>

      <div class="w-full ">
         <div class="">
          <AudioSlider v-model:value="progress" :duration="40" />
          <div class="flex justify-between text-xs my-1">
            <p class=""> {{ progress.toFixed(1) }}s</p>
            <p class=""> 40s</p>
          </div>
        </div>

        <div class="flex w-full items-center justify-between px-3 text-xl">
          <font-awesome-icon icon="fa-undo-alt" class=""/>
          <font-awesome-icon icon="fa-redo-alt"/>
          <font-awesome-icon icon="fa-solid fa-arrows-rotate" />
          <span class="italic text-2xl">1x</span>
          <img src="/icons/zoomout.svg" at="Sentence review" class="h-5 w-5"/>
        </div>

      </div>

      <button class="w-10 h-8 bg-gray-200 hover:bg-gray-300 items-center justify-center rounded-full" @click="toggleOpenAudioBox">
        <font-awesome-icon icon="fa-solid fa-times" class="text-2xl"/>
      </button>
    </div>

    <!-- BUTTON VIEW MODE -->
    <button @click="toggleView" class="p-2 rounded-md hover:bg-gray-200 text-xl font-semibold"> 
      <div v-if="sentenceMode" class="flex flex-col items-center justify-center">
        <img src="/icons/sentence-mode.svg" alt="Sentence Mode Icon" class="w-8 h-4"/>
        <span class="text-xs text-center">Sentence view</span>
      </div>
      <div v-else class="flex flex-col items-center justify-center">
        <img src="/icons/page-mode.svg" alt="Page Mode Icon" class="w-8 h-4"/>
        <span class="text-xs text-center">Page view</span>
      </div>
    </button>

    <!-- REVIEW MODE -->
    <button class=" p-2 rounded-md hover:bg-gray-200  text-xl font-semibold ">
        <img :src="sentenceMode ? '/icons/review-sentence.svg' : '/icons/review-page.svg'"  at="Sentence review" class="h-10 w-10"/> 
    </button>
  </div>


</template>


<script setup>
import {ref} from 'vue'

import AudioSlider from '~/composables/AudioSlider.vue'
const progress = ref(3)

const sentenceMode = ref(false)
const openAudio = ref(false)

const toggleView = () => {
  sentenceMode.value = !sentenceMode.value

  console.log(sentenceMode.value)
}


const toggleOpenAudioBox = () => {
  openAudio.value = !openAudio.value
}


</script>

