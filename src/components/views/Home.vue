<script setup>
import HeroSection from './landingpage/HeroSection.vue'
import StorySection from './landingpage/StorySection.vue'
import ChallengesSection from './landingpage/ChallengesSection.vue'
import HallOfFramesSection from './landingpage/HallOfFramesSection.vue'
import ShopSection from './landingpage/ShopSection.vue'
import ContactSection from './landingpage/ContactSection.vue'
</script>

<template>
  <div>
    <HeroSection />
    <StorySection />
    <div id="challenges"><ChallengesSection /></div>
    <div id="hall-of-frames"><HallOfFramesSection /></div>
    <div id="boutique"><ShopSection /></div>
    <div id="contact"><ContactSection /></div>
  </div>
</template>