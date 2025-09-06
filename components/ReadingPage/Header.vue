<template>
  <div class=" relative py-20 px-10 h-20 flex justify-between items-center bg-gray-50">
    <!-- AUDIO PART -->
    <div class=" relative bg-white  border border-gray-800 h-14 w-14 rounded-full flex items-center justify-center">
      <button class="flex items-center justify-center h-full w-full rounded-full hover:bg-gray-200">
        <font-awesome-icon icon="fa-solid fa-volume-up" class="text-2xl"/>
      </button>

      <button class="absolute -bottom-3 -right-3 h-8 w-8 bg-white hover:bg-gray-200 border border-gray-800 rounded-full">
        <img src="/icons/tortoise.svg" alt="Page Mode Icon" class="w-8 h-8"/>
      </button>

      <button class="absolute w-6 h-4 bg-white hover:bg-gray-200 border border-gray-800 -bottom-2 -right-8 flex items-center justify-center rounded-full">
        <font-awesome-icon icon="fa-solid fa-chevron-down"  class="text-sm"/>
      </button>
    </div>

  </div>
</template>


