
<!-- drag video  -->

<template>
  <div
    ref="boxRef"
    class="fixed border border-gray-400 w-72 aspect-video z-50 shadow-lg rounded-lg overflow-hidden"
    :style="{ left: x + 'px', top: y + 'px' }"
  >
    <!-- Drag handle (white space) -->
    <div
      class="h-10 bg-white flex items-center px-3 cursor-move select-none touch-none"
      @pointerdown="onPointerDown"
    >
      <!-- drag dots -->
      <div class="grid grid-cols-3 gap-1 opacity-60">
        <span v-for="i in 9" :key="i" class="h-1 w-1 bg-black rounded-full"></span>
      </div>

      

      <button
        class="ml-auto text-black/50 hover:text-black"
        @click.stop="close"
      >
        ✕
      </button>
    </div>

    <!-- Video area -->
    <div class="bg-black w-full h-[calc(100%-2.5rem)]">
      <iframe
        class="w-full h-full"
      
        :class=" dragging && 'pointer-events-none' "
        :src="embedUrl"
        frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
      />
    </div>
  </div>
</template>

<script setup>
// Import Vue Composition API helpers
import { ref, onMounted, onBeforeUnmount } from 'vue'

// YouTube embed URL for the iframe
const embedUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'

// Reference to the floating window DOM element
// Used to read width / height later
const boxRef = ref(null)

// Reactive X position (left) of the floating window
const x = ref(0)

// Reactive Y position (top) of the floating window
const y = ref(0)

// Flag to know whether the user is currently dragging
const dragging = ref(false)

// Store pointer position at the moment dragging starts
let startX = 0
let startY = 0

// Store window position at the moment dragging starts
let startLeft = 0
let startTop = 0

// Runs once when component is mounted to the DOM
onMounted(() => {
  // Set initial position to bottom-right of the viewport
  // 288 = width (w-72), 180 ≈ height of video + header
  // 12 = padding from screen edges
  x.value = Math.max(12, window.innerWidth - 288 - 12)
  y.value = Math.max(12, window.innerHeight - 180 - 12)
})

// Fired when user presses mouse / finger on the drag bar
function onPointerDown(e) {
  // Mark dragging as active
  dragging.value = true

  // Save pointer starting position
  startX = e.clientX
  startY = e.clientY

  // Save current window position
  startLeft = x.value
  startTop = y.value

  // Ensure we keep receiving pointer events
  // even if pointer leaves the element
  e.currentTarget.setPointerCapture(e.pointerId)

  // Listen globally so dragging continues smoothly
  window.addEventListener('pointermove', onPointerMove)

  // Stop dragging when pointer is released
  window.addEventListener('pointerup', onPointerUp, { once: true })
}

// Fired continuously while dragging
function onPointerMove(e) {
  // Ignore if not dragging
  if (!dragging.value) return

  // Calculate new position based on pointer movement delta
  const nextLeft = startLeft + (e.clientX - startX)
  const nextTop = startTop + (e.clientY - startY)

  // Get the floating window element
  const el = boxRef.value

  // Read element size (fallback if not mounted yet)
  const w = el ? el.offsetWidth : 288
  const h = el ? el.offsetHeight : 180

  // Clamp X position so the window stays inside viewport
  x.value = Math.min(Math.max(0, nextLeft), window.innerWidth - w)

  // Clamp Y position so the window stays inside viewport
  y.value = Math.min(Math.max(0, nextTop), window.innerHeight - h)


}

// Fired once when pointer is released
function onPointerUp() {
  // Stop dragging
  dragging.value = false

  // Remove move listener to avoid memory leaks
  window.removeEventListener('pointermove', onPointerMove)
}

// Close button handler
function close() {
  // Hide the floating window
  if (boxRef.value) {
    boxRef.value.style.display = 'none'
  }
}

// Cleanup when component is destroyed
onBeforeUnmount(() => {
  // Ensure no global listeners remain
  window.removeEventListener('pointermove', onPointerMove)
})
</script>

