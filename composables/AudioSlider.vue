<template>
  <div class="">
    <input
      type="range"
      min="0"
      :max="duration"
      step="1"
      v-model="currentTime"
      @input="emitUpdate"

      class="w-full h-1.5 rounded cursor-pointer"
      :style="{ '--progress': percent + '%' }"

    />
<!--     
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false" -->
    <!-- Tooltip -->
    <!-- <div
      v-if="showTooltip"
      class="absolute w-[48px] -top-5 px-1  text-white text-xs bg-green-500 rounded-xl font-medium 
      flex justify-center items-center"
      :style="{ left: tooltipLeft + '%' , transform: 'translateX(-40%)'}"
    >
      {{ currentTime }}/{{ duration }}
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  duration: { type: Number, default: 53 }, 
  value: { type: Number, default: 0 }
})

const currentTime = ref(props.value)
// const showTooltip = ref(false)



watch(() => props.value, (newVal) => {
  if (newVal !== currentTime.value) {
    currentTime.value = newVal
  }
})

const percent = computed(() =>
  props.duration > 0 ? (currentTime.value / props.duration) * 100 : 0
)

const emit = defineEmits(['update:value'])
const emitUpdate = () => {
  emit('update:value', Number(currentTime.value))
}

</script>

<style scoped>
/* Track */
input[type="range"]::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 9999px;
  background: linear-gradient(
    to right,
    #3b82f6 var(--progress, 0%),
    #e5e7eb var(--progress, 0%)
  );
}

input[type="range"]::-moz-range-track {
  height: 6px;
  border-radius: 9999px;
  background: linear-gradient(
    to right,
    #3b82f6 var(--progress, 0%),
    #e5e7eb var(--progress, 0%)
  );
}

/* Thumb */
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: #3b82f6;
  cursor: pointer;
  margin-top: -5px;
  transition: transform 0.15s ease; 
}

input[type="range"]:hover::-webkit-slider-thumb {
  transform: scale(1.3);
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: #3b82f6;
  cursor: pointer;
}
</style>
