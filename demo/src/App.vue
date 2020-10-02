<template>
  <main class="main">
    <label> <input type="checkbox" v-model="paused" /> Paused </label>
    <!-- <MovingDot v-for="i in 3" :key="i" :paused="paused"></MovingDot> -->
    <CardDemo :paused="paused" />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MovingDot from './MovingDot.vue'
import CardDemo from './views/CardDemo.vue'

export default defineComponent({
  components: { MovingDot, CardDemo },

  setup() {
    let paused = ref(true)

    return { paused }
  },
})
</script>

<style>
html {
  box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir,
    helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
}
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
</style>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>
