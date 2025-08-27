<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, toRefs } from 'vue'

const props = defineProps({
  contentHtml: { type: String, required: true }
})
const { contentHtml } = toRefs(props)

const scroller = ref(null)
const page = ref(1)
const total = ref(1)

let sentences = []
let anchors = []      // [{ top, bottom, h }]
let pageStarts = []   // [index câu bắt đầu từng trang]

function measure() {
  const el = scroller.value
  if (!el) return

  // Lấy tất cả câu
  sentences = Array.from(el.querySelectorAll('.sentence'))

  // Bổ sung class cho snap (vì dùng v-html)
  sentences.forEach(n => n.classList.add('block', 'snap-start', 'snap-always', 'scroll-mt-4'))

  // Tính anchors
  anchors = sentences.map(n => {
    const top = n.offsetTop
    const h = n.offsetHeight
    return { top, bottom: top + h, h }
  })

  buildPages()
  updatePageByScroll()
}

function buildPages() {
  const el = scroller.value
  if (!el || sentences.length === 0) {
    pageStarts = [0]
    total.value = 1
    return
  }
  const view = el.clientHeight
  pageStarts = []
  let i = 0
  while (i < sentences.length) {
    pageStarts.push(i)
    const startTop = anchors[i].top
    let j = i
    while (j + 1 < sentences.length && (anchors[j + 1].bottom - startTop) <= view) {
      j++
    }
    // Nếu 1 câu quá dài > viewport, cho nó chiếm trọn 1 trang
    if (j === i && anchors[j].h > view) {
      j = i
    }
    i = j + 1
  }
  total.value = pageStarts.length
}

function scrollToPage(p) {
  const el = scroller.value
  if (!el || pageStarts.length === 0) return
  const target = Math.max(1, Math.min(p, pageStarts.length))
  const idx = pageStarts[target - 1]
  el.scrollTo({ top: anchors[idx].top, behavior: 'smooth' })
}

function prevPage() { scrollToPage(page.value - 1) }
function nextPage() { scrollToPage(page.value + 1) }

function updatePageByScroll() {
  const el = scroller.value
  if (!el || pageStarts.length === 0) { page.value = 1; return }
  const y = el.scrollTop + 1 // nhỏ để vượt ngưỡng
  let current = 0
  for (let k = 0; k < pageStarts.length; k++) {
    const idx = pageStarts[k]
    if (anchors[idx].top <= y) current = k
    else break
  }
  page.value = current + 1
}

function onResize() { measure() }
function onScroll() { updatePageByScroll() }

onMounted(async () => {
  await nextTick()
  const el = scroller.value
  el.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  // chờ font (nếu có) để đo chính xác
  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready } catch {}
  }
  measure()
})

onBeforeUnmount(() => {
  scroller.value?.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div class="h-screen flex flex-col bg-white">
    <header class="flex items-center justify-between px-4 py-2 border-b">
      <div class="font-semibold">Mini Reader</div>
      <div class="flex items-center gap-2">
        <button class="px-3 py-1 rounded border" @click="prevPage">Prev</button>
        <div class="text-sm tabular-nums">Page <b>{{ page }}</b> / <b>{{ total }}</b></div>
        <button class="px-3 py-1 rounded border" @click="nextPage">Next</button>
      </div>
    </header>

    <main
      ref="scroller"
      class="flex-1 overflow-y-auto px-5 py-4 snap-y snap-mandatory"
    >
      <!-- Nội dung LingQ (giữ class .sentence) -->
      <article class="prose max-w-none" v-html="contentHtml" />
    </main>
  </div>
</template>

<style>
/* đảm bảo mỗi câu xuống dòng để snap chuẩn */
.sentence { display: block; }
</style>
