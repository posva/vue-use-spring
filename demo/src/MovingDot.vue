<template>
  <div class="dot second" :style="dotPositionStatic"></div>
  <div class="dot" :style="dotPosition"></div>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, ref, unref, watch } from 'vue'
import { useMouse } from '@vueuse/core'
import { presets, useSpring } from '../../src'

function generateRandomPosition(offset = 100) {
  return {
    x: offset + Math.random() * (window.innerWidth - offset * 2),
    y: offset + Math.random() * (window.innerHeight - offset * 2),
  }
}

export default defineComponent({
  props: {
    paused: Boolean,
  },

  setup(props) {
    const dot = ref(generateRandomPosition())
    const mouse = useMouse()

    watch([mouse.x, mouse.y], ([x, y]) => {
      dotAnimated.x = x
      dotAnimated.y = y
    })

    const dotAnimated = useSpring(dot)

    dot.value = generateRandomPosition()

    const interval = setInterval(() => {
      if (!props.paused) {
        Object.assign(dotAnimated, generateRandomPosition())
      }
    }, 1000)
    onUnmounted(() => {
      clearInterval(interval)
    })

    const dotPositionStatic = computed(() => {
      const pos = unref(dot)
      return {
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }
    })

    const dotPosition = computed(() => {
      const pos = dotAnimated
      return {
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }
    })

    return { presets, dot, dotPosition, dotPositionStatic }
  },
})
</script>

<style scoped>
.dot {
  position: absolute;
  z-index: 100;
  background-color: crimson;
  /* border: maroon solid 2px; */
  top: 0;
  left: 0;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  will-change: transform;
}

.second {
  background-color: mediumspringgreen;
  /* width: 4px;
  height: 4px; */
}
</style>
