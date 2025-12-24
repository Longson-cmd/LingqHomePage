<template>
  <div class="p-4 max-w-lg">
    <div class="rounded-lg overflow-hidden border">
      <div ref="playerEl" class="w-full aspect-video bg-black"></div>
    </div>

    <div class="mt-4 flex items-center gap-2">
      <button class="px-3 py-1 border rounded" @click="play">Play</button>
      <button class="px-3 py-1 border rounded" @click="pause">Pause</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const playerEl = ref(null)
let player = null

const videoId = 'dQw4w9WgXcQ'

function loadYouTubeAPI() {
  return new Promise((resolve) => {
    // If API already exists, resolve immediately
    if (window.YT && window.YT.Player) return resolve()

    // Create script tag for YouTube API
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'

    // YouTube calls this global function when ready
    window.onYouTubeIframeAPIReady = () => resolve()

    // Inject script into document
    document.body.appendChild(tag)
  })
}


// Only 2 functions you asked for:
function play() {
  player?.playVideo?.()
}

function pause() {
  player?.pauseVideo?.()
}

onMounted(async () => {
  await loadYouTubeAPI()

  player = new window.YT.Player(playerEl.value, {
  videoId,
  events: {
    onReady: () => {
      duration.value = player.getDuration()
    }
  }
})


})

onBeforeUnmount(() => {
  player?.destroy?.()
  player = null
})
</script>
