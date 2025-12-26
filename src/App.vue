<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const showFooter = computed(() => route.path === '/')
</script>

<template>
  <div class="container">
    <Header />
    
    <router-view />
    
    <Footer v-if="showFooter" />
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  background-color: rgb(240, 238, 233);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>