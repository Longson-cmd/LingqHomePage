<template>
  <div class="fixed inset-0 h-screen bg-gray-500/10 z-10  px-5 w-full flex flex-col items-center justify-center">
    <div class=" max-w-sm md:max-w-4xl px-3  border bg-white p-5 rounded-2xl">
      <div class="flex justify-between">
          <span class="inline-flex gap-5 whitespace-nowrap items-center">
            <img src="/icons/header/importText.svg" alt="importText" class="inline-block h-5 w-5">
            <span class="font-bold text-lg">Import ebook</span>
          </span>

          <button @click="sendToParent" class="h-10 w-10 hover:bg-gray-300 rounded-full flex items-center justify-center"><font-awesome icon="times"/></button>
        </div>
        <span class="text-lg inline-block ">
          Your file is importing. Once the first lesson is ready it will open additionall parts continue to import.
        </span>
        <span class="text-lg inline-block mb-5">
          Depending on the speed of your connection and the size fo the file, this could take a few minutes.
        </span >

        <spiner/>
    </div>
  </div>
</template>


<script setup>
import {ref} from "vue"
import Spiner from "~/pages/homepage/component/Spiner.vue";


</script>