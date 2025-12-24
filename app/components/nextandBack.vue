<template>
  <div class="fixed left-10 w-80 bg-black rounded-lg p-2">
    <!-- YouTube player -->
    <div id="yt-player" class="w-full h-80 aspect-video rounded"></div>

    <!-- Controls -->
    <div class="flex justify-between mt-2">
      <button
        class="px-3 py-1 bg-white text-black rounded"
        @click="back5"
      >
        -5s
      </button>

      <button
        class="px-3 py-1 bg-white text-black rounded"
        @click="forward5"
      >
        +5s
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

let player = null

const loadYoutubeAPI = () => {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve()
      return
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => resolve()
  })
}

onMounted(async () => {
  await loadYoutubeAPI()

  player = new window.YT.Player('yt-player', {
    videoId: 'dQw4w9WgXcQ',
    playerVars: {
      autoplay: 0,
      controls: 1
    }
  })
})

const back5 = () => {
  if (!player) return
  const t = player.getCurrentTime()
  player.seekTo(Math.max(t - 5, 0), true)
}

const forward5 = () => {
  if (!player) return
  const t = player.getCurrentTime()
  player.seekTo(t + 5, true)
}
</script>

