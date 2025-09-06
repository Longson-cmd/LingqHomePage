<template>
  <div class="w-full flex items-center">
    <input
      type="range"
      min="0"
      :max="duration"
      step="0.1"
      v-model="currentTime"
      @input="emitUpdate"
      class="w-full h-1.5 appearance-none rounded cursor-pointer"
      :style="{ '--progress': percent + '%' }"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  duration: { type: Number, default: 100 },
  value: { type: Number, default: 0 }
})
const emit = defineEmits(['update:value'])

const currentTime = ref(props.value)

watch(() => props.value, (newVal) => {
  currentTime.value = newVal
})

const percent = computed(() =>
  props.duration > 0 ? (currentTime.value / props.duration) * 100 : 0
)

const emitUpdate = () => {
  emit('update:value', Number(currentTime.value))
}
</script>

<style scoped>
/* Progress bar styling */
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
}
input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: #3b82f6;
  cursor: pointer;
}
</style>
