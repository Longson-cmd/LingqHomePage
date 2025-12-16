<template>
  <div class="max-w-3xl mx-auto  mt-20 flex flex-wrap gap-y-7"
  @pointerdown.prevent="handlePointerDown"
  @pointermove="handlePointerEnter"
  >
    <div v-for="(para, idPara) in lessondata" :key="idPara"
      class="text-3xl flex flex-wrap gap-y-7 px-2  text-start">

      <span v-for="(item, idItem) in para" :key="idItem" class="h-[42px] flex items-center">
        <span v-if="item['type'] === 'phrase'"
          v-show="item['visible']"
          class="flex  gap-y-7 h-full  items-center  rounded  ring-2 ring-inset ring-transparent hover:ring-yellow-400"
          :class="['status-' + item['status']]">
          <span v-for="(word) in item['phrase']" :class="['inline-flex items-center h-[35px]  px-1', isActice(word['w_idx']) && 'bg-blue-400']">
         
            <span 
              v-if="word['visible_in_phrase']"
              :class="['status-' + word['status'], word['status'] === 6 ? 'hover:border-blue-600' : 'hover:border-yellow-300']"
              class="  word-item " :id="`w-${word['w_idx']}`"
               :data-w-idx="word['w_idx']"
              :data-s-idx="word['s_idx']"
              :data-idx-w-in-s="word['idx_w_in_s']"
              :data-p-idx="word['p_idx']">
              {{ word['word'] }}
            </span>
          
          </span>
        </span>

        <span v-else :class="['flex  h-[35px]  items-center px-1 -blue-400 ', isActice(item['w_idx']) && 'bg-blue-400']">
          <span :id="`w-${item['w_idx']}`"
            :class="['status-' + item['status'], 'word-item', item['status'] === 6 ? 'hover:border-blue-600' : 'hover:border-yellow-300']"
            :data-w-idx="item['w_idx']"
            :data-s-idx="item['s_idx']"
            :data-idx-w-in-s="item['idx_w_in_s']"
            :data-p-idx="item['p_idx']"
            >
            {{ item['word'] }}
          </span>
        </span>
      </span>

    </div>

    <div>
      <div> Selected phase : {{ selected }}</div>
      <div>Current Sentence : {{ currentSentence }}</div>
    </div>
  </div>
</template>

<script setup>


import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

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
} = useCreateNewPhrase ();


const currentSentence = ref('')

const pointerUp = () => {
  isDraging.value = false

}

const isActice = (wordIndex) => {
  if (!startPointer.value || !currentPointer.value) return false
  const a = Math.min(startPointer.value[0], currentPointer.value[0])
  const b = Math.max(startPointer.value[0], currentPointer.value[0])

  if (wordIndex >= a && wordIndex <=b) {
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
  const listKeys = ['x' ,'1', '2', '3', '4', '5']
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
  const {start, end, coppySenteceData} = originalSentenceData(lessondata, paraIdx, sentenceIdx)

  // flat copySentenceData to words level
   const flatSentencesData = coppySenteceData.flatMap(item =>item['type'] === 'phrase' ? item['phrase'].filter(w => w.visible_in_phrase === true) : [item])

  // GET ALL PHRASES IN THE SENTENCE
  const listPhrases = getAllexsistingPhrases(copySentenceData)

  //  createData of newPhrase
  const newPhrase = createNewPhrase(flatSentencesData, a, b);

  insertNewPhrase(listPhrases, newPhrase, a);





  
}


onMounted(() => {
  window.addEventListener('pointerup', pointerUp),
  window.addEventListener('keydown', changePhraseStatus)
})
onBeforeUnmount(() => window.removeEventListener('pointerup', pointerUp))
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