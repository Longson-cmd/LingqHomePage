<template>
  <div class="h-screen max-w-6xl mx-auto p-3 sm:p-8">
    <div class="p-5 border  border-gray-300 h-full rounded-3xl flex flex-col ">
      <!-- upperpart -->
      <div class=" flex justify-between items-center gap-5 mb-10">
        <button class="h-8 w-8 rounded-full hover:bg-gray-300 flex items-center justify-center">
          <img src="/icons/game/times.svg" alt="fa-times" />
        </button>

        <div class="relative max-w-[200px] sm:max-w-sm lg:max-w-2xl w-full">
          <div class="relative h-1 bg-gray-300 w-full rounded-md">
            <div class="h-1 bg-green-600 rounded-md"
              :style="{ width: total === 1 ? '100%' : (progress - 1) / (total - 1) * 100 + '%' }"></div>
            <div class="absolute h-3 w-3 rounded-full bg-green-600 top-1/2 -translate-y-1/2 "
              :style="{ left: total === 1 ? '100%' : (progress - 1) / (total - 1) * 100 + '%' }"></div>
          </div>

          <div
            class="absolute h-4 w-10 bg-green-600 text-xs rounded-lg top-4 text-center font-md text-white -translate-x-4"
            :style="{ left: total === 1 ? '100%' : (progress - 1) / (total - 1) * 100 + '%' }">{{ progress }} / {{ total
            }}</div>

          <div>

          </div>
        </div>
        <button class="h-8 w-8 rounded-full hover:bg-gray-300 flex items-center justify-center">
          <img src="/icons/game/ellipsish.svg" alt="ellipsish" />
        </button>

      </div>
      <div v-if="isshow">

        <div class="px-10">
          <div class="flex w-full justify-center gap-3 items-center text-2xl font-bold mb-10">
            <img src="/icons/game/speaker.svg" />
            <span>{{ listWords[progress - 1].french }}</span>
          </div>

          <span>
            Select the correct meaning
          </span>
          <div v-for="(answer, k) in Question" :key="k" @click="checkAnswer(Question[k].english)"
            class="flex justify-between w-full border p-3 mt-2 rounded-md hover:border-gray-900">
            <span class="text-lg">{{ Question[k].english }}</span>
            <span
              class="  flex items-center justify-center rounded h-5 w-5 border border-gray-800 shadow-custom3d font-semibold">{{
              k }}</span>
          </div>
        </div>

        <button @click="MoveNext"
          class="my-10 mx-28 p-2 rounded-md bg-gray-200 hover:bg-gray-300 w-12 font-medium">Skip</button>

      </div>

      <div v-else class="w-full flex flex-col items-center gap-8">
        <span class="text-gray-600">{{ `Your answer: ${useranswer}` }}</span>
        <span class="block" :class="listWords[progress - 1].english === useranswer? 'text-green-500' :'text-red-500'">{{listWords[progress - 1].english === useranswer? 'Correct' : 'Incorrect'}}</span>
        <div class="flex w-full justify-center gap-3 items-center text-2xl font-bold ">
          <img src="/icons/game/speaker.svg" />
          <span>{{ listWords[progress - 1].french }}</span>
        </div>

        <span class="pb-10 text-xl font-semibold">{{ listWords[progress - 1].english }}</span>
        
        <div class=" shrink-0 pt-5 border-t border-t-gray-300 flex justify-between gap-3">
          <button class="h-10 w-10 rounded-full border border-gray-300 hover:bg-red-100 flex items-center justify-center"><img
              src="/icons/reader/trash.svg" alt="trash icon"></button>
          <button class="h-10 w-10 rounded-full border border-gray-300 bg-yellow-400">1</button>
          <button class="h-10 w-10 rounded-full border border-gray-300 bg-yellow-300">2</button>
          <button class="h-10 w-10 rounded-full border border-gray-300 bg-yellow-200">3</button>
          <button class="h-10 w-10 rounded-full border border-gray-300 bg-gray-300">4</button>
          <button class="h-10 w-10 rounded-full border border-gray-300 hover:bg-green-300">
            <font-awesome-icon icon="fa-check" class="text-2xl text-green-600" />
          </button>
        </div>
        
        <button @click="MoveNext" class="border font-bold w-60 mt-5 py-5 rounded-md  border-gray-400 hover:border-gray-900">Next</button>
       
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'



const listWords = [
  { french: "Bonjour", english: "Hello" },
  { french: "Merci", english: "Thank you" },
  { french: "S'il vous plaît", english: "Please" },
  { french: "Au revoir", english: "Goodbye" },
  { french: "Oui", english: "Yes" },
  { french: "Non", english: "No" },
  { french: "Excusez-moi", english: "Excuse me" },
  { french: "Je ne comprends pas", english: "I don’t understand" },
  { french: "Parlez-vous anglais ?", english: "Do you speak English?" },
  { french: "Comment ça va ?", english: "How are you?" }
]
const router = useRouter()
const progress = ref(1)
const total = listWords.length
const isshow = ref(true)
const useranswer = ref('')

const suffled = (array) => {
  const arr = [...array]
  let finalArray = []
  while (arr.length > 0) {
    const i = Math.floor(Math.random() * arr.length)
    finalArray.push(arr.splice(i, 1)[0])
  }
  return finalArray
}

const Question = ref([])
const get_elements = () => {
  let coppyArray = [...listWords]
  const item = coppyArray.splice(progress.value - 1, 1)[0]
  let subArray = suffled(coppyArray).slice(0, 3)
  subArray.push(item)
  Question.value = suffled(subArray)

}


const MoveNext = () => {
  if (progress.value === total) {
    router.push('/Reading')
  }
  else {
    progress.value += 1
    get_elements()
  }
  isshow.value = true
}
const checkAnswer = (answer) => {
  useranswer.value = answer
  console.log('useranswer :', useranswer.value)
  isshow.value = false
}

const listonKeydowns = ["1", "2", "3", "4"]
const onKeydown = (e) => {
  if (listonKeydowns.includes(e.key)) {checkAnswer(Question.value[Number(e.key) -1].english)}
  if (e.shiftKey && e.key === 'ArrowRight') {
    e.preventDefault()
    MoveNext()
  }
}


onMounted(() => {
  get_elements()
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

</script>