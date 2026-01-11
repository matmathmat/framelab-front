<script setup>
import mainImage from '../assets/images/mainImage.png'
</script>

<template>
  <main class="main-content">
    <div class="image-fullscreen">
      <img :src="mainImage" alt="Photo par Meris sur Unsplash" />
      <div class="overlay-text">
        <div>Capturez</div>
        <div>la vraie beauté</div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@font-face {
  font-family: 'Magilio';
  src: url('../fonts/Magilio.ttf') format('truetype'),
    url('../fonts/MagilioDEMO.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.main-content {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.image-fullscreen {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-fullscreen::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px);
  background-size: 4px 4px;
  pointer-events: none;
  opacity: 0.3;
  z-index: 1;
}

.image-fullscreen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: contrast(1.15) brightness(0.95);
}

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 200px;
  font-weight: bold;
  font-family: 'Magilio';
  color: white;
  text-align: center;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  z-index: 2;
  width: 100%;
  line-height: 1;
}
</style>