<template>
  <div class="max-w-sm md:max-w-md lg:max-w-4xl mx-auto px-3 my-5 ">
    <div class="flex justify-between py-5">
      <NuxtLink class="hover:bg-gray-100 px-3 py-1 text-center rounded-md"> <font-awesome icon="chevron-left" /> Back
        Homepage</NuxtLink>
      <button @click="saveAndGenerate" class="bg-[#0B1B32] hover:bg-black font-medium text-white px-3 py-1 rounded-md">Save and generate
        lesson</button>
    </div>

    <div class="flex flex-col lg:flex-row ">
      <LeftPart
       class="w-full lg:w-[236px] lg:pr-10 lg:mt-10 lg:border-r" 
       @sendLanguage="language = $event"
       @sendPictureFile="pictureFile = $event"
        @sendLevel="level = $event"
       />
      <div class=" w-full lg:pl-10">
        <!-- IMPORT LESSON PART -->
        <div>
          <span class="text-lg text-center text-blue-500 block font-bold">Lesson name && decription</span>
          <input type="text" v-model="lessonName"
            class="border my-3 w-full px-3 py-2 rounded-md placeholder:text-gray-700 focus:outline-none focus:ring-2  focus:ring-gray-300 focus:shadow-lg focus:border-gray-500"
            placeholder="Add title 60 charaters max" />

          <textarea type="text" v-model="lessonDescription"
            class="border w-full px-3 py-2 rounded-md placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:shadow-lg focus:border-gray-500"
            placeholder="Add description 200 charaters max (optional)" />

          <button class="px-3 py-2 whitespace-nowrap bg-gray-100 hover:bg-gray-300 rounded-md"><font-awesome
              icon="plus" />
            Course</button>
        </div>

        <RightPart 
        @sendAudioFile="audioFile=$event"
        @sendTextFile="textFile=$event"
        @sendInputText="inputText=$event"
        />
      </div>
    </div>
  </div>
</template>


<script setup>
import {ref} from "vue"

import LeftPart from "~/components/createLesson/LeftPart.vue";
import RightPart from "~/components/createLesson/RightPart.vue";
const lessonName = ref("")
const lessonDescription = ref("")
const ErrMessage = ref("")

const pictureFile = ref(null)
const level = ref('')
const language = ref("")
const audioFile = ref(null)
const textFile = ref(null)
const inputText = ref("")


const saveAndGenerate = async () => {
  const formData = new FormData()
  if (textFile.value) {
      formData.append("textfile", textFile.value)
  }
  else if (inputText.value) {
    formData.append('inputtext', inputText.value)
  }
  else {
    ErrMessage.value = 'Missing a text!'
    return
  }

  formData.append("lesson_name", lessonName.value )
  formData.append('lesson_description', lessonDescription.value)
  formData.append("language", language.value)
  formData.append('level', level.value)
  formData.append('picture', pictureFile.value)
  formData.append('audiofile', audioFile.value)

  console.log("lesson_name", lessonName.value )
  console.log('lesson_description', lessonDescription.value)
  console.log("language", language.value)
  console.log('level', level.value)
  console.log('picture', pictureFile.value)
  console.log('audiofile', audioFile.value)
  console.log("textfile", textFile.value)
  console.log('inputtext', inputText.value)
  
  try {
    const result = await $fetch("http://localhost:8000/create_lesson", {
      method: 'POST',
      body: formData
    })

  }

  catch (error) {
    console.error(error)
    ErrMessage.value = error?.data?.message || "Failed to generate new lesson"
  }

}


</script>