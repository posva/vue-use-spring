<template>
  <section>
    <button @click="shuffle">Shuffle</button>
    <SpringGroup tag="div" class="content">
      <div v-for="item in items" :key="item" class="item" :class="item">
        {{ item }}
      </div>
    </SpringGroup>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { shuffle } from 'lodash-es'
import { SpringGroup } from '../../../src'

export default defineComponent({
  components: { SpringGroup },
  setup() {
    const items = ref(['Ipsum', 'Lorem', 'Dolor', 'Sit'])

    return {
      items,
      shuffle() {
        items.value = shuffle(items.value)
      },
    }
  },
})
</script>

<style scoped>
.content {
  /* position: relative; */
  width: 320px;
  margin: auto;
}

.content > .item {
  /* position: absolute; */
  /* transform-origin: 50% 50% 0px; */
  margin: 1rem 0;
  width: 320px;
  height: 90px;
  border-radius: 5px;
  color: white;
  line-height: 90px;
  padding-left: 32px;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
  touch-action: none;
}

.Lorem {
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
}
.Ipsum {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
.Dolor {
  background: linear-gradient(135deg, #5ee7df 0%, #b490ca 100%);
}
.Sit {
  background: linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%);
}
</style>
