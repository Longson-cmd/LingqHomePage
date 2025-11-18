<template>

 <span class="block p-2">
    <div class="lingq-spinner">
      <div></div><div></div><div></div><div></div><div></div><div></div>
      <div></div><div></div><div></div><div></div><div></div><div></div>
    </div>
 </span>

</template>


<style scoped>
.lingq-spinner {
  position: relative;         /* Allows absolutely positioned child bars */
  width: 16px;                 /* Base size of the spinner container */
  height: 16px;                /* Base size of the spinner container */
}

.lingq-spinner div {
  position: absolute;         /* Each bar is positioned relative to the spinner center */
  left: 50%;                  /* Start bar at center horizontally */
  top: 50%;                   /* Start bar at center vertically */
  width: 7px;                 /* Length of each bar (wing) */
  height: 3px;                /* Thickness of each bar (wing) */
  background: #000;           /* Color of each bar */
  box-shadow: 0 0 1px rgba(0,0,0,0.1); /* Slight glow for smoother look */
  border-radius: 1px;         /* Rounded edges of each bar */
  transform-origin: left center; /* Rotate around the left side to form a circle */
  animation: lingq-fade 1s linear infinite; /* Apply fade animation */
}

@keyframes lingq-fade {
  0% { opacity: 1; }          /* Bar is fully visible at the start */
  100% { opacity: 0.25; }     /* Bar fades to low opacity at the end */
}

.lingq-spinner div:nth-child(1)  { transform: rotate(0deg)   translate(8px, 0);  animation-delay: -1.1s; }
.lingq-spinner div:nth-child(2)  { transform: rotate(30deg)  translate(8px, 0);  animation-delay: -1.0s; }
.lingq-spinner div:nth-child(3)  { transform: rotate(60deg)  translate(8px, 0);  animation-delay: -0.9s; }
.lingq-spinner div:nth-child(4)  { transform: rotate(90deg)  translate(8px, 0);  animation-delay: -0.8s; }
.lingq-spinner div:nth-child(5)  { transform: rotate(120deg) translate(8px, 0);  animation-delay: -0.7s; }
.lingq-spinner div:nth-child(6)  { transform: rotate(150deg) translate(8px, 0);  animation-delay: -0.6s; }
.lingq-spinner div:nth-child(7)  { transform: rotate(180deg) translate(8px, 0);  animation-delay: -0.5s; }
.lingq-spinner div:nth-child(8)  { transform: rotate(210deg) translate(8px, 0);  animation-delay: -0.4s; }
.lingq-spinner div:nth-child(9)  { transform: rotate(240deg) translate(8px, 0);  animation-delay: -0.3s; }
.lingq-spinner div:nth-child(10) { transform: rotate(270deg) translate(8px, 0);  animation-delay: -0.2s; }
.lingq-spinner div:nth-child(11) { transform: rotate(300deg) translate(8px, 0);  animation-delay: -0.1s; }
.lingq-spinner div:nth-child(12) { transform: rotate(330deg) translate(8px, 0);  animation-delay: -0.0s; }

</style>