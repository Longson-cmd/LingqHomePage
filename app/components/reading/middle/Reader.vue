<template>
  <div class="max-w-xl mx-auto flex flex-col h-screen">

    <div class="h-20 bg-gray-100 flex items-center p-2 border">
      <div class="flex items-center justify-end w-full gap-2">
        <button @click="prePage" class="border p-1 bg-green-200 hover:bg-green-300 rounded-md">Prev</button>
        <span>{{ currentPage }} / {{ totalPage }}</span>
        <button @click="nextPage" class="border p-1 bg-green-200 hover:bg-green-300 rounded-md">Next</button>
      </div>
    </div>

    <div class=" border  overflow-hidden flex flex-wrap gap-y-7" ref="prose" 
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

import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import Popup from './reading/middle/Popup.vue';
const lessondata = ref(useLesson());
const { listSentence } = useSentences();

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
  buildSentence,
} = useCreateNewPhrase();

const { prose, currentPage, totalPage, remaining, updateTotalPages, prePage, nextPage } = pagination()

const popupCoordinates = ref({ x: 0, y: 0, downward: true })

// PLACE POPUP
watch(startPointer, (newVal) => {
  // check if startPointer = null
  if (!newVal) return

  const wordIndex = newVal[0]
  popupCoordinates.value.downward = true
  const wordEl = document.getElementById(`w-${wordIndex}`)
 
  const proseRight = prose.value.getBoundingClientRect().right
  const proseBottom = prose.value.getBoundingClientRect().bottom

  popupCoordinates.value.x = wordEl.getBoundingClientRect().left - 10
  popupCoordinates.value.y = wordEl.getBoundingClientRect().bottom + 10

  if (popupCoordinates.value.x + 400 > proseRight) { popupCoordinates.value.x = proseRight - 400 }
  if (popupCoordinates.value.y + 300 > proseBottom) {
    popupCoordinates.value.downward = false
    popupCoordinates.value.y -= 50
  }

})
const currentSentence = ref('')

const pointerUp = () => {
  isDraging.value = false

}

const isActice = (wordIndex) => {
  if (!startPointer.value || !currentPointer.value) return false
  const a = Math.min(startPointer.value[0], currentPointer.value[0])
  const b = Math.max(startPointer.value[0], currentPointer.value[0])

  if (wordIndex >= a && wordIndex <= b) {
    return true
  }
  else {
    return false
  }

}

const selected = computed(() => {
  if (!startPointer.value || !currentPointer.value) return

  if (startPointer.value[1] !== currentPointer.value[1]) return



  const a = Math.min(startPointer.value[2], currentPointer.value[2])
  const b = Math.max(startPointer.value[2], currentPointer.value[2])

  currentSentence.value = listSentence[currentPointer.value[1]]

  const listWordInSentence = currentSentence.value.split(" ")

  // console.log("currentSentence" , currentSentence.value) 

  const selected_phrase = listWordInSentence.slice(a, b + 1)

  // console.log('selected_phrase', selected_phrase)


  return selected_phrase.join(" ")
})

const changePhraseStatus = (e) => {
  const listKeys = ['x', '1', '2', '3', '4', '5']


  if (!listKeys.includes(e.key)) return

  if (!startPointer.value || !currentPointer.value) return

  if (startPointer.value[1] !== currentPointer.value[1]) return

  const a = Math.min(startPointer.value[2], currentPointer.value[2])
  const b = Math.max(startPointer.value[2], currentPointer.value[2])

  if (a === b) return
  // GET PARA INDEX AND SENTENCE INDEX 

  const paraIdx = currentPointer.value[3]
  const sentenceIdx = currentPointer.value[1]
  // get data of the sentence needed to modify, (start and end are the index of first and final words according to the paragraph, not whole the prose)
  const { start, end, copySentenceData } = originalSentenceData(lessondata, paraIdx, sentenceIdx)

  // flat copySentenceData to words level
  const flatSentencesData = copySentenceData.flatMap(item => item['type'] === 'phrase' ? item['phrase'].filter(w => w.visible_in_phrase === true) : [item])

  // GET ALL PHRASES IN THE SENTENCE
  const listPhrases = getAllexsistingPhrases(copySentenceData)

  if (e.key === 'x') {
    // --------------REMOVE PHRASE----------------
    const indexForNewPhrase = listPhrases.findIndex(item => item['phrase'][0]["idx_w_in_s"] === a)

    if (indexForNewPhrase === -1 || listPhrases[indexForNewPhrase]['phrase'].length !== b - a + 1) {
      return
    }

    else {
      listPhrases.splice(indexForNewPhrase, 1)
    }
  }

  else {
    // --------------CREATE NEW PHRASE----------------

    //  createData of newPhrase
    const newPhrase = createNewPhrase(flatSentencesData, a, b, paraIdx, e.key);

    insertNewPhrase(listPhrases, newPhrase, a);
  }



  // Change status of invisble in phrase
  changeStatus(listPhrases);


  // Create new data for the sentence
  const newDataSentence = buildSentence(listPhrases, flatSentencesData)

  // update newData
  lessondata.value[paraIdx].splice(start, end - start + 1, ...newDataSentence)



}

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


onMounted(async () => {
  await updateTotalPages();
  window.addEventListener('resize', updateTotalPages)
  window.addEventListener('pointerup', pointerUp),
  window.addEventListener('keydown', changePhraseStatus)
  window.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  window.removeEventListener('pointerup', pointerUp)
  window.removeEventListener('keydown', changePhraseStatus)
  window.removeEventListener('resize', updateTotalPages)
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