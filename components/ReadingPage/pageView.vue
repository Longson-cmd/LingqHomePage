<script setup>
import {ref, onBeforeUnmount, onMounted} from 'vue'

const scroller = ref(null)
const total = ref(1)
const page = ref(1)

const updatePage = () => {
  const el = scroller.value
  if (!el) return

  const view = el.clientHeight || 1
  const totalHeight = el.scrollHeight || 1
  console.log("view: ", view , ' px')
  console.log("totalHeight: ", totalHeight , ' px')
  total.value = Math.max(1, Math.ceil(totalHeight / view))

  page.value = Math.min(
    total.value, Math.max(
      1, Math.round(el.scrollTop / view) + 1
    )
  )
}


const goToPage = (n) => {
  const el = scroller.value
  if (!el) return

  const view = el.clientHeight
  const target = Math.min(
    total.value, Math.max(1, n)
  )

  el.scrollTo({top: (target-1) * view, behavior: 'smooth'})

  page.value = target
}

const prevPage = () => goToPage(page.value-1)
const nextPage = () => goToPage(page.value+1)

let stopWheel, stopTouch

onMounted(() => {
  const el = scroller.value
  updatePage()
  window.addEventListener('resize', updatePage)
  stopTouch = e => e.preventDefault()
  stopWheel = e => e.preventDefault()

  el.addEventListener('wheel', stopWheel, {passive: false})
  el.addEventListener('touchmove', stopTouch, {passive: false})
})


onBeforeUnmount(() => {
  const el = scroller.value

  window.removeEventListener('resize', updatePage)

  if (el) {
    el.removeEventListener('wheel', stopWheel)
    el.removeEventListener('touchmove', stopTouch)
  }
})

const paragraphs = [
  "BLeo Babauta, créateur du blog Zen Habits, raconte son parcours personnel : il est passé d’une vie marquée par l’anxiété, les dettes, les mauvaises habitudes et l’insatisfaction, à une existence simple et apaisée.",
  "Ce « petit livre » est pensé comme un guide pratique et accessible, destiné à être mis en œuvre, pas seulement lu. Babauta invite le lecteur à consacrer un temps réel à la lecture et surtout à appliquer les principes proposés."
]
</script>

<!-- el.clientHeight, el.scrollHeight , el.scrollTop-->
 <!-- el.scrollTo({ top: (target - 1) * view, behavior: 'smooth' }) -->
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
      <article class="prose max-w-none px-6">

        <div v-for="i in 5" :key="i" class="text-4xl px-32">

          <div
          v-for="(para, paraIndex) in paragraphs"
          :key = 'paraIndex'
          class="flex  flex-wrap gap-4 mb-8"
          >
            <span
              v-for="(word, index) in para.split(' ')" :key="index"
              >{{word}}
            </span>

          </div>
        </div>
      </article>
    </main>

    <footer class="px-4 py-2 border-t bg-white flex justify-end gap-2">
      <button class="px-3 py-1 rounded border" @click="prevPage">Prev</button>
      <button class="px-3 py-1 rounded border" @click="nextPage">Next</button>
    </footer>
  </div>
</template>
