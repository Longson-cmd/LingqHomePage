<script setup>
import { ref, onMounted, nextTick } from 'vue'; 
// Import Vue functions: 
// - ref() to create reactive variables
// - onMounted() to run code when component mounts
// - nextTick() to wait until DOM updates before running code

// Example paragraphs we will render in the template

const scroller = ref(null)
const paragraphs = [
  "BLeo Babauta, créateur du blog Zen Habits, raconte son parcours personnel : il est passé d’une vie marquée par l’anxiété, les dettes, les mauvaises habitudes et l’insatisfaction, à une existence simple et apaisée.",
  "Ce « petit livre » est pensé comme un guide pratique et accessible, destiné à être mis en œuvre, pas seulement lu. Babauta invite le lecteur à consacrer un temps réel à la lecture et surtout à appliquer les principes proposés.",
  "L’auteur insiste sur l’importance de commencer par de petites actions quotidiennes, qui finissent par transformer durablement notre mode de vie.",
  "Il rappelle également que la simplicité ne consiste pas à se priver, mais à choisir consciemment ce qui compte vraiment pour nous."
];

const paraRefs = ref([]); 
// Array of DOM references, one for each paragraph container

// Helper function to assign DOM element refs for each paragraph
const setParaRef = (el, i) => { 
  if (el) paraRefs.value[i] = el; // Save element into paraRefs at index i
};

// Function: count how many visual lines a container spans
function countFlexLines(container) {
  const kids = Array.from(container.children); 
  // Get all child elements inside container

  const tops = new Set(kids.map(k => k.offsetTop)); 
  console.log('lists top :', tops)
  // Collect each child’s top position (offsetTop) → 
  // If text wraps to a new line, offsetTop changes.
  // Using a Set removes duplicates.

  return tops.size; 
  // The number of unique "top positions" = number of lines
}

// Function: log line counts for all paragraphs
function logLineCounts() {
  paraRefs.value.forEach((el, i) => {
    const lines = countFlexLines(el); // Count lines for this paragraph
    console.log(`Paragraph ${i} lines:`, lines); 
    // Print the result to console
  });
}


// function logLineCounts() {
//   for (let i = 0; i < paraRefs.value.length; i++) {
//     const el = paraRefs.value[i];
//     const lines = countFlexLines(el); // Count lines for this paragraph
//     console.log(`Paragraph ${i} lines:`, lines);
//   }
// }

onMounted(async () => {
  await nextTick(); 
  // Wait until DOM is rendered before measuring

  const el = scroller.value

  const view = el.clientHeight || 1
  const totalHeight = el.scrollHeight || 1

  console.log("view: ", view , ' px')
  console.log("totalHeight: ", totalHeight , ' px')

  logLineCounts(); 
  // Measure initial line counts

  window.addEventListener('resize', logLineCounts); 
  // Recalculate whenever window size changes (since wrapping changes)
});
</script>


<template>
  <article class="prose max-w-none px-6 h-screen overflow-y-auto" ref="scroller">
    <div  class="text-4xl px-32">
      <div
        v-for="(para, paraIndex) in paragraphs"
        :key="paraIndex"
        class="flex flex-wrap gap-4 mb-8"
        :ref="el => setParaRef(el, paraIndex)"
      >
        <span v-for="(word, index) in para.split(' ')" :key="index">{{ word }}</span>
      </div>
    </div>
  </article>
</template>
