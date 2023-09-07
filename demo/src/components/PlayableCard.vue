<script setup lang="ts">
import { useSpring } from '../../../src'
import { clamp } from '@vueuse/core'
import { isTouchEvent } from '../utils/touch'
import { round, adjust } from '../utils/math'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    width?: number | string
    height?: number | string
    src: string
    backSrc?: string
    rotateMultiplier?: number | { x: number; y: number }
    blend?:
      | 'normal'
      | 'multiply'
      | 'screen'
      | 'overlay'
      | 'darken'
      | 'lighten'
      | 'color-dodge'
      | 'color-burn'
      | 'hard-light'
      | 'soft-light'
      | 'difference'
      | 'exclusion'
      | 'hue'
      | 'saturation'
      | 'color'
      | 'luminosity'
  }>(),
  {
    rotateMultiplier: () => ({
      x: 0.35,
      y: 0.15,
    }),
    width: 660 / 2,
    height: 921 / 2,
    // overlay is nice for colored cards,
    // for black/white cards (like cards against humanity, hard-light works better)
    blend: 'soft-light',
    backSrc:
      'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f8/Magic_card_back.jpg',
  }
)

const interacting = ref(false)

const springRotate = useSpring({ x: 0, y: 0 })
const springGlare = useSpring({ x: 50, y: 50, o: 0 })
const springBackground = useSpring({ x: 50, y: 50 })
const springRotateDelta = useSpring({ x: 0, y: 0 })
const springTranslate = useSpring({ x: 0, y: 0 })
const springScale = useSpring({ v: 1 })

function onMouseMove(e: MouseEvent | TouchEvent) {
  let clientX: number
  let clientY: number
  if (isTouchEvent(e)) {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
  } else {
    clientX = e.clientX
    clientY = e.clientY
  }

  const $el = e.target as HTMLElement
  const rect = $el.getBoundingClientRect() // get element's current size/position
  const absolute = {
    x: clientX - rect.left, // get mouse position from left
    y: clientY - rect.top, // get mouse position from right
  }
  const percent = {
    x: clamp(round((100 / rect.width) * absolute.x), 0, 100),
    y: clamp(round((100 / rect.height) * absolute.y), 0, 100),
  }
  const center = {
    x: percent.x - 50,
    y: percent.y - 50,
  }

  springScale.v = 1.05

  springBackground.x = adjust(percent.x, 0, 100, 37, 63)
  springBackground.y = adjust(percent.y, 0, 100, 33, 67)

  const rotateMultiplierX =
    typeof props.rotateMultiplier === 'number'
      ? props.rotateMultiplier
      : props.rotateMultiplier.x
  const rotateMultiplierY =
    typeof props.rotateMultiplier === 'number'
      ? props.rotateMultiplier
      : props.rotateMultiplier.y

  springRotate.x = round(rotateMultiplierX * -center.x)
  springRotate.y = round(rotateMultiplierY * center.y)

  springGlare.x = round(percent.x)
  springGlare.y = round(percent.y)
  springGlare.o = 1
}

function onMouseOut() {
  springRotate.x = 0
  springRotate.y = 0
  springGlare.o = 0
  springGlare.x = 50
  springGlare.y = 50
  springBackground.x = 50
  springBackground.y = 50
  springScale.v = 1
}
</script>

<template>
  <div class="card" :class="{ interacting }">
    <div class="card_translater">
      <button
        class="card_rotator"
        @mousemove="onMouseMove"
        @mouseout="onMouseOut"
        tabindex="0"
        @click="springRotateDelta.x = springRotateDelta.x > 90 ? 0 : 180"
        @focus="interacting = true"
        @blur="interacting = false"
      >
        <img
          class="card_back"
          :src="backSrc"
          loading="lazy"
          :width="width"
          :height="height"
        />
        <div class="card_front">
          <img :src="src" loading="lazy" :width="width" :height="height" />
          <div class="card_glare"></div>
        </div>
      </button>
    </div>
  </div>
</template>

<style>
:root {
  /* some global variables */
  --card-aspect: 0.718;
  --card-radius: 4.55% / 3.5%;
  --card-edge: hsl(47, 100%, 78%);
  --card-back: hsl(205, 100%, 25%);
  --card-glow: hsl(175, 100%, 90%);
}
</style>

<style scoped>
button.card_rotator {
  border: none;
  background: transparent;
  padding: 0;

  appearance: none;
}

.card_glare {
  will-change: transform, opacity, background-image, background-size,
    background-position, background-blend-mode, filter;
}

.card {
  /* place the card on a new transform layer and
  make sure it has hardware acceleration. Not needed in all browsers though */
  transform: translate3d(0px, 0px, 0.01px);

  transform-style: preserve-3d;
  pointer-events: none;

  /* make sure the card is above others if it's scaled up */
  z-index: calc(var(--card-scale) * 2);

  /* every little helps! */
  will-change: transform, visibility, z-index;
}

/* force it appearing above close cards when hovering */
.card.card:hover {
  z-index: calc(var(--card-scale) * 100);
}

.card,
.card * {
  /* outline is a little trick to anti-alias */
  outline: 1px solid transparent;
}


.card,
.card_rotator {
  aspect-ratio: var(--card-aspect);
  border-radius: var(--card-radius);
}

.card.card.interacting {
  z-index: calc(var(--card-scale) * 120);
}


.card_translater,
.card_rotator {
  display: grid;
  perspective: 600px;
  will-change: transform, box-shadow;

  transform-origin: center;
}

.card_translater {
  width: auto;
  position: relative;

  transform:
  /* FIXME: vue bug */
    /* translate3d(var(--translate-x), var(--translate-y), 0.1px) */
    scale(var(--card-scale));
}

.card_rotator {
  transform: rotateY(var(--rotate-x)) rotateX(var(--rotate-y));
  transform-style: preserve-3d;

  /* performance */
  pointer-events: auto;
}

/* remove button styles */
button.card_rotator {
  appearance: none;
  border: none;
  background: transparent;
  padding: 0;
}


.card_rotator {
  transition: box-shadow 0.4s ease, opacity 0.33s ease-out;
  box-shadow: 5px 6px 6px -1px rgba(0, 0, 0, 0.3);
}
.card:hover .card_rotator {
    box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
}

.card .card_rotator:focus {
  box-shadow: 0 0 3px -1px white, 0 0 3px 1px var(--card-edge),
    0 0 12px 2px var(--card-glow), 0px 10px 20px -5px black,
    0 0 40px -30px var(--card-glow), 0 0 50px -20px var(--card-glow);
}

.card_rotator * {
  width: 100%;
  display: grid;
  grid-area: 1/1;
  aspect-ratio: var(--card-aspect);
  border-radius: var(--card-radius);
  image-rendering: crisp-edges;

  transform-style: preserve-3d;
  pointer-events: none;
  overflow: hidden;
}

.card_rotator img {
  height: auto;
  transform: translate3d(0px, 0px, 0.01px);
}

img.card_back {
  background-color: var(--card-back);
  transform: rotateY(180deg) translateZ(1px);
  backface-visibility: visible;
}

.card_front,
.card_front * {
  backface-visibility: hidden;
}

.card_front {
  opacity: 1;
  transition: opacity 0.33s ease-out;

  transform: translate3d(0px, 0px, 0.01px);
}

.loading .card_front {
  opacity: 0;
}

.loading .card_back {
  transform: rotateY(0deg);
}

/**

Shine & Glare Effects

**/

.card_glare {
  /* make sure the glare doesn't clip */
  transform: translateZ(1.41px);
  overflow: hidden;

  background-image: radial-gradient(
    farthest-corner circle at var(--pointer-x) var(--pointer-y),
    hsla(0, 0%, 100%, 0.8) 10%,
    hsla(0, 0%, 100%, 0.65) 20%,
    hsla(0, 0%, 0%, 0.5) 90%
  );

  opacity: var(--card-opacity);

  mix-blend-mode: v-bind('blend');
}

.card {
  --pointer-x: v-bind('springGlare.x + "%"');
  --pointer-y: v-bind('springGlare.y + "%"');
  --card-opacity: v-bind('springGlare.o');
  --rotate-x: v-bind('springRotate.x + springRotateDelta.x + "deg"');
  --rotate-y: v-bind('springRotate.y + springRotateDelta.y + "deg"');
  --background-x: v-bind('springBackground.x + "%"');
  --background-y: v-bind('springBackground.y + "%"');
  --card-scale: v-bind('springScale.v');
  --translate-x: v-bind('springTranslate.x + "px"')
  --translate-y: v-bind('springTranslate.y + "px"');
}
</style>
