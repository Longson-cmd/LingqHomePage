<template>
  <div class="flex flex-col h-screen">
    <header class="shrink-0">
      <HomeHeader/>
    </header>

    <main class="flex flex-1 overflow-hidden bg-gray-50">
      <div class="flex flex-1 flex-col">
        <div class="flex flex-1"></div>

        <Footter/>
      </div>

      <sideBar/>
    </main>
  </div>
</template>


<script setup>
import HomeHeader from "~/components/HomePage/HomeHeader.vue";
import sideBar from "~/components/ReadingPage/sideBar.vue";
import Footter from "~/components/ReadingPage/Footter.vue";

</script>