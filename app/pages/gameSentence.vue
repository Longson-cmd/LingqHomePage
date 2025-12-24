<template>
  <div class=" h-screen max-w-6xl  mx-auto p-4 md:p-6 lg:p-10">
    <div class="border flex flex-col bg-gray-50 p-3 justify-between border-gray-300 rounded-3xl shadow-md mb-5 h-full ">
      <!-- upperpart -->
      <div class=" flex items-center gap-5 justify-between">
        <button
          class="text-3xl text-gray-700  h-10 w-12 rounded-full hover:bg-gray-300 flex items-center justify-center"><font-awesome-icon
            icon="fa-times" /></button>
        <!-- Progress wrapper: give it padding-bottom to reserve label space -->
        <div class="relative w-full sm:max-w-xl max-w-2xl pb-6 overflow-visible">
          <!-- bar -->
          <div class="relative h-1 bg-gray-300">
            <div class="absolute inset-y-0 left-0 bg-green-600"
              :style="{ width: total === 1 ? '100%' : (progress -1) / (total -1) * 100 + '%' }">
            </div>

            <div class="absolute -top-1.5 w-3 h-3 rounded-full bg-green-600"
              :style="{ left: total === 1 ? '100%' : (progress -1) / (total -1) * 100 + '%' }">
            </div>
          </div>

          <!-- label BELOW the bar, inside same wrapper -->
          <div class="absolute -bottom-1 -translate-x-1/3 whitespace-nowrap
              bg-green-600 text-white text-xs font-semibold px-1 rounded-lg"
            :style="{ left: total === 1 ? '100%' : (progress -1) / (total -1) * 100 + '%' }">
            {{ progress }} / {{ total }}
          </div>
        </div>

        <button
          class="text-2xl text-gray-500 h-10 w-12 rounded-full hover:bg-gray-300 flex items-center justify-center">
          <font-awesome-icon icon="fa-ellipsis-h" />
        </button>
      </div>

      <div class="flex  flex-col justify-center items-center">
        <span class=" inline-block text-center text-lg mb-5 w-full font-bold md:mb-5 lg:mb-10">Match the pairs</span>
        <div class="grid grid-cols-2 grid-rows-3 gap-y-1 gap-x-2 p-1 sm:p-2 md:p-5 max-w-xl">
          <div class="cursor-pointer flex items-center justify-center shadow-lg border border-gray-300 rounded-xl px-2 py-1 text-md font-bold
            sm:text-2xl sm:px-10 sm:py-2 lg:text-3xl lg:px-20 lg:py-5 flex-shrink-0 whitespace-nowrap"
            v-for="k in suffled" :key="k"
            :class="[result.includes(k) && 'bg-green-300', active ===k && 'border-gray-900', false_list.includes(k) && 'bg-red-400']"
            @click="checkOption(k)">
            {{get_elements(k +1)}}
          </div>
        </div>
      </div>

      <div class="w-full  relative">
        <button @click="moveNext"
          class="absolute left-1/2 p-2 font-semibold -translate-x-1/2 -top-10 bg-gray-200 w-20 rounded-md md:text-xl  whitespace-nowrap text-center">Skip</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const translations = [
  [
    { french: "Bonjour", english: "Hello" },
    { french: "Bonne nuit", english: "Good night" },
    { french: "Salut", english: "Hi" }
  ],
  [
    { french: "Merci", english: "Thank you" },
    { french: "De rien", english: "You’re welcome" },
    { french: "S’il vous plaît", english: "Please" }
  ],
  [
    { french: "Pomme", english: "Apple" },
    { french: "Pain", english: "Bread" },
    { french: "Fromage", english: "Cheese" }
  ],
  [
    { french: "Chat", english: "Cat" },
    { french: "Chien", english: "Dog" },
    { french: "Oiseau", english: "Bird" }
  ]
];

const progress = ref(1)
const total = translations.length


const suffle = ( ) => {
  const finalList = []
  const new_array = [0,1,2,3,4,5,]
  while (new_array.length > 0) {
    const i = Math.floor(Math.random() * new_array.length )
    const items = new_array.splice(i , 1)[0]
    // console.log('items', items)
    finalList.push(items)
  
  }
  return finalList
}

let suffled = suffle()
// console.log('suffled', suffled)

const get_elements = (idx) => {
  const remainder = (idx-1) % 2
  const interger_part = Math.floor((idx-1) /2)
  if (remainder === 0) {
    return translations[progress.value-1][interger_part ].french 
  }

  else {
    return translations[progress.value -1][interger_part ].english
  }
  
}



// GAME LOGIC PART
const result = ref([])
const firstOption = ref(null)
const secondOption = ref(null)
const active = ref(null)
const false_list = ref([])


// MAKE A GAME PROCESS
const moveNext = () => {
  if (progress.value === total) {
    router.push('/Reading')
  }
  else {
    suffled = suffle()
    progress.value += 1
    firstOption.value = null
    secondOption.value = null
    result.value = []
    active.value = null
    false_list.value = []
  }
  
}

const checkOption = (k) => {
  active.value = k
  if (  result.value.includes(k)) return
  if (firstOption.value === null || firstOption.value ===k) {
    false_list.value = []
    firstOption.value = k

  }
  
  else {
    secondOption.value = k
    if (Math.floor(firstOption.value /2) === Math.floor(secondOption.value/2)) {
      result.value.push(firstOption.value, secondOption.value)
      if (result.value.length === 6) {
        setTimeout(() => moveNext(), 1500)
      }

      else {firstOption.value = null}
    }

    else {
      false_list.value.push(firstOption.value, secondOption.value)
      firstOption.value = null
    }
  }
}

const onKeydown = (e) => {

  if (e.shiftKey && e.key === 'ArrowRight') {
    e.preventDefault()
    moveNext()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>