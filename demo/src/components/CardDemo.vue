<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useSpring } from '../../../src'

type HSLColor = [number, number, number]

defineProps<{
  paused: boolean
}>()

const springConfig = {
  mass: 5,
  tension: 350,
  friction: 40,
}

const transform = useSpring(
  ref({ x: 0, y: 0, z: 0, scale: 1, color: 0 }),
  springConfig,
  {
    onRest() {
      transform.z = 0
    },
  }
)

function update({ clientX: x, clientY: y }: MouseEvent) {
  transform.x = -(y - window.innerHeight / 2) / 20
  transform.y = (x - window.innerWidth / 2) / 20
  transform.scale = 1.1
  transform.color = 1
}

function spin() {
  transform.z = (Math.round(Math.random() * 2) + 1) * 180
}

function reset() {
  transform.x = 0
  transform.y = 0
  transform.scale = 1
  transform.color = 0
}

// hsl(18deg 83% 65%)
// hsl(295deg 44% 31%)

function interpolateRGB(from: number, to: number, amount: number) {
  return `rgb(${interpolate(
    (from >> 16) & 255,
    (to >> 16) & 255,
    amount
  )},${interpolate((from >> 8) & 255, (to >> 8) & 255, amount)},${interpolate(
    from & 255,
    to & 255,
    amount
  )})`
}

// hsl(18deg 83% 65%)
// hsl(295deg 44% 31%)
// const fromColor = [18, 83, 65] as HSLColor
// const toColor = [295, 44, 31] as HSLColor

// function interpolateHSL(from: HSLColor, to: HSLColor, amount: number) {
//   return `hsl(${interpolate(from[0], to[0], amount)}deg,${interpolate(
//     from[1],
//     to[1],
//     amount
//   )}%,${interpolate(from[2], to[2], amount)}%)`
// }

function interpolate(from: number, to: number, amount: number) {
  return amount * (to - from) + from
}

const borderColor = computed(() => {
  return interpolateRGB(0xffffff, 0, transform.color)
})
</script>

<template>
  <div class="root">
    <div class="card" @click="spin" @mousemove="update" @mouseleave="reset">
      <!-- <pre>{{ transform }}</pre> -->
    </div>
  </div>
</template>

<style scoped>
.root {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #f0f0f0;
  width: 100%;
  height: 100%;
}

.card {
  width: 45ch;
  height: 45ch;
  border-radius: 5px;
  background-image: url(https://th.bing.com/th/id/OIP.dNThH2YkeWOEcyYZ9wKcEQHaJl?pid=Api&rs=1);
  background-size: cover;
  background-position: center center;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s;
  will-change: transform;
  border: 15px solid white;
  /* backface-visibility: hidden; */
  transform: perspective(1000px) rotateX(v-bind('transform.x + "deg"'))
    rotateZ(v-bind('transform.y + "deg"'))
    rotateY(v-bind('transform.z + "deg"')) scale(v-bind('transform.scale'));
  border-color: v-bind('borderColor');
}

.card:hover {
  box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
}
</style>
