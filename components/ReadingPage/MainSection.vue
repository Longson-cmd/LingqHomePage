<script setup>
import {watch, ref, onBeforeUnmount, onMounted, nextTick} from 'vue'

const scroller = ref(null)
const total = ref(1)
const page = ref(1)
const paddingHeight = ref(0)
const LINE_HEIGHT = 56


const props = defineProps({
  paragraphs: {
    type: Array,
    required: true
  },

  currentPage: Number
})


watch(
 () => props.currentPage,
  (currentPage) => {
    goToPage(currentPage)
  }
)

const emit = defineEmits(['update'])

const sendData = () => {
  emit('update', {
    'total': total.value,
    'page': page.value
  })
}


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

  sendData()
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

  sendData()
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



</script>


<template>
  <div class="h-[600px] flex flex-col bg-gray-50">
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
        v-for="(para, paraIndex) in props.paragraphs"
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


  </div>
</template>




