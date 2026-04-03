<template>
  <div class=" relative h-10 w-full  cursor-pointer  flex items-center justify-center"
  @mouseenter="openTooltip = true"
  @mouseleave="openTooltip = false"
  >
    <input 
    type="range"
    min="1"
    :max="inputMax"
    v-model="currentValue"
    step="1"
    @input="handleEmit"
    class=" w-full  h-0.5"
    :style="{'--progress': percent + '%'}"
    >

    <div 
    v-show="openTooltip"
    class="absolute bg-green-400 h-4 w-12 p-1 -top-3 rounded-lg flex items-center justify-center text-sm text-white 
    whitespace-nowrap -translate-x-[30%]"
    :class="(percent < 30) ? '-translate-x-[30%]' : (percent >60) ? '-translate-x-[70%]': '-translate-x-[50%]'"
    :style="{left: percent+ '%'}"
    >
      {{currentValue}} / {{ inputMax }}
    </div>
  </div>
</template>

<script setup>
import {ref, watch, computed} from 'vue'

const openTooltip = ref(false)

const props = defineProps({
  inputValue: {type : Number, default : 4},
  inputMax: {type : Number, default : 10}
})

const currentValue = ref(props.inputValue)

watch(() => props.inputValue, (newVal) => {
  currentValue.value = newVal
}) 
const percent = computed(() => {
  return (props.inputMax >= 2 ) ? (((currentValue.value - 1) / (props.inputMax-1)) * 100) : 100
})

const emit = defineEmits(['update:inputValue'])

const handleEmit = () => {
  emit('update:inputValue', Number(currentValue.value))
}

</script>


<style scoped>

/* ============================
   TRACK (the long horizontal bar)
   ============================ */

/* Chrome / Edge / Safari track */
:deep(input[type="range"]::-webkit-slider-runnable-track) {
  height: 8px;                   /* Track thickness (thin bar) */
  border-radius: 9999px;         /* Fully rounded ends */
  background: linear-gradient(   /* Progress + remaining bar */
    to right,
    #35d771 var(--progress, 0%), /* Left side = progress color (green) */
    #d1d5db var(--progress, 0%)  /* Right side = gray background */
  );
}

/* Firefox track */
:deep(input[type="range"]::-moz-range-track) {
  height: 8px;                   /* Same thickness for Firefox */
  border-radius: 9999px;         /* Rounded bar */
  background: linear-gradient(
    to right,
    #35d771 var(--progress, 0%), /* Green progress */
    #d1d5db var(--progress, 0%)  /* Gray rest */
  );
}


/* ============================
   REMOVE DEFAULT BROWSER STYLE
   Needed so custom thumb works
   ============================ */
:deep(input[type="range"]) {
  -webkit-appearance: none;      /* Remove default Chrome/Safari styling */
  appearance: none;              /* Remove default Firefox styling */
  outline: none;
  border: none;
  box-shadow: none;
}

:deep(input[type="range"]:focus),
:deep(input[type="range"]:focus-visible) {
  outline: none;
  border: none;
  box-shadow: none;
}

/* Firefox keyboard focus artifacts on range */
:deep(input[type="range"]::-moz-focus-outer) {
  border: 0;
}

:deep(input[type="range"]:-moz-focusring) {
  outline: none;
}


/* ============================
   THUMB (the draggable circle)
   ============================ */

/* Chrome / Edge / Safari thumb */
:deep(input[type="range"]::-webkit-slider-thumb) {
  -webkit-appearance: none;      /* Allow custom styling (required) */
  appearance: none;              /* Remove default style in Firefox too */
  width: 16px;                   /* Thumb size (smaller = thinner slider) */
  height: 16px;                  /* Same height = perfect circle */
  border-radius: 50%;            /* Make the thumb round */
  background: #22c55e;           /* Thumb color (green) */
  cursor: pointer;               /* Pointer cursor on hover */

  /* Center the thumb on the 3px track */
  margin-top: -4px;              /* Moves thumb down/up → perfect alignment */

  transition: transform 0.15s ease,  /* Smooth grow animation */
              background 0.15s ease; /* Smooth color change */
}

/* Hover effect for thumb (Chrome/Edge/Safari) */
:deep(input[type="range"]:hover::-webkit-slider-thumb) {
  transform: scale(1.25);        /* Thumb grows on hover */
  background: #16a34a;           /* Slightly darker green */
}


/* Firefox thumb */
:deep(input[type="range"]::-moz-range-thumb) {
  width: 16px;                   /* Same size as WebKit thumb */
  height: 16px;                  /* Same size */
  border-radius: 50%;            /* Round thumb */
  background: #22c55e;           /* Green color */
  cursor: pointer;               /* Pointer cursor */
  border: none;                  /* Remove Firefox default border */
}

</style>

