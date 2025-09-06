<script setup lang="ts">
import { ref } from 'vue'
import Slider from '@vueform/slider'

const value = ref(2) // start value (0–100)

</script>

<template>
  <div class="p-20">
    <Slider
      v-model="value"
      :min="1"
      :max="20"
      :step="1"
      :tooltip="'false'"
      class="w-full"
    />
  </div>
</template>
