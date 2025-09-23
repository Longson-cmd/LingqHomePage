<template>
  <div class="h-screen flex flex-col">
    <div class="h-20 bg-blue-300 text-xl">
      Page <b>{{ currentPage }}</b> / <b>{{totalPage}}</b>
  
      <div class="w-full flex items-end justify-center">
        <Slider
        v-model="currentPage"
        :min="1"
        :max="totalPage"
        :step="1"
        :tooltip="false"
        class="w-[300px]"
        />
      </div>
    </div>
  
    <MainSection :current-page="currentPage" :paragraphs="prose" @update="handleUpdate"></MainSection>

    <footer class="h-20 bg-blue-300">
      <span>Good luck</span>
    </footer>
  </div>
</template>


<script setup>
import {ref} from 'vue'
import Slider from '@vueform/slider'
import MainSection from '~/components/ReadingPage/MainSection.vue';



const currentPage = ref(1)
const totalPage = ref(1)


const handleUpdate = (data) => {
  currentPage.value = data.page 
  totalPage.value = data.total
} 

const prose = [
  "BLeo Babauta, créateur du blog Zen Habits, raconte son parcours personnel : il est passé d’une vie marquée par l’anxiété, les dettes, les mauvaises habitudes et l’insatisfaction, à une existence simple et apaisée.",
  "Ce « petit livre » est pensé comme un guide pratique et accessible, destiné à être mis en œuvre, pas seulement lu. Babauta invite le lecteur à consacrer un temps réel à la lecture et surtout à appliquer les principes proposés.",
  "L’auteur insiste sur l’importance de commencer par de petites actions quotidiennes, qui finissent par transformer durablement notre mode de vie.",
  "Il rappelle également que la simplicité ne consiste pas à se priver, mais à choisir consciemment ce qui compte vraiment pour nous.",
  "BLeo Babauta, créateur du blog Zen Habits, raconte son parcours personnel : il est passé d’une vie marquée par l’anxiété, les dettes, les mauvaises habitudes et l’insatisfaction, à une existence simple et apaisée.",
  "Ce « petit livre » est pensé comme un guide pratique et accessible, destiné à être mis en œuvre, pas seulement lu. Babauta invite le lecteur à consacrer un temps réel à la lecture et surtout à appliquer les principes proposés.",
  "L’auteur insiste sur l’importance de commencer par de petites actions quotidiennes, qui finissent par transformer durablement notre mode de vie. Il met en avant la force de la régularité et de la constance, plutôt que de chercher un changement radical immédiat.",
  "Il rappelle également que la simplicité ne consiste pas à se priver, mais à choisir consciemment ce qui compte vraiment pour nous. Ainsi, chaque geste devient une occasion de se recentrer sur l’essentiel et de cultiver plus de sérénité dans son quotidien."
];
</script>