<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

// ——— SAMPLE DATA ———
// Replace with your real paragraphs (array of strings)
const paragraphs = [
  "BLeo Babauta, créateur du blog Zen Habits, raconte son parcours personnel...",
  "Ce « petit livre » est pensé comme un guide pratique et accessible...",
  "Troisième paragraphe de test pour vérifier la pagination sans couper de lignes...",
  "Quatrième paragraphe pour occuper de la place...",
  "Cinquième paragraphe pour les essais..."
]

// Refs & state
const scroller = ref(null)
const page = ref(1)
const total = ref(1)

// Store paragraph DOM refs in DOM order: [sectionIndex][paraIndex]
const paraRefs = ref([])

// which paragraph blocks are visible on the current page
const visibleKeys = ref(new Set())

// internal pages cache; each page = array of { key, section, para, height }
let _pagesCache = []
let ro = null

// Attach each paragraph element
function setParaRef (el, sectionNumber, paraIdx) {
  // v-for="i in 5" gives 1..5; normalize to 0-based for storage
  const s = Number(sectionNumber) - 1
  if (!paraRefs.value[s]) paraRefs.value[s] = []
  paraRefs.value[s][paraIdx] = el
}

// Build pages so each page contains only full paragraphs
function paginate () {
  const el = scroller.value
  if (!el) return
  const view = el.clientHeight || 1

  // Collect items in DOM order with their heights (incl. bottom margin)
  const items = []
  for (let s = 0; s < paraRefs.value.length; s++) {
    const list = paraRefs.value[s] || []
    for (let p = 0; p < list.length; p++) {
      const node = list[p]
      if (!node) continue
      const rect = node.getBoundingClientRect()
      const styles = getComputedStyle(node)
      const height = rect.height + parseFloat(styles.marginBottom || '0')
      items.push({ key: `${s + 1}-${p}`, section: s + 1, para: p, height })
    }
  }

  // Greedy pack paragraphs into pages up to viewport height
  const pages = []
  let acc = 0
  let current = []
  for (const it of items) {
    // Always place at least one paragraph per page
    if (current.length && acc + it.height > view) {
      pages.push(current)
      current = [it]
      acc = it.height
    } else {
      current.push(it)
      acc += it.height
    }
  }
  if (current.length) pages.push(current)

  _pagesCache = pages
  total.value = Math.max(1, pages.length)

  // Keep current page if possible
  showPage(Math.min(page.value, total.value))
}

// Apply visibility for page n (1-based)
function showPage (n) {
  if (!_pagesCache.length) return
  const i = Math.min(Math.max(1, n), _pagesCache.length) - 1
  page.value = i + 1
  visibleKeys.value = new Set(_pagesCache[i].map(it => it.key))
}

// Controls for template
function prevPage () { showPage(page.value - 1) }
function nextPage () { showPage(page.value + 1) }
function isVisible (sectionNumber, paraIdx) {
  return visibleKeys.value.has(`${sectionNumber}-${paraIdx}`)
}

onMounted(async () => {
  await nextTick()
  paginate()

  // Re-paginate on container resize (font changes, window resize, etc.)
  ro = new ResizeObserver(() => {
    const keep = page.value
    paginate()
    showPage(keep)
  })
  if (scroller.value) ro.observe(scroller.value)
  window.addEventListener('resize', paginate)
})

onBeforeUnmount(() => {
  if (ro) ro.disconnect()
  window.removeEventListener('resize', paginate)
})
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
    <main ref="scroller" class="relative flex-1 overflow-y-hidden">
      <article ref="article" class="prose max-w-none px-6">
        <div v-for="i in 5" :key="i" class="text-4xl px-32 leading-relaxed">
          <div
            v-for="(para, paraIndex) in paragraphs"
            :key="paraIndex"
            class="flex flex-wrap gap-4 mb-8"
          >
            <span v-for="(word, index) in para.split(' ')" :key="index" data-word>
              {{ word }}
            </span>
          </div>
        </div>
      </article>

      <!-- masks: hide any partial top/bottom line cleanly -->
      <div class="pointer-events-none absolute inset-x-0 top-0 h-5 bg-gray-50"></div>
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gray-50"></div>
    </main>


    <footer class="px-4 py-2 border-t bg-white flex justify-end gap-2">
      <button class="px-3 py-1 rounded border" @click="prevPage">Prev</button>
      <button class="px-3 py-1 rounded border" @click="nextPage">Next</button>
    </footer>
  </div>
</template>
