<!-- <template>
  <practise></practise>
</template> -->



<template>
  <header class=" bg-white shadow">
    <HomeHeader></HomeHeader>
  </header>
  <main class="bg-gray-100 h-screen flex flex-col ">
    <demoSingleSelection></demoSingleSelection>
    <HomeMain></HomeMain>
    <Lessons></Lessons>

  </main>

</template>


<script setup>

import HomeHeader from "~/components/HomePage/HomeHeader.vue";
import demoSingleSelection from "~/components/HomePage/MainSection/demoSingleSelection.vue";
import HomeMain from "~/components/HomePage/HomeMain.vue";
import Lessons from "~/components/HomePage/Lessons.vue";



</script>