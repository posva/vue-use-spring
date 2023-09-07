<script setup>
import Card from '../components/PlayableCard.vue'

const whiteCard =
  'https://i.ibb.co/wY6ykR7/Pixel-Snap-2023-09-06-at-21-11-23-2x.png'
const blackCard =
  'https://cards.scryfall.io/normal/front/d/0/d01a114f-3349-4a62-bfad-0dc33b78a53f.jpg'
const blackerLotus =
  'https://assets.moxfield.net/cards/card-E0nB3-normal.webp?8651937'
const squirtleCard = 'https://images.pokemontcg.io/sm10/33_hires.png'
</script>

<template>
  <section class="card-grid">
    <Card :src="squirtleCard" />
    <Card :src="blackerLotus" />
    <Card :src="blackCard" blend="soft-light" />
    <Card :src="whiteCard" />
    <Card
      src="https://assets.echomtg.com/magic/cards/original/10523.jpg"
      blend="soft-light"
    />
  </section>
  <section class="card-grid">
    <Card
      src="https://cards.scryfall.io/png/front/4/a/4a2e428c-dd25-484c-bbc8-2d6ce10ef42c.png?1559591808"
      blend="soft-light"
    />
    <Card
      src="https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=502327"
    />
    <Card src="https://mtgrocks.com/wp-content/uploads/2022/06/Mise.jpg" />
  </section>

  <section style="width: 130px; margin: auto">
    <Card src="https://mtgrocks.com/wp-content/uploads/2022/06/Mise.jpg" />
  </section>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 50px 2vw;
  transform-style: preserve-3d;
  /* height: 100%; */
  max-width: 1200px;
  margin: auto;
  padding: 50px;
  position: relative;
}

.card-grid.active {
  z-index: 99;
}

@media screen and (min-width: 900px) {
  .card-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media screen and (max-width: 900px) {
  :global(.card-grid > .card) {
    --row: 1;
    grid-column: 1;
    grid-row: var(--row);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  :global(.card-grid > .card:nth-child(1n)) {
    position: relative;
    left: -50px;
    top: 10px;
    z-index: calc(var(--card-scale) * 2 + 10);
    transform: translate3d(0, 0, 0.1px) rotateZ(-5deg);
    opacity: 1;
  }
  :global(.card-grid > .card:nth-child(2n)) {
    left: 0px;
    top: -10px;
    z-index: calc(var(--card-scale) * 2 + 8);
    transform: translate3d(0, 0, 0.1px) rotateZ(0deg);
    opacity: 0.99;
  }
  :global(.card-grid > .card:nth-child(3n)) {
    left: 50px;
    top: 0px;
    z-index: calc(var(--card-scale) * 2 + 6);
    transform: translate3d(0, 0, 0.1px) rotateZ(5deg);
    opacity: 0.99;
  }
  :global(.card-grid > .card.interacting),
  :global(.card-grid > .card.active) {
    opacity: 1;
  }

  :global(.card-grid > .card:nth-child(n + 4):nth-child(-n + 6)) {
    grid-row: 2;
  }
  :global(.card-grid > .card:nth-child(n + 7):nth-child(-n + 9)) {
    grid-row: 3;
  }
  :global(.card-grid > .card:nth-child(n + 10):nth-child(-n + 12)) {
    grid-row: 4;
  }
  :global(.card-grid > .card:nth-child(n + 13):nth-child(-n + 15)) {
    grid-row: 5;
  }
  :global(.card-grid > .card:nth-child(n + 16):nth-child(-n + 18)) {
    grid-row: 6;
  }
  :global(.card-grid > .card:nth-child(n + 19)) {
    grid-row: auto;
    grid-column: auto;
    transform: none !important;
    left: 0 !important;
    top: 0 !important;
  }
}

@media screen and (min-width: 600px) and (max-width: 900px) {
  .card-grid {
    max-width: 420px;
    margin: auto;
  }
  :global(.card-grid > .card:nth-child(1n)) {
    left: -100px;
    top: 10px;
    transform: translate3d(0, 0, 0.1px) rotateZ(-5deg);
  }
  :global(.card-grid > .card:nth-child(2n)) {
    left: 0px;
    top: -10px;
    transform: translate3d(0, 0, 0.1px) rotateZ(0deg);
  }
  :global(.card-grid > .card:nth-child(3n)) {
    left: 100px;
    top: 0px;
    transform: translate3d(0, 0, 0.1px) rotateZ(5deg);
  }
}
</style>
