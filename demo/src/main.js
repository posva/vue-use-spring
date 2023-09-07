import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import CardHoverDemo from './views/CardHoverDemo.vue'
import PlayableCardsDemo from './views/PlayableCardsDemo.vue'
import MovingDotDemo from './views/MovingDotDemo.vue'
import ListDemo from './views/ListDemo.vue'
import UseSpring from './views/UseSpring.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/card-hover', component: CardHoverDemo },
    { path: '/playable-cards', component: PlayableCardsDemo },
    { path: '/moving-dot', component: MovingDotDemo },
    { path: '/list', component: ListDemo },
    { path: '/use-spring', component: UseSpring },
  ],
})

let app = createApp(App)
app.use(router)
app.mount('#app')
