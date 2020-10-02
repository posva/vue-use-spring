<template>
  <div class="root">
    <div
      class="card"
      :style="cardStyle"
      @click="spin"
      @mousemove="update"
      @mouseleave="reset"
    >
      <!-- <pre>{{ transform }}</pre> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useSpring } from '../../../src'

export default defineComponent({
  props: {
    paused: Boolean,
  },
  setup(props) {
    const springConfig = {
      mass: 5,
      tension: 350,
      friction: 40,
    }

    const transform = useSpring({ x: 0, y: 0, z: 0, scale: 1 }, springConfig, {
      onRest() {
        transform.z = 0
      },
    })

    function update({ clientX: x, clientY: y }: MouseEvent) {
      transform.x = -(y - window.innerHeight / 2) / 20
      transform.y = (x - window.innerWidth / 2) / 20
      transform.scale = 1.1
    }

    function spin() {
      transform.z = (Math.round(Math.random() * 2) + 1) * 180
    }

    function reset() {
      transform.x = 0
      transform.y = 0
      transform.scale = 1
    }

    const cardStyle = computed(() => ({
      transform: `perspective(600px) rotateX(${transform.x}deg) rotateZ(${transform.y}deg) rotateY(${transform.z}deg) scale(${transform.scale})`,
    }))

    return { cardStyle, update, reset, spin, transform }
  },
})
</script>

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
  background: grey;
  border-radius: 5px;
  background-image: url(https://th.bing.com/th/id/OIP.dNThH2YkeWOEcyYZ9wKcEQHaJl?pid=Api&rs=1);
  background-size: cover;
  background-position: center center;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s;
  will-change: transform;
  border: 15px solid white;
  /* backface-visibility: hidden; */
}

.card:hover {
  box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
}
</style>
