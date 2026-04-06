<template>
  <div class="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2">
    <TransitionGroup name="notification">
      <div
        v-for="item in notifications"
        :key="item.id"
        class="pointer-events-auto flex items-start justify-between gap-3 rounded-lg border px-3 py-2 text-sm shadow-lg"
        :class="notificationTypeClass[item.type] || notificationTypeClass.info"
      >
        <span class="break-words">{{ item.message }}</span>
        <button class="rounded px-2 py-0.5 text-xs hover:bg-black/10" @click="dismissNotification(item.id)">x</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
const { notifications, dismissNotification } = useAppNotification()

const notificationTypeClass = {
  success: 'border-green-300 bg-green-50 text-green-800',
  error: 'border-red-300 bg-red-50 text-red-800',
  info: 'border-gray-300 bg-white text-gray-700'
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.2s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
