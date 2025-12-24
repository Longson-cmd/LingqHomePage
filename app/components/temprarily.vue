<template>
 <div class="max-w-xl mx-auto mt-80 ">
    <div class="fixed top-5 left-96 w-60 bg-black rounded-lg p-2 ">
      <div id="yt-player" class=" w-full h-full rounded "></div>
  
      <div  class="text-white">
          current time {{ currentTime.toFixed(2) }} s
      </div>
    </div>

    <div class="border h-40 p-4">
      <div class="w-96  border bg-white rounded-3xl shadow-md px-2 pb-1 flex items-center justify-between">
        <button @click="playAudio" class="h-10 w-10 rounded-full bg-black/80 shawdow-md flex items-center justify-center whitespace-nowrap shrink-0">
              <img :src="!isPlaying? '/icons/reader/play.svg' : '/icons/reader/pause.svg'" alt="play or pause">
          </button>
  
        <div class="flex flex-col w-full px-2">
              <div
                @mousedown="onSeekStart"
                @mouseup="onSeekEnd"
              >         
                  <AudioSlider :input-max="duration" v-model:input-value="currentTime"/>
                  <span class="flex text-sm justify-between px-2 ">
                      <span>{{minutesSeconds(Math.round(currentTime))}}</span>
                      <span>{{minutesSeconds(Math.round(duration))}} </span>
                  </span>
              </div>
  
              <div class="w-full flex justify-between gap-1 mt-1">
                  <button @click="back" class="h-8 px-1 hover:bg-gray-300 rounded-lg flex items-center justify-center"><img src="/icons/reader/fiveSecondback.svg" alt="fiveSecondback"/></button>
                  <button @click="next" class="h-8 px-1 hover:bg-gray-300 rounded-lg flex items-center justify-center"><img src="/icons/reader/fiveSecondnext.svg" alt="fiveSecondnext"/></button>
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
      </div>
    </div>
 </div>

</template>

<script setup>
import {ref, onMounted, watch, onBeforeUnmount} from 'vue'
import AudioSlider from './UI/AudioSlider.vue'

const {minutesSeconds} = useTime()

let player = null
let timer = null

const currentTime = ref(0)
const duration = ref(100)
const isPlaying = ref(false)
const isUserSeeking = ref(false)
const isLoop = ref(false)


const speedLists = [2, 1.5, 1.25, 1, 0.85, 0.75, 0.6, 0.5]
const openAudioOptions = ref(false)
const audioSpeed = ref(speedLists[3])

const loadYoutubeAPI = () =>
  new Promise((resolve) => {
    if (window.YT?.Player) return resolve()

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => resolve()
})

onMounted( async () => {
  await loadYoutubeAPI()
 
  player = new YT.Player('yt-player', {
    videoId: 'dQw4w9WgXcQ', 

    playerVars : {
      controls: 1,// Hiện thanh điều khiển
      modestbranding: 1, // Giảm logo YouTube
      rel:0 // Không gợi ý video liên quan
    },

    events: {
      onReady: () => {
        duration.value = player.getDuration ()
      },

      onStateChange: handleStateChange
    }
  })
})


const stopTracking = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const startTracking = () => {
  stopTracking()

  timer = setInterval(() => {
    if (player?.getCurrentTime && !isUserSeeking.value) {
      currentTime.value = player.getCurrentTime()
    }
  }, 200)
}

const handleEnd = () => {
  if (!player) return

  stopTracking()
  player.seekTo(0, true)

  player.pauseVideo()

  if (isLoop.value) {
    player.playVideo()
  }

  else {
    isPlaying.value = false
  }
}

const handleStateChange = (e)=> {
    if (e.data === YT.PlayerState.ENDED) {
      handleEnd()
      return
    }

    isPlaying.value = (e.data === YT.PlayerState.PLAYING)

    if (
      e.data === YT.PlayerState.PLAYING || e.data === YT.PlayerState.PAUSED
    ) {
      startTracking()
    }

    else {
      stopTracking()
    }
}


// PAUSD AND PLAY

const playAudio = () => {
  if (isPlaying.value) {
    player?.pauseVideo?.()
  }

  else {
    player?.playVideo?.()
  }

  isPlaying.value = !isPlaying.value
}

const back = () => {
  if (!player) return

  const t = player.getCurrentTime()

  console.log("player.currentTime", t - 5)

  player.seekTo(Math.max(0, t-5), true)
}

const next = () => {
  if (!player) return

  const t = player.getCurrentTime()

  player.seekTo(Math.min(duration.value, t +5), true)
}

watch(currentTime , (newVal) =>  {
  if (!isUserSeeking.value) return
  if (player ) {
    player.seekTo(newVal, true)
  }

})

const onSeekStart = () => {
  isUserSeeking.value = true
}

const onSeekEnd = () => {
  isUserSeeking.value = false

  if (isPlaying.value) {
    player.playVideo()
  }

  else {
    player.pauseVideo()
  }
}


const changeAudioSpeed = (newSpeed) => {
  if (!player) return

  audioSpeed.value = newSpeed
  openAudioOptions.value = false
  player.setPlaybackRate(newSpeed)
}

onBeforeUnmount(() => {
  stopTracking();
  player?.destroy?.()
  player = null
})
</script>