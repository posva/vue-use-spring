<template>
  <main>
    <label> <input type="checkbox" v-model="paused" /> Paused </label>
    <MovingDot v-for="i in 3" :key="i" :paused="paused"></MovingDot>
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import MovingDot from '../components/MovingDot.vue'

export default defineComponent({
  components: { MovingDot },
  data: () => ({ paused: false }),
})
</script>
