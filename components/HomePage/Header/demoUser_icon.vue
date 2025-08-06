<template>
  <button class=" flex items-center gap-2 bg-gray-100
   hover:bg-gray-200 rounded-full px-3 py-1">
    <!-- Avatar with initial -->
    <div class="relative w-10 h-10 rounded-full bg-green-400 
    flex items-center 
    justify-center text-white font-bold">
      N
      <!-- Notification badge -->
      <div class="absolute -top-1 -right-1 bg-red-600 
      text-white text-xs 
      font-bold rounded-full px-1.5">
        89
      </div>
    </div> 

    <!-- Down arrow -->
    <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
  </button>
</template>
