<template>
  <!-- <div class="max-w-md border m-5 mx-auto flex items-center justify-center "> -->
  <NuxtLink class="min-w-52 max-w-88 block  border rounded-2xl overflow-hidden group">
    <!-- UPPER   -->
    <div class=" relative aspect-[3/2] border bg-cover bg-center "
      :style="{ backgroundImage: 'url(/images/Girl.jpeg)' }">
      <div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
      <!-- top left -->
      <div class="absolute top-2 left-2 flex items-center gap-1">
        <img src="/images/lingLogo.png" alt="lingLogo" class=" h-10 ">
        <span class="text-white text-sm hidden group-hover:inline">LingQ</span>
      </div>
      <!-- top right -->
      <div class="absolute top-2 right-2  items-center hidden group-hover:flex">
        <button
          class="h-8 w-8 bg-green-400 hover:bg-green-600 rounded-full mr-1 flex items-center justify-center"><font-awesome
            icon="plus" /></button>
        <button class="h-8 w-8 bg-white rounded-full"><font-awesome icon="chevron-down" /></button>
      </div>

      <!-- center -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          class=" h-16 w-16 rounded-full bg-blue-800/80 flex items-center justify-center text-3xl font-semibold text-yellow-400">
          {{ lessonNumber }}
        </div>
      </div>

      <!-- bottom left -->
      <div class="absolute left-2 bottom-2 text-white text-sm font-medium">
        <div class="flex items-center justify-start">
          <div class="w-6 h-3 rounded-full bg-blue-400 border border-blue-600"></div>
          <span class="ml-1">{{ 10 }} <span class="hidden group-hover:inline">New Words</span></span>
        </div>
        <div class="flex items-center justify-start">
          <div class="w-6 h-3 rounded-full bg-yellow-400 border border-yellow-600"></div>
          <span class="ml-1">{{ 10 }} <span class="hidden group-hover:inline">LingQs</span></span>
        </div>
        <div class="flex items-center justify-start">
          <div class="w-6 h-3 rounded-full bg-white border border-gray-300"></div>
          <span class="ml-1">{{ 10 }} <span class="hidden group-hover:inline">New Words</span></span>
        </div>
      </div>

      <!-- bottom right -->
      <span
        class="absolute block h-5 w-10 right-2 bottom-2 rounded-full border border-white text-white text-sm flex justify-center items-center font-medium gap-0.5 bg-gray-500/90">
        <img src="/icons/header/heart.svg" class="h-4" /> 10
      </span>
    </div>

    <!-- LOWER -->
    <div class="p-2 text-sm">
      <div class="flex justify-between items-start">
        <span class=" inline-block ">
          10 - Metting The Fortuna Godness ssss ssss sssss ssssssss sssss
        </span>
        <button class="h-8 w-8 hover:bg-gray-200 self-start rounded-full flex items-center justify-center flex-shrink-0">
          <font-awesome icon="ellipsis-v" />
        </button>
      </div>

      <div> <span class="inline-block mt-6 h-2 w-2 rounded-full bg-blue-400"></span> 10% New words Beginner 1 </div>
      <dov class="flex justify-between ">
        <span class="truncate max-w-40">LingQ Mini Stories - France histoir Une nouvelle maison</span>
        <span class="inline-flex gap-1 whitespace-nowrap "><img src="/icons/header/importAudio.svg" /> 3:03</span>
      </dov>
    </div>
  </NuxtLink>
  <!-- </div> -->
</template>

<script setup>

const props = defineProps({
    lessonNumber : {type: String, default : 10}
})

</script>
