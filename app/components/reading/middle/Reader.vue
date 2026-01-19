<template>
  <div class=" flex flex-col " :style="{height : readerHeight + 'px'}">



    <div class="relative  overflow-hidden flex flex-wrap gap-y-7" ref="prose" 
      @pointerdown.prevent="handlePointerDown"
      @pointermove="handlePointerEnter">
      <div v-for="(para, idPara) in lessondata" :key="idPara" class="text-3xl flex flex-wrap gap-y-7 px-2  text-start">

        <span v-for="(item, idItem) in para" :key="idItem" class="h-[44px] flex items-center">
          <span v-if="item['type'] === 'phrase'" v-show="item['visible']"
            class="phrase-item flex  gap-y-7 h-full  items-center  rounded  ring-2 ring-inset ring-transparent hover:ring-yellow-400"
            :class="['status-' + item['status']]" :data-first-w-idx="item['phrase'][0]['w_idx']"
            :data-first-s-idx="item['phrase'][0]['s_idx']" :data-first-idx-w-in-s="item['phrase'][0]['idx_w_in_s']"
            :data-first-p-idx="item['phrase'][0]['p_idx']"
            :data-end-w-idx="item['phrase'][item['phrase'].length - 1]['w_idx']"
            :data-end-s-idx="item['phrase'][item['phrase'].length - 1]['s_idx']"
            :data-end-idx-w-in-s="item['phrase'][item['phrase'].length - 1]['idx_w_in_s']"
            :data-end-p-idx="item['phrase'][item['phrase'].length - 1]['p_idx']">
            <span v-for="(word) in item['phrase']"
              :class="['inline-flex items-center h-[35px]  px-1', (isActice(word['w_idx']) && isOpenPopup) && 'bg-red-400']"
              v-show="word['visible_in_phrase']">

              <span
                :class="['status-' + word['status'], word['status'] === 6 ? 'hover:border-blue-600' : 'hover:border-yellow-300']"
                class="  word-item " :id="`w-${word['w_idx']}`" :data-w-idx="word['w_idx']" :data-s-idx="word['s_idx']"
                :data-idx-w-in-s="word['idx_w_in_s']" :data-p-idx="word['p_idx']">
                {{ word['word'] }}
              </span>

            </span>
          </span>

          <span v-else
            :class="['flex  h-[35px]  items-center px-1 -blue-400 ', (isActice(item['w_idx']) && isOpenPopup) && 'bg-red-400']">
            <span :id="`w-${item['w_idx']}`"
              :class="['status-' + item['status'], 'word-item', item['status'] === 6 ? 'hover:border-blue-600' : 'hover:border-yellow-300']"
              :data-w-idx="item['w_idx']" :data-s-idx="item['s_idx']" :data-idx-w-in-s="item['idx_w_in_s']"
              :data-p-idx="item['p_idx']">
              {{ item['word'] }}
            </span>
          </span>
        </span>

      </div>


      <div :style="{ height: remaining + 'px' }">
        <span>selected : {{selected.text}}</span>
      </div>
    </div>

    <!-- <div class="fixed inset-0 pointer-events-none z-10">
      <div v-if="startPointer"
        :class="['absolute pointer-events-auto', (!popupCoordinates.downward) && '-translate-y-full']"
        :style="{ left: popupCoordinates.x + 'px', top: popupCoordinates.y + 'px' }">
        <Popup :word="selected.text" v-if="isOpenPopup && !isDraging" @close-popup="isOpenPopup = $send" class="popup-item" />
      </div>
    </div> -->
  </div>
</template>

<script setup>
/* =========================================================
   Imports
========================================================= */
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

import Popup from './Popup.vue'


/* =========================================================
   Composables / Data Sources
   - Keep these near the top so readers know “where data comes from”
========================================================= */

const isOpenPopup = ref(false)

const {
  startPointer,
  currentPointer,
  handlePointerDown,
  handlePointerEnter,
  pointerUp,
  isDraging
} = useEventDelegation(isOpenPopup)

const {cleanWord} = useConvert()



/* =========================================================
    resize, props, emit: mount/unmount side-effects
========================================================= */
const props = defineProps({
  readerHeight: {type: Number, default: 500},
  currentValue : {type :Number, default: 1},
  lessonData: {type: Array, default : () => []},
  listSentence : {type: Array, default : () => []},
  statusTagsMeanings: {type: Array, default: () => []},
  coreData: {type: Array, default: () => []},
  currentPhraseStatus :{type: Number }
})
const lessondata = ref(props.lessonData)
const core_data = props.coreData

const newStatusDict = computed(() => {
  const statusDict = {}
  const listKeys = Object.keys(props.statusTagsMeanings)
  for (const item of listKeys) {
    if (item.split(" ").length === 1|| props.statusTagsMeanings[item].status >0) {
       statusDict[item] = props.statusTagsMeanings[item].status
    }
   
  }
  return statusDict
})

const emit = defineEmits(['update:currentValue', 'sendTotalPage', 'selected', 'sendStatusFromReader'])

const currentPage = computed({
  get: () => props.currentValue,
  set: (v) => emit('update:currentValue', v)
})

watch(currentPage,  (newVal) => {
    scrollNewPage(newVal);

    changePageStatus()

})

const totalPage = ref(1)


const sendPages = () => {
  emit('sendTotalPage', totalPage.value)
}

const {
  view,
  prose,
  remaining,
  updateTotalPages,
  scrollNewPage,
} = pagination(props.readerHeight , currentPage, totalPage, sendPages)

// @sendStatus="currentPhraseData.status = $event"
const emitStatus = (keyboard) => {
  emit('sendStatusFromReader', keyboard)
}
const {changePageStatus,changePageStatusByKeyborad, moveNextPrevious} = useKeyboard(startPointer,currentPointer, prose, view, core_data, newStatusDict , lessondata, currentPage, totalPage,  emitStatus)


watch( () => props.currentPhraseStatus,  (newVal) => {
  changePageStatus(newVal)
  // const sleep = (ms) =>
  // new Promise(resolve => setTimeout(resolve, ms));

  // await sleep(1000);
  // const res = await $fetch('http://localhost:8000/get_lesson/', {
  //   method: "GET", 
  //   params: {lesson_name : 'lesson 0'},
  //   credentials: "include"
  // })

  // console.log("Res", res)
  // lessondata.value = res.lesson_data

})
/* =========================================================
   Local UI State
========================================================= */
const popupCoordinates = ref({ x: 0, y: 0, downward: true })
const currentSentence = ref('')

/* =========================================================
   Derived State (Computed)
   - Keep “what the UI shows” separate from “what actions do”
========================================================= */
const selected = computed(() => {
  // Guard: selection not started or not updated
  if (!startPointer.value || !currentPointer.value) return {text: '', valid: false, error: 'empty'}

  // Guard: do not allow cross-sentence selection
  if (startPointer.value[1] !== currentPointer.value[1]) return {text: '', valid: false, error: 'cross-sentence'}

  const a = Math.min(startPointer.value[2], currentPointer.value[2])
  const b = Math.max(startPointer.value[2], currentPointer.value[2])

  const sentence = props.listSentence[currentPointer.value[1]]
  const listWordInSentence = sentence.split(' ')
  const selected_phrase = listWordInSentence.slice(a, b + 1)
  const cleaned_selected_phrase = selected_phrase.map( item => cleanWord(item))
  if (selected_phrase.length > 8) return {text: '', valid: false, error: 'too-long'}
  return {text: cleaned_selected_phrase.join(' '), valid: true}
})

watch(selected, (newVal) => {
    emit('selected', newVal)
})


/* =========================================================
   Watchers
   - Watchers describe “reactive side effects”
========================================================= */
watch(startPointer, (newVal) => {
  // Guard: if selection cleared, do nothing
  if (!newVal) return

  const wordIndex = newVal[0]
  popupCoordinates.value.downward = true

  const wordEl = document.getElementById(`w-${wordIndex}`)
  if (!wordEl || !prose.value) return

  // Cache prose bounding box to avoid repeated layout reads
  const proseRect = prose.value.getBoundingClientRect()
  const wordRect = wordEl.getBoundingClientRect()

  // Default position: below the word
  popupCoordinates.value.x = wordRect.left - 10
  popupCoordinates.value.y = wordRect.bottom + 10

  // Prevent popup overflowing the prose container (right/bottom)
  if (popupCoordinates.value.x + 400 > proseRect.right) {
    popupCoordinates.value.x = proseRect.right - 400
  }

  if (popupCoordinates.value.y + 300 > proseRect.bottom) {
    popupCoordinates.value.downward = false
    popupCoordinates.value.y -= 50
  }
})

/**
 * Returns true if a word is in the active selection range (UI highlight).
 * Note: name kept as-is to avoid breaking template usage.
 */
const isActice = (wordIndex) => {

  
  if (!startPointer.value || !currentPointer.value) return false

  const a = Math.min(startPointer.value[0], currentPointer.value[0])
  const b = Math.max(startPointer.value[0], currentPointer.value[0])

  return wordIndex >= a && wordIndex <= b
}

/**
 * Move next or previous page by keyborad.
 * Move next or previous page by keyborad.
 */
const itemFirstAndLastOfPage = computed(() => {
  // const proseHeight = prose.value.scrollTop
  // const offSetTop = currentPage.value
  return prose.value.scrollTop
})


/* =========================================================
   Lifecycle: mount/unmount side-effects
========================================================= */
onMounted(async () => {
  // Ensure pagination is correct on first render
  await updateTotalPages()

  // Global listeners (remember to remove them on unmount)
  window.addEventListener('resize', updateTotalPages)
  window.addEventListener('pointerup', pointerUp)
  window.addEventListener('keydown', changePageStatusByKeyborad)
  window.addEventListener('keydown', moveNextPrevious)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTotalPages)
  window.removeEventListener('pointerup', pointerUp)
  window.removeEventListener('keydown', changePageStatusByKeyborad)
  window.removeEventListener('keydown', moveNextPrevious)
})
</script>


<style>
.status-1 {
  @apply bg-yellow-300;
}

.status-2 {
  @apply bg-yellow-200
}

.status-3 {
  @apply bg-yellow-100
}

/* .status-4 { @apply underline decoration-dashed decoration-2 underline-offset-4 decoration-gray-500} */
/* instead of underline */
.status-4 {
  @apply border-b border-dashed border-b-gray-300;
}

.status-6 {
  @apply bg-blue-300
}

.word-item {
  @apply flex rounded h-[30px] cursor-pointer px-2 items-center border border-transparent
}
</style>

