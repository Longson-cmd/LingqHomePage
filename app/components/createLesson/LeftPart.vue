<template>
 


    <!-- Picture && user setup -->
    <div>
      <span>
        <label class="cursor-pointer  inline-block">
          <input type="file" accept=".png, .jpg" @change="uploadPicture" class="sr-only">
          <div v-if="!previewURL"
            class="h-[126px] w-[196px] p-2 rounded-lg border flex flex-col justify-between bg-gray-100 hover:bg-gray-300 ">
            <Picture class="h-6 w-6 text-gray-400 self-end" />
            <font-awesome icon="plus" class="self-center h-5 w-5" />
            <span class="block text-center text-gray-700 font-medium">Add image</span>
          </div>
          <img v-if="previewURL" :src="previewURL" alt="previewURL"
            class="object-cover h-[126px] w-[126px] rounded-full">
        </label>
      </span>

      <div class="flex flex-col gap-3 my-5">
        <!-- Level elements -->
        <div ref="refLevel" class="relative ">
          <button @click="openToggleLevel = !openToggleLevel, openToggleLang = false"
            class="bg-gray-100 hover:bg-gray-300 flex justify-between items-center px-4 py-2 rounded-lg w-full">
            <span>{{ levelList[levelOption] }}</span>
            <font-awesome icon="chevron-down" />
          </button>


          <div v-if="openToggleLevel" class="absolute flex flex-col z-10 bg-white rounded-2xl w-48  border shadow">
            <button v-for="value, i in levelList" :key="i" @click="levelOption = i, openToggleLevel = false, emit('sendLevel', value)"
              :class="['hover:bg-gray-100 text-start text-sm px-4 py-2', i === 0 ? 'rounded-t-2xl' : '', i === 6 ? 'rounded-b-2xl' : '', i === levelOption ? 'bg-gray-100' : '']">{{ value }}</button>
          </div>
        </div>

        <!-- languages elements -->
        <div class="relative " ref="refLang">
          <button @click="openToggleLang = !openToggleLang, openToggleLevel = false"
            class="bg-gray-100 hover:bg-gray-300 flex justify-between items-center px-4 py-2 rounded-lg w-full">
            <span class="inline-flex items-center gap-2 inline whitespace-nowrap">
              <img :src="countryFlags[langOption - 1]" :alt="langList[langOption]" class="h-6 w-6 rounded-full"> {{
                langList[langOption] }}
            </span>
            <font-awesome icon="chevron-down" />
          </button>

          <div v-if="openToggleLang" class="absolute flex flex-col z-10 bg-white rounded-2xl w-56  border shadow">
            <button v-for="value, i in langList" :key="i" :disabled="i === 0"
              @click="langOption = i, openToggleLang = false, emit('sendLanguage', value)"
              :class="['hover:bg-gray-100 inline whitespace-nowrap text-start text-sm px-4 py-2', i === 0 ? 'rounded-t-2xl my-1 hover:bg-white' : '', i === 3 ? 'rounded-b-2xl' : '', i === langOption ? 'bg-gray-100' : '']"><img
                v-if="i >= 1" class="h-6 w-6 rounded-full inline mr-2" :src="countryFlags[i - 1]"
                :alt="countryFlags[i - 1]" /> {{ value }}</button>
          </div>
        </div>

        <!-- Accent elements -->
        <div>
          <button class="bg-gray-100 hover:bg-gray-300 flex justify-between items-center px-4 py-2 rounded-lg w-full">
            <span>Accent</span>
            <font-awesome icon="chevron-down" />
          </button>
        </div>

      </div>
    </div>



</template>


<script setup>

import Picture from '../UI/Picture.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue'


const pictureFile = ref(null)
const previewURL = ref("")

const refLevel = ref(null)
const openToggleLevel = ref(false)
const levelOption = ref(0)
const levelList = ["Level", "Beginner 1", "Beginner 2", "Intermediate 1", "Intermediate 2", "Advanced 1", "Advanced 2"]
const refLang = ref(null)
const openToggleLang = ref(false)
const langOption = ref(1)
const langList = ["All Languages", "French", "English", "Chinese"]
const countryFlags = ['/images/France.png', '/images/England.png', '/images/China.png']


const uploadPicture = (e) => {
  pictureFile.value = e.target.files[0]
  previewURL.value = URL.createObjectURL(pictureFile.value)
  emit('sendPictureFile', pictureFile.value)
}

const handleClickOutsides = (e) => {
  if (refLevel.value && !refLevel.value.contains(e.target)) {
    openToggleLevel.value = false
  }
  if (refLang.value && !refLang.value.contains(e.target)) {
    openToggleLang.value = false
  }
}

const emit = defineEmits(['sendPictureFile', 'sendLanguage', 'sendLevel'])




onMounted(() => {
  document.addEventListener("click", handleClickOutsides)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutsides)
})

</script>
