<template>
    <div class="relative w-full h-3 bg-gray-200  rounded-full overflow-hidden">
        <div class="absolute w-1/3 h-full bg-blue-500 animate-[loading_1.5s_infinite]"></div>
    </div>
</template>

<style>
@keyframes loading {
    0% {left: -33%}
    100% {left: 100%}
}
/* 0% refers to the time start this animation
-- 33% move all this animation to outside of this progress bar */
</style>






<!-- <template>
    <div class="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div class="absolute h-full w-1/3 bg-blue-500 animate-[loading_1.5s_infinite]"></div>
  </div>
</template>

<style>
@keyframes loading {
  0% { left: -33%; }
  100% { left: 100%; }
}


</style> -->