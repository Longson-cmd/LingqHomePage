<template>
  <div class="fixed bottom-52 left-96  bg-black rounded-lg p-2">
    <div id="yt-player" class="aspect-video rounded overflow-hidden"></div>

    <div class="mt-2 text-sm text-white">
      Current time: {{ currentTime.toFixed(2) }} s
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

let player = null
let timer = null

const currentTime = ref(0)

const loadYoutubeAPI = () =>
  new Promise((resolve) => {
    if (window.YT?.Player) return resolve()

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => resolve()
})

onMounted(async () => {
  await loadYoutubeAPI()

  player = new YT.Player('yt-player', {
    videoId: 'dQw4w9WgXcQ',
    playerVars: {
      controls: 1,
      modestbranding: 1,
      rel: 0 
    },
    events: {
      onStateChange: handleStateChange
    }
  })
})
const handleStateChange = (e) => {
  // Chỉ theo dõi thời gian khi video đang PLAYING hoặc PAUSED
  // (khi người dùng kéo thanh timeline, YouTube thường chuyển qua PAUSED rồi PLAYING)
  if (
    e.data === YT.PlayerState.PLAYING ||
    e.data === YT.PlayerState.PAUSED
  ) {
    startTracking()
  } else {
    // Các trạng thái khác như BUFFERING, ENDED, UNSTARTED → dừng theo dõi
    stopTracking()
  }
}

const startTracking = () => {
  // Đảm bảo không có interval cũ đang chạy
  stopTracking()

  // Lấy currentTime của video theo chu kỳ (polling nhẹ)
  timer = setInterval(() => {
    if (player?.getCurrentTime) {
      // Cập nhật thời gian hiện tại của video (giây)
      currentTime.value = player.getCurrentTime()
    }
  }, 200)
}

const stopTracking = () => {
  // Dừng interval đang theo dõi thời gian
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

</script>

