<template>
  <div class=" relative flex justify-between items-center py-80 px-10 h-screen">
    <button @click="openAudioBox = true" class="h-12 w-12 rounded-full bg-black/80 flex items-center justify-center">
        <img src="/icons/reader/play.svg" alt="play"/>
    </button>

    <div v-show="openAudioBox" class="w-88 absolute left-20 z-0 border bg-white rounded-3xl shadow-md px-2 pb-1 flex items-center justify-between">
        <button @click="playAudio" class="h-10 w-10 rounded-full bg-black/80 shawdow-md flex items-center justify-center whitespace-nowrap shrink-0">
            <img :src="!isPlaying? '/icons/reader/play.svg' : '/icons/reader/pause.svg'" alt="play or pause">
        </button>

        <div class="flex flex-col w-full px-2">
            <div class="">
                <audio 
                :src="audioURL"
                ref="audioRef"
                class="sr-only"
                preload="metadata"
                @loadedmetadata="onLoaded"
                @timeupdate="onTimeUpdate"
                @ended="handleEnd"
                />
                <AudioSlider :input-max="duration" v-model:input-value="currentTime"/>
                <span class="flex text-sm justify-between px-2 ">
                    <span>{{minutesSeconds(Math.round(currentTime))}}</span>
                    <span>{{minutesSeconds(Math.round(duration))}} </span>
                </span>
            </div>

            <div class="w-full flex justify-between gap-1 mt-1">
                <button @click="currentTime = Math.max(0, currentTime -5)" class="h-8 px-1 hover:bg-gray-300 rounded-lg flex items-center justify-center"><img src="/icons/reader/fiveSecondback.svg" alt="fiveSecondback"/></button>
                <button @click="currentTime = Math.min(duration, currentTime +5)" class="h-8 px-1 hover:bg-gray-300 rounded-lg flex items-center justify-center"><img src="/icons/reader/fiveSecondnext.svg" alt="fiveSecondnext"/></button>
                <button @click="isLoop = !isLoop ; console.log('isLoop', isLoop)" :class="isLoop && 'bg-gray-300'" class="h-8 px-1 rounded-lg flex items-center justify-center"><img src="/icons/reader/repeat.svg" alt="repeat"/></button>
                <div ref="speedOptionsRef" class="relative">
                    <button @click="openAudioOptions = !openAudioOptions" class="w-16 h-8 px-1 hover:bg-gray-300 rounded-lg italic flex items-center justify-center gap-1 text">{{`${audioSpeed}x`}}  <font-awesome icon="chevron-up"  class="text-xs mt-1"/></button>
                    <div v-if="openAudioOptions"
                    class="absolute w-36  bg-white border shadow z-10 right-0 top-0 rounded-xl -translate-y-full
                    flex flex-col overflow-hidden">
                        <button
                         v-for="speed in speedLists" 
                         class="" 
                         :class="[' w-full text-start py-1 px-5 text-lg hover:bg-gray-100', (speed === audioSpeed) && 'bg-gray-100']"
                         @click="changeAudioSpeed(speed)"           
                         >
                            {{speed}}
                        </button>
                    </div>
                </div>
                <NuxtLink class="h-8 px-1 hover:bg-gray-300 rounded-lg flex items-center justify-center"><img src="/icons/reader/zoomIn.svg" alt="zoomIn"/></NuxtLink>
            </div>

        </div>

        <button @click="openAudioBox = false" class="h-10 w-10 hover:bg-gray-300 rounded-full shrink-0">
            <font-awesome icon="times"/>
        </button>
    </div>

    <button @click="isSentenceView = !isSentenceView" class="hover:bg-gray-300 h-8 w-12 rounded-md flex items-center justify-center">
        <img  :src="isSentenceView ? '/icons/reader/sentenceView.svg' : '/icons/reader/lessonView.svg'" alt="viewMode">
    </button>

    <NuxtLink :to="isSentenceView? '/gameSentence' : '/gameLesson'"  class="hover:bg-gray-300 h-10 w-12 rounded-md flex items-center justify-center">
        <img :src="isSentenceView ? '/icons/reader/reviewSentence.svg' : '/icons/reader/reviewLesson.svg'" alt="reviewMode">
    </NuxtLink>

<!-- /icons/reader/reviewSentence.svg -->
  </div>
</template>


<script setup>
import {ref, nextTick, watch, onMounted, onBeforeUnmount} from 'vue'
import AudioSlider from './UI/AudioSlider.vue';

const isPlaying = ref(false)
const {minutesSeconds} = useTime()

const openAudioBox = ref(false)
const duration = ref(100)
const currentTime = ref(0)
const speedOptionsRef = ref(null)
const isSentenceView = ref(false)

const audioRef = ref(null)
const audioURL = 'http://localhost:3000/sounds/demo.mp3'
const isLoop = ref(false)

// const speedLists = ['2x', '1.5x','1.25x','1x','8.5x','0.75x','0.6x', '0.5x']
const speedLists = [2, 1.5, 1.25, 1, 0.85, 0.75, 0.6, 0.5]
const openAudioOptions = ref(false)
const audioSpeed = ref(speedLists[3])

const handleClickOutside = (e) => {
    if (speedOptionsRef.value && !speedOptionsRef.value.contains(e.target)) {
        openAudioOptions.value = false
    }
}

// audioRef
// HANDLE AUDIO PART
const onLoaded = () => {
    if (!audioRef.value) return
    duration.value = audioRef.value.duration
}

const onTimeUpdate = () => {
    if (!audioRef.value) return
    currentTime.value = audioRef.value.currentTime
}

const handleEnd = () => {
    if (!audioRef.value) return

    audioRef.value.currentTime = 0
    if (isLoop.value) {
        audioRef.value.play()
    }
    else {
        audioRef.value.pause()
        isPlaying.value = false
    }
}

const playAudio = () => {
    if (!audioRef.value) return

    if (isPlaying.value) {
        audioRef.value.pause()
    }
    else {
        audioRef.value.play()
    }
    isPlaying.value = !isPlaying.value
}

const changeAudioSpeed = (newSpeed) => {
    if (!audioRef.value) return
    audioSpeed.value = newSpeed
    openAudioOptions.value = false;
    audioRef.value.playbackRate = newSpeed
}   


watch(currentTime ,(newVal) => {
    if (audioRef.value && Math.abs(audioRef.value.currentTime - newVal) > 3) {
        audioRef.value.currentTime = newVal
    }
})

onMounted( async() => {
    await nextTick();
    onLoaded();
    onTimeUpdate();
    

    window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside)
}) 

</script>