<template>
  <div class="relative h-screen w-full overflow-hidden bg-gray-100">
    <div
      class="absolute select-none border-2 border-black bg-white shadow-xl"
      :style="s"
    >
      <div class="h-full w-full p-2">
        <div class="flex h-full w-full items-center justify-center rounded bg-black text-white">
          Your content
        </div>
      </div>

      <!-- handles -->
      <div
        v-for="k in sides"
        :key="k"
        :class="sideClass[k]"
        @pointerdown="down(k, $event)"
      />
      <div
        v-for="k in corners"
        :key="k"
        :class="cornerClass[k]"
        @pointerdown="down(k, $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onBeforeUnmount } from 'vue'

const r = reactive({ x: 120, y: 80, w: 420, h: 260 })
const MIN_W = 240, MIN_H = 160

const s = computed(() => ({
  left: r.x + 'px', top: r.y + 'px', width: r.w + 'px', height: r.h + 'px'
}))

const sides = ['top','right','bottom','left']
const corners = ['top-left','top-right','bottom-right','bottom-left']

const sideClass = {
  top:    'absolute -top-1.5 left-0 right-0 h-3 cursor-ns-resize',
  bottom: 'absolute -bottom-1.5 left-0 right-0 h-3 cursor-ns-resize',
  left:   'absolute -left-1.5 top-0 bottom-0 w-3 cursor-ew-resize',
  right:  'absolute -right-1.5 top-0 bottom-0 w-3 cursor-ew-resize'
}
const cornerClass = {
  'top-left':     'absolute -top-2 -left-2 h-4 w-4 cursor-nwse-resize',
  'top-right':    'absolute -top-2 -right-2 h-4 w-4 cursor-nesw-resize',
  'bottom-right': 'absolute -bottom-2 -right-2 h-4 w-4 cursor-nwse-resize',
  'bottom-left':  'absolute -bottom-2 -left-2 h-4 w-4 cursor-nesw-resize'
}

let mode = '', sx = 0, sy = 0, bx = 0, by = 0, bw = 0, bh = 0

const clamp = (v, min) => (v < min ? min : v)

function down(which, e) {
  e.preventDefault()
  mode = which
  e.currentTarget.setPointerCapture(e.pointerId)

  sx = e.clientX; sy = e.clientY
  bx = r.x; by = r.y; bw = r.w; bh = r.h

  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', up, { once: true })
}

function move(e) {
  if (!mode) return
  const dx = e.clientX - sx, dy = e.clientY - sy

  // horizontal
  if (mode.includes('right')) r.w = clamp(bw + dx, MIN_W)
  if (mode.includes('left'))  {
    const nw = clamp(bw - dx, MIN_W)
    r.x = bx + (bw - nw); r.w = nw
  }

  // vertical
  if (mode.includes('bottom')) r.h = clamp(bh + dy, MIN_H)
  if (mode.includes('top')) {
    const nh = clamp(bh - dy, MIN_H)
    r.y = by + (bh - nh); r.h = nh
  }
}

function up() {
  window.removeEventListener('pointermove', move)
  mode = ''
}

onBeforeUnmount(() => window.removeEventListener('pointermove', move))
</script>
