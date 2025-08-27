<script setup>
// Import reactive references and lifecycle hooks from Vue
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Reactive variable for current page number (starts at 1)
const page = ref(1)
// Reactive variable for total number of pages (starts at 1)
const total = ref(1)
// Reference to the scrolling container DOM element
const scroller = ref(null)

// Function to calculate and update total pages and current page
function updatePages() {
  const el = scroller.value            // Get the scrollable element
  if (!el) return                       // If it doesn't exist, stop
  
  const view = el.clientHeight || 1     // Height of the visible area (avoid divide by 0)
  const totalHeight = el.scrollHeight || view // Total scrollable height
  total.value = Math.max(1, Math.ceil(totalHeight / view)) // Total pages = total height ÷ view height
  page.value = Math.min(                // Ensure page is within range
    total.value,                        // Can't exceed total pages
    Math.max(1, Math.round(el.scrollTop / view) + 1) // Page = scroll position ÷ view height + 1
  )
}

// Scroll to a specific page number
function goToPage(n) {
  const el = scroller.value             // Get scrollable element
  if (!el) return                        // If it doesn't exist, stop
  
  const view = el.clientHeight || 1      // Height of visible area
  const target = Math.min(               // Clamp the target page within range
    total.value,                         // Not more than total pages
    Math.max(1, n)                       // Not less than page 1
  )
  
  // Smoothly scroll to the target page position
  el.scrollTo({ top: (target - 1) * view, behavior: 'smooth' })
  
  // Update the current page value
  page.value = target
}

// Go to next page
const nextPage = () => goToPage(page.value + 1)
// Go to previous page
const prevPage = () => goToPage(page.value - 1)

// Variables to store event handler references so we can remove them later
let stopWheel, stopTouch

// Code that runs when the component is mounted
onMounted(() => {
  const el = scroller.value              // Get scrollable element
  updatePages()                           // Calculate initial pages
  window.addEventListener('resize', updatePages) // Recalculate when window resizes

  // Define event handlers that prevent default scroll behavior
  stopWheel = e => e.preventDefault()
  stopTouch = e => e.preventDefault()

  // Attach handlers to block mouse wheel and touch scrolling
  el.addEventListener('wheel', stopWheel, { passive: false })
  el.addEventListener('touchmove', stopTouch, { passive: false })
})

// Code that runs before the component is destroyed
onBeforeUnmount(() => {
  const el = scroller.value
  window.removeEventListener('resize', updatePages) // Stop listening for resize
  
  // Remove the scroll-blocking event handlers if element exists
  if (el) {
    el.removeEventListener('wheel', stopWheel)
    el.removeEventListener('touchmove', stopTouch)
  }
})
</script>


<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <header class="flex items-center justify-between px-4 py-3 border-b bg-white">
      <div class="font-semibold">Viewport Pager</div>
      <div class="flex items-center gap-2">
        <button class="px-3 py-1 rounded border" @click="prevPage">Prev</button>
        <div class="text-sm tabular-nums">
          Page <b>{{ page }}</b> / <b>{{ total }}</b>
        </div>
        <button class="px-3 py-1 rounded border" @click="nextPage">Next</button>
      </div>
    </header>

    <!-- No manual scroll -->
    <main ref="scroller" class="flex-1 overflow-y-hidden">
      <article class="prose max-w-none px-6 py-6">
    
        <p v-for="i in 5" :key="i" class="text-4xl px-32">
          {{ i }}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor, nunc at
          gravida pharetra, lectus neque pulvinar odio, at ullamcorper mi justo vel tellus. 
          Donec egestas, mi in ultricies facilisis, urna tortor pretium nibh, at fermentum massa nibh a erat.
          Maecenas a bibendum velit. Aliquam dignissim sem at arcu suscipit, nec ultrices dui ultrices.
          Vivamus id feugiat sapien. Phasellus in diam eget nisl iaculis lobortis non vitae enim. 
          Suspendisse potenti. Integer tristique convallis mattis. Cras suscipit lectus lorem, 
          non pretium tortor interdum ut.
        </p>
      </article>
    </main>

    <footer class="px-4 py-2 border-t bg-white flex justify-end gap-2">
      <button class="px-3 py-1 rounded border" @click="prevPage">Prev</button>
      <button class="px-3 py-1 rounded border" @click="nextPage">Next</button>
    </footer>
  </div>
</template>
