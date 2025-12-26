<template>
  <div class=" relative flex justify-between items-center py-80 px-10 h-screen">
    <button @click="openAudioBox = true" :class="openAudioBox && 'invisible pointer-events-none'" class="h-12 w-12 rounded-full bg-black/80 flex items-center justify-center">
        <img src="/icons/reader/play.svg" alt="play"/>
    </button>

    <div v-if="openAudioBox " class="absolute left-20 z-10  bg-white">
        <AudioYoutubeBox v-if="haveVideoId" @close-audio-box="openAudioBox = $send" :video-id="videoId"/>
        <AudioBox v-else @close-audio-box="openAudioBox = $send" :audioURL="audioURL"/>
    </div>
    

    <button @click="isSentenceView = !isSentenceView; console.log('openAudioBox ', openAudioBox)" class="hover:bg-gray-300 h-8 w-12 rounded-md flex items-center justify-center">
        <img  :src="isSentenceView ? '/icons/reader/sentenceView.svg' : '/icons/reader/lessonView.svg'" alt="viewMode">
    </button>

    <NuxtLink :to="isSentenceView? '/gameSentence' : '/gameLesson'"  class="hover:bg-gray-300 h-10 w-12 rounded-md flex items-center justify-center">
        <img :src="isSentenceView ? '/icons/reader/reviewSentence.svg' : '/icons/reader/reviewLesson.svg'" alt="reviewMode">
    </NuxtLink>


  </div>
</template>


<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'

import AudioYoutubeBox from './reading/component/AudioYoutubeBox.vue';
import AudioBox from './reading/component/AudioBox.vue';
const openAudioBox = ref(false)
const isSentenceView = ref(false)

const haveVideoId = true
const audioURL = ref('http://localhost:3000/sounds/demo.mp3')
const videoId = 'sRXnme3pD9M'


</script>