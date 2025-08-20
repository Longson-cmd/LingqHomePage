<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const page = ref(1)
const total = ref(1)
const scroller = ref(null)

function updatePages() {
  const el = scroller.value
  if (!el) return
  const view = el.clientHeight || 1
  const totalHeight = el.scrollHeight || view
  total.value = Math.max(1, Math.ceil(totalHeight / view))
  page.value = Math.min(total.value, Math.max(1, Math.round(el.scrollTop / view) + 1))
}

function goToPage(n) {
  const el = scroller.value
  if (!el) return
  const view = el.clientHeight || 1
  const target = Math.min(total.value, Math.max(1, n))
  el.scrollTo({ top: (target - 1) * view, behavior: 'smooth' })
  page.value = target
}

const nextPage = () => goToPage(page.value + 1)
const prevPage = () => goToPage(page.value - 1)

let stopWheel, stopTouch

onMounted(() => {
  const el = scroller.value
  updatePages()
  window.addEventListener('resize', updatePages)

  // Block wheel & touch scroll
  stopWheel = e => e.preventDefault()
  stopTouch = e => e.preventDefault()
  el.addEventListener('wheel', stopWheel, { passive: false })
  el.addEventListener('touchmove', stopTouch, { passive: false })
})

onBeforeUnmount(() => {
  const el = scroller.value
  window.removeEventListener('resize', updatePages)
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
        <h1>One Long Flow of Text</h1>
        <p>Manual scrolling is disabled. Use Prev/Next.</p>
        <h2>Content</h2>
        <p v-for="i in 40" :key="i">
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
