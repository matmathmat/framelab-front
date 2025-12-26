// router.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import Shop from './views/Shop.vue'
import Challenges from './views/Challenges.vue'
import HallOfFrames from './views/HallOfFrames.vue'
import Contact from './views/Contact.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/challenges', name: 'Challenges', component: Challenges },
  { path: '/hall-of-frames', name: 'HallOfFrames', component: HallOfFrames },
  { path: '/contact', name: 'Contact', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router