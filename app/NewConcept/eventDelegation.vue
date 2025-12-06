<template>
  <div class="p-4">
    <!-- Sentence wrapper: chỉ 1 @click ở đây -->
    <div class="sentence border p-3 rounded"
         @click="onSentenceClick">
      <span
        v-for="word in words"
        :key="word.id"
        class="sentence-item px-1 cursor-pointer"
        :class="[
          `status-${word.status}`,
          { 'is-active': word.id === activeWordId }
        ]"
        :data-id="word.id"
      >
        {{ word.text }}
      </span>
    </div>

    <p class="mt-3 text-sm text-gray-600">
      Click một từ, rồi bấm phím 1–4 để đổi status.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const words = ref([
  { id: 'w1', text: 'Voilà',      status: 1 },
  { id: 'w2', text: "c'est",      status: 1 },
  { id: 'w3', text: 'déjà',       status: 2 },
  { id: 'w4', text: "l'heure",    status: 3 },
  { id: 'w5', text: 'de',         status: 4 },
  { id: 'w6', text: 'finir',      status: 2 },
  { id: 'w7', text: 'ce',         status: 1 },
  { id: 'w8', text: 'podcast,',   status: 1 },
  { id: 'w9', text: 'merci',      status: 3 },
  { id: 'w10', text: 'de',        status: 4 },
  { id: 'w11', text: "m'avoir",   status: 2 },
  { id: 'w12', text: 'écouté',    status: 1 },
  { id: 'w13', text: "jusqu'au",  status: 2 },
  { id: 'w14', text: 'bout.',     status: 3 },
])

// id của từ đang được chọn
const activeWordId = ref(null)

// 1) Event delegation cho CLICK
const onSentenceClick = (event) => {
  // Lấy phần tử (element) mà người dùng thật sự click vào
  // và tìm phần tử gần nhất có class .sentence-item
  // (để đảm bảo click vào chữ con cũng được)
  const wordEl = event.target.closest('.sentence-item')

  // Nếu không tìm thấy word → thoát (người dùng click vào chỗ trống)
  if (!wordEl) return

  // Lấy id của từ qua attribute data-id
  const id = wordEl.dataset.id

  // Lưu id của từ đang được chọn để dùng ở chỗ khác (ví dụ: đổi status bằng phím 1-4)
  activeWordId.value = id
}



// Hàm helper: đổi status của từ đang được chọn trong danh sách words
const changeStatus = (newStatus) => {

  // Nếu chưa chọn từ nào thì không đổi được
  if (!activeWordId.value) return

  // Tìm index của từ trong mảng words dựa theo id
  const index = words.value.findIndex(w => w.id === activeWordId.value)

  // Nếu không tìm thấy trong mảng thì thoát
  if (index === -1) return

  // Đổi status của từ thành status mới (1,2,3,4)
  words.value[index].status = newStatus
}


// 2) ONE keydown listener cho toàn bộ phím 1–4
const handleKeydown = (event) => {
  if (!activeWordId.value) return

  if (['1', '2', '3', '4'].includes(event.key)) {
    changeStatus(Number(event.key))  // 1 → status 1, v.v.
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.sentence-item {
  border-radius: 4px;
}

/* demo màu cho status */
.status-1 { background: #e0f2fe; }  /* xanh nhạt */
.status-2 { background: #fee2e2; }  /* đỏ nhạt */
.status-3 { background: #fef9c3; }  /* vàng nhạt */
.status-4 { background: #dcfce7; }  /* xanh lá nhạt */

.is-active {
  outline: 2px solid #0ea5e9;
}

</style>
