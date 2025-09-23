<template>
  <div class=" flex flex-col bg-gray-50 " :style="{height : props.boxHeight + 'px'}">
    <!-- SCROLLER -->
    <main class=" overflow-y-hidden" ref="scroller">
      <div
        v-for="(para, paraIndex) in paragraphs"
        :key="paraIndex"
        class="flex flex-wrap gap-x-4 gap-y-4 mb-[76px] px-36"
      >
        <span
          v-for="(word, index) in para.split(' ')"
          :key="index"
          class="relative h-[44px] inline-flex items-start leading-none whitespace-nowrap shrink-0 cursor-pointer
                 border-2 border-transparent hover:border-gray-200 rounded px-1"
          @click.stop="(e) => openWordPopup(word, index, paraIndex, e)"
        >
          <span :class="[knownwords.includes(word) ? 'bg-yellow-300' : 'bg-transparent', 'text-4xl']">
            {{ word }}
          </span>
        </span>
      </div>

      <div :style="{ height: paddingHeight + 'px' }"></div>
    </main>

    <!-- FOOTER -->
    <footer class="flex items-center justify-between px-4 py-3 border-t bg-white">
      <div class="font-semibold">Viewport Pager</div>
      <div class="flex items-center gap-2">
        <button class="px-3 py-1 rounded border" @click="prevPage">Prev</button>
        <div class="text-sm tabular-nums">
          Page <b>{{ page }}</b> / <b>{{ total }}</b>
        </div>
        <button class="px-3 py-1 rounded border" @click="nextPage">Next</button>
      </div>
    </footer>

    <!-- OVERLAY LAYER (insert) -->
    <div class="fixed inset-0 z-[9999] pointer-events-none" ref="overlayRoot">
      <div
        v-if="currentword"
        class="absolute pointer-events-auto"
        :style="{ left: popupPos.x + 'px', top: popupPos.y + 'px' }"
        @click.stop
      >
        <wordPopUp :new-word="currentword.word" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import wordPopUp from './wordPopUp.vue'
// import wordPopUp from './ReadingPage/Middle/wordPopUp.vue'

/* ---------- data demo ---------- */
const paragraphs = [
  "BLeo Babauta, créateur du blog Zen Habits, raconte son parcours personnel : il est passé d’une vie marquée par l’anxiété, les dettes, les mauvaises habitudes et l’insatisfaction, à une existence simple et apaisée.",
  "Ce « petit livre » est pensé comme un guide pratique et accessible, destiné à être mis en œuvre, pas seulement lu. Babauta invite le lecteur à consacrer un temps réel à la lecture et surtout à appliquer les principes proposés.",
  "L’auteur insiste sur l’importance de commencer par de petites actions quotidiennes, qui finissent par transformer durablement notre mode de vie.",
  "Il rappelle également que la simplicité ne consiste pas à se priver, mais à choisir consciemment ce qui compte vraiment pour nous.",
  "BLeo Babauta, créateur du blog Zen Habits, raconte son parcours personnel : il est passé d’une vie marquée par l’anxiété, les dettes, les mauvaises habitudes et l’insatisfaction, à une existence simple et apaisée.",
  "Ce « petit livre » est pensé comme un guide pratique et accessible, destiné à être mis en œuvre, pas seulement lu. Babauta invite le lecteur à consacrer un temps réel à la lecture et surtout à appliquer les principes proposés.",
  "L’auteur insiste sur l’importance de commencer par de petites actions quotidiennes, qui finissent par transformer durablement notre mode de vie. Il met en avant la force de la régularité et de la constance, plutôt que de chercher un changement radical immédiat.",
  "Il rappelle également que la simplicité ne consiste pas à se priver, mais à choisir consciemment ce qui compte vraiment pour nous. Ainsi, mỗi geste devient une occasion de se recentrer sur l’essentiel et de cultiver plus de sérénité dans son quotidien."
]



// if the height affects layout logic, react when it changes:
// watch(() => props.boxHeight, () => updatePage(), { immediate: true })
/* ---------- word popup state ---------- */
const knownwords = ref(['personnel', 'du', 'et', 'livre'])
const currentword = ref(null)      // { word, index, paraIndex, el }
const popupPos = ref({ x: 0, y: 0 })

/* ---------- Calculate where to reder word popup ---------- */
const overlayRoot = ref(null)
const placePopup = () => {
  const el = currentword.value?.el
  if (!el) return
  const r = el.getBoundingClientRect()
  // overlay là fixed/fullscreen => dùng toạ độ viewport là đủ
  popupPos.value = { x: r.left, y: r.bottom + 8 }
}

const openWordPopup = (word, index, paraIndex, e) => {
  currentword.value = { word, index, paraIndex, el: e.currentTarget }
  // (tuỳ chọn) toggle đã biết
  if (knownwords.value.includes(word)) {
    knownwords.value = knownwords.value.filter(w => w !== word)
  } else {
    knownwords.value.push(word)
  }
  placePopup()
}

const handleClickOutside = (e) => {
  if (!currentword.value) return
  if (!(e.target instanceof Element)) return
  // click trong overlay/popup thì không đóng
  if (e.target.closest('[data-role="word-popup"]')) return
  currentword.value = null
}

/* ---------- pager ---------- */
const scroller = ref(null)
const total = ref(1)
const page = ref(1)
const paddingHeight = ref(0)
const WORD_H = 44
const ROW_GAP = 16
const LINE_HEIGHT = WORD_H + ROW_GAP // 60

const getPageHeight = (el) => {
  const raw = el.clientHeight || 1
//   console.log('raw :' , raw)
  const snapped = Math.floor(raw / LINE_HEIGHT) * LINE_HEIGHT
  return snapped || LINE_HEIGHT
}

const updatePage = async () => {
  const el = scroller.value
  if (!el) return
  const view = getPageHeight(el)
  el.style.height = view + 'px'
  await nextTick()
  const rawHeight = el.scrollHeight
  const remainder = rawHeight % view
  paddingHeight.value = remainder === 0 ? 0 : (view - remainder)
  const totalHeight = rawHeight + paddingHeight.value
  // console.log('raw height :', rawHeight)
  // console.log('view :', view)
  // console.log('totalHeight :', totalHeight)
  total.value = Math.max(1, Math.ceil(totalHeight / view))
  page.value = Math.min(total.value, Math.max(1, Math.round(el.scrollTop / view) + 1))
}

const props = defineProps({
  boxHeight : {type : Number,  default: 0}
})

watch( () => props.boxHeight, async (h) => {
  if ( h> 0) {
    await nextTick()
    updatePage()
  }
})

const goToPage = (n) => {
  const el = scroller.value
  if (!el) return
  const view = getPageHeight(el)
  const target = Math.min(total.value, Math.max(1, n))
  el.scrollTo({ top: (target - 1) * view, behavior: 'smooth' })
  console.log(`top of page ${n} : ${(target - 1) * view}`)
}

const prevPage = () => goToPage(page.value - 1)
const nextPage = () => goToPage(page.value + 1)

const onScroll = () => {
  const el = scroller.value
  if (!el) return
  const view = getPageHeight(el)
  page.value = Math.min(total.value, Math.max(1, Math.round(el.scrollTop / view) + 1))
  placePopup() // giữ popup dính theo chữ khi cuộn
}

/* ---------- lifecycle ---------- */
let stopWheel, stopTouch
onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  const el = scroller.value
  updatePage()
  window.addEventListener('resize', () => { updatePage(); placePopup() })
  el.addEventListener('scroll', onScroll, { passive: true })

  // Nếu muốn cấm cuộn tay (pager only) thì bật 2 dòng dưới:
  stopWheel = e => e.preventDefault()
  stopTouch = e => e.preventDefault()
  el.addEventListener('wheel', stopWheel, { passive: false })
  el.addEventListener('touchmove', stopTouch, { passive: false })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  const el = scroller.value
  window.removeEventListener('resize', () => { updatePage(); placePopup() })
  if (el) {
    el.removeEventListener('scroll', onScroll)
    el.removeEventListener('wheel', stopWheel)
    el.removeEventListener('touchmove', stopTouch)
  }
})
</script>


