<template>
  <div class="max-w-3xl mx-auto  mt-20 flex flex-wrap gap-y-7">
    <div v-for="(para, idPara) in lessondata" :key="idPara"
      class="text-3xl flex flex-wrap gap-y-7 px-2 gap-x-1 text-start">

      <span v-for="(item, idItem) in para" :key="idItem">
        <span v-if="item['type'] === 'phrase'"
          v-show="item['visible']"
          class="flex px-1 gap-y-7 h-[35px] items-center gap-x-1 rounded  border border-transparent hover:border-yellow-300 "
          :class="['status-' + item['status'], item['status'] === 6 ? 'hover:border-blue-600' : 'hover:border-yellow-300']">
          <span v-for="(word) in item['phrase']">
            <span 
              v-if="word['visible_in_phrase']"
              :class="['status-' + word['status'], word['status'] === 6 ? 'hover:border-blue-600' : 'hover:border-yellow-300']"
              class="word-item" :id="`w-${word['w_idx']}`"
              @pointerdown.prevent="onPointerdown(word['w_idx'], word['s_idx'], word['idx_w_in_s'], word['p_idx'])"
              @pointerenter="onPointerenter(word['w_idx'], word['s_idx'], word['idx_w_in_s'], word['p_idx'])">
              {{ word['word'] }}
            </span>
          </span>
        </span>

        <span v-else class="flex  h-[35px]  items-center">
          <span :id="`w-${item['w_idx']}`"
            :class="['status-' + item['status'], 'word-item', item['status'] === 6 ? 'hover:border-blue-600' : 'hover:border-yellow-300']"
            @pointerdown.prevent="onPointerdown(item['w_idx'], item['s_idx'], item['idx_w_in_s'], item['p_idx'])"
            @pointerenter="onPointerenter(item['w_idx'], item['s_idx'], item['idx_w_in_s'], item['p_idx'])">
            {{ item['word'] }}
          </span>
        </span>
      </span>

    </div>

    <div> Selected phase : {{ selected }}</div>
  </div>
</template>

<script setup>


import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useCreateNewPhrase } from '~/composables/useCreateNewPhrase';

const lessondata = ref(useLesson());
const { listSentence } = useSentences();
const {
        originalSentenceData,
        createNewPhrase,
        getAllexsistingPhrases,
        changeStatus,
        insertNewPhrase, 
        buildSentence,
} = useCreateNewPhrase();

const currentSentence = ref('')
const startPointer = ref(null)
const currentPointer = ref(null)
const isDraging = ref(false)


const onPointerdown = (indexWord, indexSentence, indexWordInSentence, indexPara) => {
  isDraging.value = true

  startPointer.value = [indexWord, indexSentence, indexWordInSentence, indexPara]
  currentPointer.value = [indexWord, indexSentence, indexWordInSentence, indexPara]

  // console.log('startPointer', startPointer.value[0])
}

const onPointerenter = (indexWord, indexSentence, indexWordInSentence, indexPara) => {
  if (!isDraging.value) return

  currentPointer.value = [indexWord, indexSentence, indexWordInSentence, indexPara]


}



const pointerUp = () => {
  isDraging.value = false
  // console.log('currentPointer', currentPointer.value[0])

  if (!startPointer.value || !currentPointer.value) return

  if (startPointer.value[1] !== currentPointer.value[1]) return

  const a = Math.min(startPointer.value[2], currentPointer.value[2])
  const b = Math.max(startPointer.value[2], currentPointer.value[2])

  if ( a !== b) {
   
    // GET PARA INDEX AND SENTENCE INDEX
    const paraIdx = currentPointer.value[3]
    const sentenceIdx = currentPointer.value[1]
    // get data of the sentence needed to modify
    const {start, end, copySentenceData} = originalSentenceData(lessondata, paraIdx, sentenceIdx)

    // GET ALL PHRASES IN THE SENTENCE
    const listPhrases = getAllexsistingPhrases(copySentenceData)
  
    // flat copySentenceData to words level
    const flatSentencesData = copySentenceData.flatMap(item =>item['type'] === 'phrase' ? item['phrase'].filter(w => w.visible_in_phrase === true) : [item])

    //  createData of newPhrase
    const newPhrase = createNewPhrase(flatSentencesData, a, b);

    // Change status of invisble in phrase
    changeStatus(listPhrases, a, b);

    insertNewPhrase(listPhrases, newPhrase, a);
 
    // Create new data for the sentence
    const newDataSentence = buildSentence(listPhrases, flatSentencesData)

    // update newData
    lessondata.value[paraIdx].splice(start, end - start + 1, ...newDataSentence)
    //  console.log("lessondata.value[3] :",  lessondata.value[3])
}}

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

onMounted(() => window.addEventListener('pointerup', pointerUp))
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