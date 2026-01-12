<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
</script>

<template>
  <div class="container">
    <Header />
    
    <main class="main-content">
      <router-view />
    </main>
    
    <Footer/>
  </div>
</template>

<style scoped>
.container {
  background-color: rgb(240, 238, 233);
  display: flex;
  flex-direction: column;
}
</style>