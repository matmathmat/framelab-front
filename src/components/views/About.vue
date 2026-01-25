<script setup>
import { ref, onMounted } from 'vue';

import aboutUsBg from '../assets/images/aboutus.png';
import img0_0 from '../assets/images/aboutus_col_0_0.png';
import img0_1 from '../assets/images/aboutus_col_0_1.png';
import img0_2 from '../assets/images/aboutus_col_0_2.png';
import img1_0 from '../assets/images/aboutus_col_1_0.png';
import img1_1 from '../assets/images/aboutus_col_1_1.png';
import img1_2 from '../assets/images/aboutus_col_1_2.png';
import img2_0 from '../assets/images/aboutus_col_2_0.png';
import img2_1 from '../assets/images/aboutus_col_2_1.png';
import img2_2 from '../assets/images/aboutus_col_2_2.png';

const col1Images = [img0_0, img0_1, img0_2];
const col2Images = [img1_0, img1_1, img1_2];
const col3Images = [img2_0, img2_1, img2_2];

const textSectionBg = aboutUsBg;

const col1Ref = ref(null);
const col2Ref = ref(null);
const col3Ref = ref(null);

let autoScroll = 0;
const autoScrollSpeed = 0.6;

const updateScroll = () => {
  autoScroll += autoScrollSpeed;
  const speed = 0.35;

  if (col1Ref.value && col2Ref.value && col3Ref.value) {
    const col1Height = col1Ref.value.scrollHeight;
    const col2Height = col2Ref.value.scrollHeight;
    const col3Height = col3Ref.value.scrollHeight;

    const scroll1 = (autoScroll * speed) % col1Height;
    const scroll2 = (autoScroll * speed) % col2Height;
    const scroll3 = (autoScroll * speed) % col3Height;

    col1Ref.value.style.transform = `translateY(-${scroll1}px)`;
    col2Ref.value.style.transform = `translateY(${scroll2}px)`;
    col3Ref.value.style.transform = `translateY(-${scroll3}px)`;
  }

  requestAnimationFrame(updateScroll);
};

const scrollToBottom = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  });
};

onMounted(() => {
  updateScroll();
});
</script>

<template>
  <div class="scroll-container">

    <div class="hero-section">
      <div class="ui-layer">

        <div class="mission-container">
          <p class="sub-text">
            Notre mission est simple : célébrer la beauté sous toutes ses formes et encourager chaque photographe,
            amateur ou professionnel.
          </p>
          <div class="scroll-button-wrapper" @click="scrollToBottom">
            <span class="arrow-icon">↓</span>
          </div>
        </div>

        <h1 class="main-title">
          À propos
        </h1>

      </div>

      <div class="gallery-wrapper">
        <div class="gallery-grid">
          <div class="col" ref="col1Ref">
            <div v-for="(img, index) in [...col1Images, ...col1Images]" :key="index" class="image-item">
              <img :src="img" alt="Gallery Image" />
            </div>
          </div>
          <div class="col center-col" ref="col2Ref">
            <div v-for="(img, index) in [...col2Images, ...col2Images]" :key="index" class="image-item">
              <img :src="img" alt="Gallery Image" />
            </div>
          </div>
          <div class="col" ref="col3Ref">
            <div v-for="(img, index) in [...col3Images, ...col3Images]" :key="index" class="image-item">
              <img :src="img" alt="Gallery Image" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-section" :style="{ backgroundImage: `url(${textSectionBg})` }">
      <div class="text-overlay"></div>
      <div class="text-content">
        <p>
          Chez FrameLab, nous croyons que la photographie est bien plus qu'un art : c'est une expérience,
          une émotion capturée dans chaque image. Depuis notre création, nous nous consacrons à offrir aux
          passionnés de photographie le meilleur du matériel haut de gamme et des événements exclusifs où
          créativité et inspiration se rencontrent.
        </p>
        <p>
          Pour nourrir cette passion et renforcer les liens de notre communauté, nous proposons un
          <strong>challenge photo hebdomadaire</strong>. Chaque semaine, un thème et une photo imposée sont
          partagés, invitant nos membres à laisser libre cours à leur créativité. Les retouches et interprétations
          sont ensuite mises en lumière sur notre plateforme web communautaire.
        </p>
        <p>
          FrameLab, c'est donc plus qu'une entreprise : c'est un espace où la technique rencontre l'esthétique,
          où chaque image raconte une histoire, et où chaque photographe trouve sa place au sein d'une communauté
          passionnée et engagée.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Manrope:wght@300;400;600&display=swap');

@font-face {
  font-family: 'Magilio';
  src: url('../fonts/Magilio.ttf') format('truetype'),
    url('../fonts/MagilioDEMO.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.scroll-container {
  min-height: 200vh;
  background-color: #faf9f9; 
  color: #ffffff;
  font-family: 'Manrope', sans-serif;
  overflow-x: hidden;
}

.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.ui-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
}

.mission-container {
  position: absolute;
  top: 55%;
  left: 8%;
  width: 300px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  pointer-events: auto;
  text-align: left;
}

.sub-text {
  font-size: 1.2rem;
  line-height: 1.5;
  color: #ffffff;
  margin: 0;
  font-weight: 500;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
}

.scroll-button-wrapper {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  animation: bounce 2s infinite;
}

.arrow-icon {
  font-size: 3rem;
  color: #ffffff;
  line-height: 1;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.8);
}

.main-title {
  position: absolute;
  bottom: 5%;
  right: 5%;
  font-family: 'Magilio';
  font-size: 10vw;
  line-height: 1;
  font-weight: 400;
  color: #ffffff;
  margin: 0;
  pointer-events: auto;
  text-align: right;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.8);
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.gallery-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  backdrop-filter: none;
  pointer-events: none;
  z-index: 4;
}

.gallery-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px);
  background-size: 4px 4px;
  pointer-events: none;
  opacity: 0.1;
  z-index: 6;
}

.gallery-grid {
  display: flex;
  gap: 2vw;
  transform: rotate(-15deg) scale(1.5);
  width: 120vw;
  height: 150vh;
  justify-content: center;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 2vw;
  width: 25vw;
  will-change: transform;
}

.center-col {
  margin-top: -30vh;
}

.image-item {
  width: 691px;
  height: 461px;
  position: relative;
  overflow: hidden;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
}

.image-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px);
  background-size: 4px 4px;
  background-color: transparent;
  backdrop-filter: none;
  pointer-events: none;
  opacity: 0.1;
  z-index: 1;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: contrast(1.05) brightness(1.05); 
  transition: filter 0.3s;
}

.text-section {
  min-height: 100vh;
  background-color: #111111;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  position: relative;
}

.text-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px);
  background-size: 4px 4px;
  pointer-events: none;
  opacity: 0.1;
  z-index: 1;
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent; 
  z-index: 1;
}

.text-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  color: #ffffff;
  font-size: 1.2rem;
  line-height: 1.8;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.9);
}

.text-content p {
  margin-bottom: 2rem;
  text-align: justify;
}

.text-content strong {
  font-weight: 600;
  color: #ffffff;
}
</style>