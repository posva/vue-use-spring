<template>
  <main>
    <label> <input type="checkbox" v-model="paused" /> Paused </label>
    <select v-model="spring">
      <option v-for="(preset, name) in presets" :value="preset">
        {{ name }}
      </option>
    </select>
    <MovingDot
      v-for="i in 3"
      :key="i"
      :paused="paused"
      :spring="spring"
    ></MovingDot>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MovingDot from '../components/MovingDot.vue'
import { SpringConfig, presets } from '../../../src'

export default defineComponent({
  components: { MovingDot },
  data: () => ({ paused: false, spring: presets.wobbly, presets }),
})
</script>
