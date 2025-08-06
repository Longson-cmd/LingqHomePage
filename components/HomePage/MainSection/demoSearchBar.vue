<template>

  <div class="px-16 flex items-center border rounded-md h-20 ">
    <div class="flex items-center border-gray-300 rounded-lg">
      <input type="text" 
      placeholder="Search Library" class="rounded-l-md border border-r-transparent border-gray-300 hover:border-gray-500  h-10 p-2 focus:ring-1 focus:ring-gray-100">
    
      <button class="text-sm p-2 h-10 text-gray-500 hover:text-gray-600  rounded-r-md border border-l-transparent border-gray-300 hover:border-gray-500">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass"/>
      </button>
    </div>
  </div>
</template>



<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

</script>