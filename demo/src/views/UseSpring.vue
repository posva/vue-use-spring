<template>
  <main class="demos">
    <label> <input type="checkbox" v-model="paused" /> Paused </label>
    <select v-model="springConfig">
      <option v-for="(preset, name) in presets" :value="preset">
        {{ name }}
      </option>
    </select>

    <div>
      {{ percentage.toFixed(2) }}
    </div>

    <div>
      <svg
        viewBox="0 0 45 44"
        stroke-width="2"
        fill="white"
        stroke="rgb(45, 55, 71)"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="156"
        :stroke-dashoffset="percentage * 156"
        style="margin: 20px; width: 80px; height: 80px"
      >
        <polygon
          points="22.5 35.25 8.68704657 42.5118994 11.3250859 27.1309497 0.150171867 16.2381006 15.5935233 13.9940503 22.5 0 29.4064767 13.9940503 44.8498281 16.2381006 33.6749141 27.1309497 36.3129534 42.5118994"
        ></polygon>
      </svg>
    </div>

    <div class="scroll-demo">
      <div :scrollTop="percentage * 340">
        <div class="scroll-demo__item">hello</div>
        <div class="scroll-demo__item">hello</div>
        <div class="scroll-demo__item">hello</div>
        <div class="scroll-demo__item">hello</div>
        <div class="scroll-demo__item">hello</div>
        <div class="scroll-demo__item">hello</div>
        <div class="scroll-demo__item">hello</div>
        <div class="scroll-demo__item">hello</div>
      </div>
    </div>

    <div>
      <svg
        viewBox="0 0 51 51"
        stroke-width="2.5"
        fill="white"
        stroke="rgb(45, 55, 71)"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="156"
        :stroke-dashoffset="percentage * 156"
        style="margin: 20px; width: 80px; height: 80px"
      >
        <circle
          transform="translate(25.500000, 25.500000) rotate(-270.000000) translate(-25.500000, -25.500000)"
          cx="25.5"
          cy="25.5"
          r="24.5"
        ></circle>
      </svg>
    </div>
  </main>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  watch,
} from 'vue'
import { SpringConfig, presets, useSpring } from '../../../src'

export default defineComponent({
  setup() {
    const paused = ref(false)
    const springConfig = shallowRef(presets.noWobble)

    const spring = useSpring({ x: 0 }, springConfig)
    const percentage = computed(() => spring.x / 100)

    let timer
    let targetValue = 1
    function toggleValue() {
      targetValue = targetValue ? 0 : 100
      spring.x = targetValue
      timer = setTimeout(toggleValue, 1000)
    }

    onMounted(toggleValue)
    onUnmounted(() => {
      clearTimeout(timer)
    })

    watch(paused, (paused) => {
      if (paused) {
        clearTimeout(timer)
      } else {
        toggleValue()
      }
    })

    return {
      presets,
      springConfig,
      paused,
      spring,
      percentage,
    }
  },
})
</script>

<style>
.demos {
  color: #2d3747;
}

.scroll-demo {
  width: 20rem;
  height: 70px;
  font-size: 3rem;
}

.scroll-demo > div {
  position: relative;
  width: 100%;
  height: 60px;
  font-size: 0.5em;
  overflow: auto;
}

.scroll-demo__item {
  width: 100%;
  height: 50px;
  text-align: center;
}
</style>
