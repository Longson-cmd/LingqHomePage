<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <!-- Header stays at top -->
    <header class="shrink-0">
      <HomeHeader />
    </header>

    <!-- Main fills the rest -->
    <main class="flex flex-1 overflow-hidden">
      <!-- Content area -->
      <div class=" flex flex-1 flex-col ">
        <div class="flex-1 overflow-hidden ">
          <ReadingMain/>
        </div>
        <Footter class="shrink-0" />
      </div>

      <!-- Sidebar with independent scroll -->
      <side-bar class="w-[400px] overflow-y-auto px-3" />
    </main>
  </div>
</template>


<script setup>
import HomeHeader from "~/components/HomePage/HomeHeader.vue";
import sideBar from "~/components/ReadingPage/sideBar.vue";
import Footter from "~/components/ReadingPage/Footter.vue";
import ReadingMain from "./ReadingPage/ReadingMain.vue";
</script>