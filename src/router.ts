import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/views/home/Home.vue' 
import Login from './components/views/login/Login.vue'
import ChallengePage from './components/views/challenge/ChallengePage.vue' 
import MyAccount from './components/views/MyAccount.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/challenges', name: 'Challenge', component: ChallengePage },
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