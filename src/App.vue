<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const showFooter = computed(() => route.path === '/')
const isHomePage = computed(() => route.path === '/')
const isAboutPage = computed(() => route.path === '/about')
</script>

<template>
  <div class="container" :class="{ 'home-layout': isHomePage, 'about-layout': isAboutPage }">
    <Header />
    
    <main v-if="isAboutPage" class="main-content">
      <router-view />
    </main>
    
    <router-view v-else />
    
    <Footer/>
  </div>
</template>

<style scoped>
.container {
  background-color: rgb(240, 238, 233);
  display: flex;
  flex-direction: column;
}

.container.home-layout {
  height: 100vh;
  overflow: hidden;
}

.container.about-layout {
  height: auto;
  min-height: 100vh;
  overflow: visible;
}

.container.about-layout .main-content {
  flex: 1;
  overflow-y: auto;
}
</style>