<template>
  <div class=" h-full  flex flex-col py-1 ">
    <div class="flex flex-col max-w-[360px] h-full min-h-0 border bg-white shadow-md rounded-2xl p-4">

      <!-- UPPER BOX -->
      <div class=" shrink-0 relative border-b border-b-gray-300 w-full space-y-2 pb-2">
        <div class="flex items-center gap-3">
            <font-awesome-icon icon='fa-volume-high' class="h-6 w-6 text-gray-700" />
            <span class="font-bold text-xl">{{newWord}}</span>
        </div>

        <div class="text-sm">tóng yī gè</div>

        <div class="flex items-start">
            <span class="inline-flex items-center gap-1 w-10 border-r border-r-gray-800 mr-2">
                <img src="/icons/wordPopup/coin.svg" alt="coin" class="h-5 w-5"></img>
                4
            </span>
            <!-- <span class=" inline-block w-[2px] self-stretch bg-black mx-2 " ></span> -->
            <div class="flex-1  ">
            <div class="flex flex-wrap gap-2">
                <div v-for="tag in tags" :key =tag class="bg-gray-300 rounded-md text-xs">{{tag}}</div>
                <div
                v-if="!isEditing"
                @click="startEdit"
                class="flex items-center mx-2 hover:bg-gray-300 px-1 rounded">
                <span class="text-sm">Tag+</span>
                </div>

                <input
                v-else
                ref="inputEl"
                v-model="draft"
                type="text"
                placeholder="Type tag, press Enter"
                class="absolute -bottom-8 left-20 h-8 w-48 rounded border px-3 text-sm"
                @keydown.enter.prevent="finishEdit"
                @blur="finishEdit"
                />
            </div>
            </div>

        </div>
      </div>

      <!-- MIDDLE BOX -->
      <div class=" flex-1 min-h-0  overflow-y-auto py-2 border-t border-gray-300 items-start">
        <span class="py-2 font-semibold">
          Saved Meaning
        </span>

        <textarea
          v-for="(word, i) in words"
          :key="i"
          v-model="words[i]"
          rows="1"
          class="w-full my-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:border-transparent
                bg-white text-gray-900 leading-6 resize-none overflow-hidden"
          placeholder="Nhập từ..."
        />


        <button class="my-2 px-2 py-1  rounded text-xs font-semibold bg-gray-200 hover:bg-gray-300">
          Google Translate
        </button>

        <div class="w-full flex justify-between mb-3">
          <span class="font-semibold">Popular Meaning</span>
          <button class="flex gap-1 text-xs text-gray-700 items-center hover:bg-gray-300 px-1 rounded">Report <img src="/icons/wordPopup/flag.svg" alt="flag icon" class="w-3 h-3"></button>
        </div>

        <div class="w-full text-blue-500 flex flex-col gap-y-1">
          <button class=" w-full flex justify-between bg-gray-300 p-1 rounded-md">
            Chat GPT translation
            <span class="flex items-center gap-2">
              <img src="/icons/wordPopup/sparkles.svg" alt="sparkles" class="w-4 h-4 text-yellow-400" />
              <font-awesome-icon icon="fa-plus"/>
            </span>     
          </button>
       
          <button v-for="i in 5" :key="i" class=" w-full flex justify-between bg-gray-300 p-1 rounded-md">
            Use {{i}} tranlattion
            <span class="flex items-center gap-2">
              <img src="/icons/wordPopup/sparkles.svg" alt="sparkles" class="w-4 h-4 text-yellow-400" />
              <font-awesome-icon icon="fa-plus"/>
            </span> 
          </button>
      
        </div>
      </div>

      <!-- LOWER BOX -->
      <div class=" shrink-0 pt-5 border-t border-t-gray-300 flex justify-between">
        <button class="h-10 w-10 rounded-full border hover:bg-red-100 flex items-center justify-center"><img src="/icons/wordPopup/rubbish.svg" alt="rubbish icon"></button>
        <button class="h-10 w-10 rounded-full border hover:bg-yellow-300">1</button>
        <button class="h-10 w-10 rounded-full border hover:bg-yellow-200">2</button>
        <button class="h-10 w-10 rounded-full border hover:bg-yellow-100">3</button>
        <button class="h-10 w-10 rounded-full border hover:bg-gray-300">4</button>
        <button class="h-10 w-10 rounded-full border hover:bg-green-300">
          <font-awesome-icon icon="fa-check" class="text-2xl text-green-600"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const words = ref([
  'tràng pháo tay',
  'ngôi sao',
  'ánh sáng'
])

// Watch for changes in array deeply
let timeout
watch(
  () => words.value ,
  (newVal) => {
    clearTimeout(timeout)
    timeout = setTimeout( () => {
      console.log('words :', newVal)
      const textareas = document.querySelectorAll('textarea')
      textareas.forEach((ta) => {
        ta.style.height = 'auto'
        ta.style.height = ta.scrollHeight +'px'
      })
    } , 300)
  }, {deep:true}
)


const tags = ref(['Preposition', 'Pronoun'])
const isEditing = ref(false)
const draft = ref('')
const inputEl = ref(null)

function startEdit() {
  isEditing.value = true
  draft.value = ''
  nextTick(() => inputEl.value?.focus())
}

function finishEdit() {
  const t = draft.value.trim()
  if (t && !tags.value.includes(t)) tags.value.push(t)
  isEditing.value = false
  draft.value = ''
}

defineProps({
    newWord: { type: String, required: true , default: "new word"}
})
</script>