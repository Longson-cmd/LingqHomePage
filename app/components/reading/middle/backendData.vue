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

const lessondata = ref(useLesson());
const { listSentence } = useSentences();


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

  if (currentPointer.value[3] === 3 && a !== b) {

    const start = lessondata.value[3].findIndex(item => item['s_idx'] === currentPointer.value[1])
    const end = lessondata.value[3].findLastIndex(item => item['s_idx'] === currentPointer.value[1])

    const copy3 = JSON.parse(JSON.stringify(lessondata.value[3]))
    const dataCurrentSentences = copy3.filter(item => item['s_idx'] === currentPointer.value[1])

    const listPhrases = []
    dataCurrentSentences.forEach((item, idx) => {
      if (dataCurrentSentences[idx]['type'] === "phrase") {
        const phrase = dataCurrentSentences[idx]['phrase']

        listPhrases.push(item)
      }
    })

    const flatSentencesData = dataCurrentSentences.flatMap(item =>item['type'] === 'phrase' ? item['phrase'].filter(w => w.visible_in_phrase === true) : [item])

    const newPhraseData = flatSentencesData.slice(a, b + 1).map(w => ({...w, 'visible_in_phrase' : true}))

    const newPhrase = {
      "phrase": newPhraseData,
      "status": 6,
      "p_idx": 3,
      "s_idx": newPhraseData[0]["s_idx"],
      "type": "phrase",
      "visible": true
    }

    // Change status of invisble in phrase



    if (listPhrases.length > 0) {
      for (let i = 0; i < listPhrases.length; i ++) {
        const indexWordStart = listPhrases[i]['phrase'][0]["idx_w_in_s"]
        for (let k =0; k < listPhrases[i]['phrase'].length; k++) {  
          if (a <=k + indexWordStart && k + indexWordStart <=b) {
            listPhrases[i]['phrase'][k]['visible_in_phrase'] = false
          }
        }

        let visible = false
        for (let k = 0; k < listPhrases[i]['phrase'].length; k++) {
          
          if (listPhrases[i]['phrase'][k]['visible_in_phrase']  === true) {
            visible = true
            break
          }   
          
        }

        if (visible === false) {
            listPhrases[i]['visible'] = false
          }


      }

    }


    const indexForNewPhrase = listPhrases.findIndex(item => item['phrase'][0]["idx_w_in_s"] >=a)

    console.log('indexForNewPhrase' , indexForNewPhrase)
    if (indexForNewPhrase === -1) { listPhrases.push(newPhrase)}
    else if (listPhrases[indexForNewPhrase]['phrase'].length === newPhraseData.length
      && listPhrases[indexForNewPhrase]['phrase'][0]['idx_w_in_s'] === a) 
      { 
   
        return
       }

    else {
      if (listPhrases[indexForNewPhrase]['phrase'].length > newPhraseData.length) {
        listPhrases.splice(indexForNewPhrase, 0, newPhrase)
      }
      else {
        listPhrases.splice(indexForNewPhrase + 1, 0, newPhrase)
      }
      
    }

    console.log("listPhrases ," , listPhrases)
 
    const newDataSentence = []

    let indexLastItem = -1
    for (let i = 0; i < listPhrases.length; i ++) {
      const listWords = flatSentencesData.filter(item => item['idx_w_in_s'] < listPhrases[i]['phrase'][0]['idx_w_in_s'] && item['idx_w_in_s'] > indexLastItem)
      newDataSentence.push(...listWords)
      indexLastItem = Math.max(listPhrases[i]['phrase'][0]['idx_w_in_s'] + listPhrases[i]['phrase'].length -1, indexLastItem)
      newDataSentence.push(listPhrases[i])
    }
   

    const listWords = flatSentencesData.filter(item =>item['idx_w_in_s'] > indexLastItem)
    newDataSentence.push(...listWords)

   
    lessondata.value[3].splice(start, end - start + 1, ...newDataSentence)
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