<template>
  <div class=" flex flex-col " :style="{height : readerHeight + 'px'}">



    <div class="  overflow-hidden flex flex-wrap gap-y-7" ref="prose" 
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
              :class="['inline-flex items-center h-[35px]  px-1', isActice(word['w_idx']) && 'bg-red-400']"
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
            :class="['flex  h-[35px]  items-center px-1 -blue-400 ', isActice(item['w_idx']) && 'bg-red-400']">
            <span :id="`w-${item['w_idx']}`"
              :class="['status-' + item['status'], 'word-item', item['status'] === 6 ? 'hover:border-blue-600' : 'hover:border-yellow-300']"
              :data-w-idx="item['w_idx']" :data-s-idx="item['s_idx']" :data-idx-w-in-s="item['idx_w_in_s']"
              :data-p-idx="item['p_idx']">
              {{ item['word'] }}
            </span>
          </span>
        </span>

      </div>


      <div :style="{ height: remaining + 'px' }"></div>
    </div>

    <div class="fixed inset-0 pointer-events-none z-10">
      <div v-if="startPointer"
        :class="['absolute pointer-events-auto', (!popupCoordinates.downward) && '-translate-y-full']"
        :style="{ left: popupCoordinates.x + 'px', top: popupCoordinates.y + 'px' }">
        <Popup :word="selected" class="popup-item" />
      </div>
    </div>
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
const lessondata = ref(useLesson())
const { listSentence } = useSentences()

const {
  startPointer,
  currentPointer,
  isDraging,
  handlePointerDown,
  handlePointerEnter
} = useEventDelegation()

const {
  originalSentenceData,
  createNewPhrase,
  getAllexsistingPhrases,
  changeStatus,
  insertNewPhrase,
  buildSentence
} = useCreateNewPhrase()



/* =========================================================
    resize, props, emit: mount/unmount side-effects
========================================================= */
const props = defineProps({
  readerHeight: {type: Number, default: 500},
  currentValue : {type :Number, default: 1}
})

const emit = defineEmits(['update:currentValue', 'sendTotalPage'])

const currentPage = computed({
  get: () => props.currentValue,
  set: (v) => emit('update:currentValue', v)
})

watch(currentPage, (newVal) => scrollNewPage(newVal))

const totalPage = ref(1)


const sendPages = () => {

  
  emit('sendTotalPage', totalPage.value)
}



const {
  prose,
  remaining,
  updateTotalPages,
  scrollNewPage,
} = pagination(currentPage, totalPage, sendPages)



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
  if (!startPointer.value || !currentPointer.value) return ''

  // Guard: do not allow cross-sentence selection
  if (startPointer.value[1] !== currentPointer.value[1]) return ''

  const a = Math.min(startPointer.value[2], currentPointer.value[2])
  const b = Math.max(startPointer.value[2], currentPointer.value[2])

  currentSentence.value = listSentence[currentPointer.value[1]]
  const listWordInSentence = currentSentence.value.split(' ')
  const selected_phrase = listWordInSentence.slice(a, b + 1)

  return selected_phrase.join(' ')
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

/* =========================================================
   Event Handlers / Helpers
========================================================= */

/**
 * Global pointerup handler: ends dragging selection mode.
 */
const pointerUp = () => {
  isDraging.value = false
}

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
 * Keyboard handler:
 * - 'x' removes an existing phrase
 * - '1'..'5' assigns status and creates/updates phrase
 */
const changePhraseStatus = (e) => {
  const listKeys = ['x', '1', '2', '3', '4', '5']
  if (!listKeys.includes(e.key)) return

  // Guard: need a valid selection
  if (!startPointer.value || !currentPointer.value) return
  if (startPointer.value[1] !== currentPointer.value[1]) return

  const a = Math.min(startPointer.value[2], currentPointer.value[2])
  const b = Math.max(startPointer.value[2], currentPointer.value[2])

  // Guard: ignore single-word selections (based on your current rule)
  if (a === b) return

  // Identify paragraph and sentence for data mutation
  const paraIdx = currentPointer.value[3]
  const sentenceIdx = currentPointer.value[1]

  /**
   * originalSentenceData returns:
   * - start/end: slice range inside lessondata[paraIdx]
   * - copySentenceData: a copy of sentence items (word/phrase objects)
   */
  const { start, end, copySentenceData } = originalSentenceData(lessondata, paraIdx, sentenceIdx)

  // Flatten sentence into visible words only (phrases -> visible words)
  const flatSentencesData = copySentenceData.flatMap((item) =>
    item.type === 'phrase'
      ? item.phrase.filter((w) => w.visible_in_phrase === true)
      : [item]
  )

  // Extract all phrase blocks in this sentence
  const listPhrases = getAllexsistingPhrases(copySentenceData)

  if (e.key === 'x') {
    /* ---------------- Remove phrase ---------------- */
    const indexForNewPhrase = listPhrases.findIndex(
      (item) => item.phrase[0].idx_w_in_s === a
    )

    // Only remove if selection matches phrase length exactly
    if (
      indexForNewPhrase === -1 ||
      listPhrases[indexForNewPhrase].phrase.length !== b - a + 1
    ) {
      return
    }

    listPhrases.splice(indexForNewPhrase, 1)
  } else {
    /* ---------------- Create / update phrase ---------------- */
    const newPhrase = createNewPhrase(flatSentencesData, a, b, paraIdx, e.key)
    insertNewPhrase(listPhrases, newPhrase, a)
  }

  // Synchronize visibility/status flags after phrase changes
  changeStatus(listPhrases)

  // Rebuild sentence data (word/phrase structure) from current state
  const newDataSentence = buildSentence(listPhrases, flatSentencesData)

  // Commit updated sentence back into lessondata
  lessondata.value[paraIdx].splice(start, end - start + 1, ...newDataSentence)
}

/**
 * Click-outside handler: clears selection if user clicks outside relevant UI.
 */
const handleClickOutside = (e) => {
  if (isDraging.value) return
  if (!(e.target instanceof HTMLElement)) return

  const wordEl = e.target.closest('.word-item')
  const phraseEl = e.target.closest('.phrase-item')
  const popupEl = e.target.closest('.popup-item')

  if (!wordEl && !phraseEl && !popupEl) {
    startPointer.value = null
    currentPointer.value = null
  }
}


/* =========================================================
   Lifecycle: mount/unmount side-effects
========================================================= */
onMounted(async () => {
  // Ensure pagination is correct on first render
  await updateTotalPages()

  // Global listeners (remember to remove them on unmount)
  window.addEventListener('resize', updateTotalPages)
  window.addEventListener('pointerup', pointerUp)
  window.addEventListener('keydown', changePhraseStatus)
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTotalPages)
  window.removeEventListener('pointerup', pointerUp)
  window.removeEventListener('keydown', changePhraseStatus)
  window.removeEventListener('click', handleClickOutside)
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

// RESIZE + PROPS + EMITS