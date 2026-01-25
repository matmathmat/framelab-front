<script setup>
import HeroSection from './HeroSection.vue'
import StorySection from './StorySection.vue'
import ChallengesSection from './ChallengesSection.vue'
import HallOfFramesSection from './HallOfFramesSection.vue'
import ShopSection from './ShopSection.vue'
import ContactSection from './ContactSection.vue'
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