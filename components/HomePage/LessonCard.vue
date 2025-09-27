<template>
  <NuxtLink to="/Reading" class="w-[306px] block items-center justify-center rounded-2xl overflow-hidden  
  border hover:border-gray-400 hover:shadow-lg transition-all duration-200 group"
  :to="to">
    <!-- Top Image / Cover section -->
    <div class="h-40 relative bg-cover bg-center"
    :style="{backgroundImage: `url(${image})`}"
    >
      <!-- Dark-to-transparent gradient for text readability -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
      <!-- Provider badge -->
      <div class="absolute left-2 top-2 flex items-center gap-2">
        <img :src="logo" alt="lingQ Logo" class="h-10">
        <span class="text-white font-semibold hidden group-hover:inline">LingQ</span>
      </div>
      <!-- Action buttons -->
      <div class="absolute right-2 top-2 hidden group-hover:flex gap-2 items-center">
        <button class="h-9 w-9 rounded-full bg-white/90 backdrop-blur hover:bg-white">
          <font-awesome-icon icon="fa-plus" class="text-gray-900 text-base"/>
        </button>
        <button class="h-9 w-9 rounded-full bg-white/90 backdrop-blur hover:bg-white">
          <font-awesome-icon icon="fa-chevron-down" class="text-gray-900 text-base"/>
        </button>
      </div>
      <!-- Big number badge -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="h-16 w-16 bg-indigo-900/70 rounded-full flex items-center justify-center">
          <span class="text-3xl text-yellow-400 font-semibold">{{lessonNumber}}</span>
        </div>
      </div>
      <!-- Word indicators -->
      <div class="absolute left-2 bottom-2 flex flex-col space-y-[2px] font-medium">
        <div class="flex items-center text-white gap-2 text-xs">
          <span class="inline-block w-4 h-4 bg-blue-600 rounded"></span>
          <span>{{newWords}} New Words</span>
        </div>
        <div class="flex items-center text-white gap-2 text-xs">
          <span class="inline-block w-4 h-4 bg-yellow-400 rounded"></span>
          <span>{{lingqs}} LingQs</span>
        </div>
        <div class="flex items-center text-white gap-2 text-xs">
          <span class="inline-block w-4 h-4 bg-white rounded"></span>
          <span>{{ knowWords }} Known Words</span>
        </div>
      </div>

      <div class="absolute right-2 bottom-2 flex items-center">
        <div class="flex items-center justify-center px-3 py-[2px] gap-1 border border-white rounded-full bg-white/20 backdrop-blur
        text-white text-sm
        ">     
          <font-awesome-icon icon="fa-heart"/>
          {{favorites}}
        </div>
      </div>

    </div>

    <!-- Card Body -->
    <div class="p-4 w-full flex flex-col  text-xs space-y-2">
      <!-- Title + menu -->
      <div class="flex w-full items-start justify-between">
        <h2 class="font-semibold text-sm leading-snug">{{title}}</h2>
        <button class="text-gray-500 hover:text-gray-700 hover:scale-125">
          <font-awesome-icon icon="fa-ellipsis-v"/>
        </button>
      </div>
      <!-- Difficulty & level -->
      <div class="flex items-center gap-1 text-gray-700">
        <span class="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
        <span>{{difficulty}}% New Words</span>
        <span class="hidden group-hover:inline">• {{level}}</span>
      </div>
      <!-- Collection + duration -->
      <div class="flex items-center text-gray-500 justify-between">
        <span class="truncate">{{collection}}</span>
        <div class="flex items-center gap-1 min-w-max">
          <font-awesome-icon icon="fa-headphones"/>
          {{duration}}
        </div>
      </div>

    </div>
  </NuxtLink>
</template>


<script setup>

defineProps({
    to: {type:String, default: '/en/learn'},
    image: {type: String, required:true},
    logo: {type:String, default: '/images/lingLogo.png'},
    lessonNumber: Number,
    newWords: Number,
    lingqs: Number,
    knowWords:Number,
    favorites: Number,
    title: String,
    difficulty: String,
    level: String,
    collection: String,
    duration: String

})

</script>


<!-- absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent -->

<!-- LingQ Mini Stories – Canada (Québécois) -->

<!-- <font-awesome-icon icon="fa-ellipsis-v" />
<font-awesome-icon icon="fa-headphones" /> -->