<template>
  <div class="max-w-3xl mx-auto p-6">
    <!-- Story content -->
    <h2 class="text-lg font-bold mb-4">
      {{ stories[currentPage].title }}
    </h2>
    <p class="leading-7 mb-6">
      {{ stories[currentPage].text }}
    </p>

    <!-- Navigation arrows -->
    <div class="flex justify-between items-center">
      <!-- Left arrow -->
      <button
        @click="prevPage"
        :disabled="currentPage === 0"
        class="text-2xl p-2 disabled:opacity-30"
      >
        ◀
      </button>

      <span class="text-gray-600">
        Page {{ currentPage + 1 }} / {{ stories.length }}
      </span>

      <!-- Right arrow -->
      <button
        @click="nextPage"
        :disabled="currentPage === stories.length - 1"
        class="text-2xl p-2 disabled:opacity-30"
      >
        ▶
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const stories = [
  {
    title: "Histoire cinquante-quatre: Cécile est bloquée au parc",
    text: "Cécile est bloquée au parc. Elle était partie assister à un festival..."
  },
  {
    title: "Histoire cinquante-cinq: Une autre journée",
    text: "Aujourd'hui, il faisait beau et Cécile est sortie..."
  },
  {
    title: "Histoire cinquante-six: La pluie arrive",
    text: "En marchant dans le parc, Cécile a senti quelques gouttes..."
  }
];

const currentPage = ref(0);

function prevPage() {
  if (currentPage.value > 0) currentPage.value--;
}

function nextPage() {
  if (currentPage.value < stories.length - 1) currentPage.value++;
}
</script>
