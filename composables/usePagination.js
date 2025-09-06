// composables/usePagination.js
import { ref } from 'vue'

export function usePagination(lineHeight = 56) {
  const total = ref(1)
  const page = ref(1)
  const LINE_HEIGHT = lineHeight

  return { total, page,  LINE_HEIGHT }
}
