<template>
  <div class="w-full h-screen flex pt-20">
    <div class="relative border border-gray-400 flex mx-auto  w-[392px] h-[174px] 
    bg-white shadow-2xl rounded-3xl flex-col">
      <font-awesome-icon icon='fa-check' class=" absolute top-5 right-10 h-6 w-6 text-green-400" />
      <!-- upper part -->
      <button class="p-1 border rounded-full absolute top-2 right-2 h-5 w-5 flex items-center">
        <font-awesome-icon icon='fa-times'  />
      </button>
      <!-- upper part -->
      <div class=" border-b border-b-gray-300 w-full px-4 pt-4 space-y-3 pb-4">
        <div class="flex items-center gap-3">
          <font-awesome-icon icon='fa-volume-high' class="h-6 w-6 text-gray-700" />
          <span class="font-bold text-xl">new word</span>
        </div>

        <div class="flex items-center">
          <span class="inline-flex items-center gap-1">
            <img src="/images/game-coin.png" alt="coin" class="h-5 w-5"></img>
            4
          </span>
          <span class=" inline-block w-[2px] self-stretch bg-black mx-2 " ></span>
          <div class="flex space-x-2">
            <div v-for="tag in list_tags" :key =tag class="bg-gray-300 p-[2px] rounded-md">{{tag}}</div>
          </div>

          <button class="flex items-center mx-4 hover:bg-gray-300 px-1 rounded">
            <span>Tag</span>
            <font-awesome-icon icon="fa-plus"/>
          </button>
        </div>
      </div>

      <!-- lower part -->
      <div class="flex flex-col items-center jutify-center py-2 px-4">
        <input type="text" placeholder="Type a new meaning here" class="w-full border border-gray-300 rounded-lg p-2 ">
        <font-awesome-icon icon="fa-chevron-down"></font-awesome-icon>
      </div>

    </div>
  </div>
</template>


<script setup>
import {ref} from 'vue'

const list_tags = ref(['Verb', 'pass tense'])
</script>


 <!-- <font-awesome-icon icon='fa-volume-high' class="h-6 w-6 text-gray-700" />
  <font-awesome-icon icon='fa-check' class="h-6 w-6 text-gray-700" />
  <img src="/images/game-coin.png" alt="coin" class="h-10 "> -->