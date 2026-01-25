import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/views/Home.vue' 
import Login from './components/views/Login.vue'
import Challenges from './components/views/Challenges.vue' 
import MyAccount from './components/views/MyAccount.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  }
})

export default router