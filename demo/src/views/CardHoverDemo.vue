<template>
  <main>
    <label> <input type="checkbox" v-model="paused" /> Paused </label>
    <CardDemo :paused="paused" />
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import CardDemo from '../components/CardDemo.vue'

export default defineComponent({
  components: { CardDemo },
  data: () => ({ paused: false }),
})
</script>

<style scoped>
main {
  width: 100%;
  height: 100%;
}
</style>
