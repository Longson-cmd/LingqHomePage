<template>
    <div class="max-w-md mx-auto flex flex-col h-screen">
        <div class="h-20 bg-gray-100 flex items-center p-2 border">
            <div class="flex items-center justify-end w-full gap-2">
                <button @click="prePage" class="border p-1 bg-green-200 hover:bg-green-300 rounded-md">Prev</button>
                <span>{{ currentPage}} / {{ totalPage }}</span>
                <button @click="nextPage" class="border p-1 bg-green-200 hover:bg-green-300 rounded-md">Next</button>
            </div>
        </div>

        <div class="overflow-hidden" ref="prose">
            <div v-for="(para, paraIndex) in paragraphs" class="flex flex-wrap">
                <span v-for="(word, wordIndex) in para.split(' ') " class="text-4xl p-2">
                    {{ word }}
                </span>
            </div>

            <div :style="{height: remaining + 'px'}"></div>
        </div>

        <div class="flex-1 bg-green-100 min-h-10">
      
        </div>
    </div>

</template>


<script setup>
const {prose, currentPage, totalPage, remaining, updateTotalPages, prePage, nextPage} = pagination()


onMounted(async () => {
    await updateTotalPages();
    window.addEventListener('resize', updateTotalPages)
})

onBeforeUnmount(() => window.removeEventListener('resize', updateTotalPages))

 


const paragraphs = [

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


<!-- Math.round -->
<!-- Math.floor: toward negative infinity -->
<!-- el.clientHeight  : take hight of element from user's view -->
<!-- % : get -->
  <!-- el.style.height : is used to change the view -->
    <!-- el.scrollTo -->
     <!-- :style: used it to change the height of elemnt -->

  <!-- overflow-y-hidden -->
