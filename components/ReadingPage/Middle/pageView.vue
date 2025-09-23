<script setup>
import {ref, onBeforeUnmount, onMounted, nextTick} from 'vue'

const scroller = ref(null)
const total = ref(1)
const page = ref(1)
const paddingHeight = ref(0)
const LINE_HEIGHT = 56


const getPageHeight = (el) => {
  const raw = el.clientHeight || 1
  // console.log("raw :" , raw)
  return Math.floor(raw / LINE_HEIGHT)  * LINE_HEIGHT || LINE_HEIGHT
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


  console.log("view: ", view , ' px')
  console.log("totalHeight: ", totalHeight , ' px')


  total.value = Math.max(1, Math.ceil(totalHeight / view))

  page.value = Math.min(
    total.value,
    Math.max(1, Math.round(el.scrollTop / view) + 1)
  )
}


const goToPage = (n) => {
  const el = scroller.value
  if (!el) return

  const view = getPageHeight(el) 
  const target = Math.min(
    total.value, Math.max(1, n)
  )

  el.scrollTo({top: (target-1) * view, behavior: 'smooth'})
  console.log('print top of a pages ', n , " :", (target-1) * view)
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
  "Ce « petit livre » est pensé comme un guide pratique et accessible, destiné à être mis en œuvre, pas seulement lu. Babauta invite le lecteur à consacrer un temps réel à la lecture et surtout à appliquer les principes proposés.",
  "L’auteur insiste sur l’importance de commencer par de petites actions quotidiennes, qui finissent par transformer durablement notre mode de vie.",
  "Il rappelle également que la simplicité ne consiste pas à se priver, mais à choisir consciemment ce qui compte vraiment pour nous.",
  "BLeo Babauta, créateur du blog Zen Habits, raconte son parcours personnel : il est passé d’une vie marquée par l’anxiété, les dettes, les mauvaises habitudes et l’insatisfaction, à une existence simple et apaisée.",
  "Ce « petit livre » est pensé comme un guide pratique et accessible, destiné à être mis en œuvre, pas seulement lu. Babauta invite le lecteur à consacrer un temps réel à la lecture et surtout à appliquer les principes proposés.",
  "L’auteur insiste sur l’importance de commencer par de petites actions quotidiennes, qui finissent par transformer durablement notre mode de vie. Il met en avant la force de la régularité et de la constance, plutôt que de chercher un changement radical immédiat.",
  "Il rappelle également que la simplicité ne consiste pas à se priver, mais à choisir consciemment ce qui compte vraiment pour nous. Ainsi, chaque geste devient une occasion de se recentrer sur l’essentiel et de cultiver plus de sérénité dans son quotidien."
];
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
    <main ref="scroller" class=" overflow-y-hidden">
      <article class=" relative prose max-w-none px-6 text-4xl">

        <div
        v-for="(para, paraIndex) in paragraphs"
        :key = 'paraIndex'
        class="flex  flex-wrap gap-4 mb-[72px]  px-32"
        >
          <span
            v-for="(word, index) in para.split(' ')" :key="index"
            >{{word}}
          </span>

        </div>
        <div :style="{ height: paddingHeight + 'px' }"></div>
      </article>

    </main>

    <footer class="px-4 py-2 border-t bg-white flex justify-end gap-2">
      <button class="px-3 py-1 rounded border" @click="prevPage">Prev</button>
      <button class="px-3 py-1 rounded border" @click="nextPage">Next</button>
    </footer>
  </div>
</template>




