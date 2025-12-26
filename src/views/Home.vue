<script setup>
import mainImage from '../assets/images/mainImage.jpg'
</script>

<template>
  <main class="main-content">
    <div class="left-panel">
      <div class="main-title">FrameLab</div>
    </div>

    <div class="right-panel">
      <div class="image-rectangle">
        <div class="image-wrapper">
          <img :src="mainImage" alt="Main image" />
          <div class="image-overlay">
            Photo par&nbsp;
            <a href="https://unsplash.com/@martzzl" target="_blank" rel="noopener noreferrer">Marcel Strauß</a>
            &nbsp;sur&nbsp;
            <a href="https://unsplash.com/fr/photos/DN08A8Br6rM" target="_blank" rel="noopener noreferrer">Unsplash</a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main-content {
  flex: 1;
  display: flex;
  gap: 2rem;
  padding-right: calc(9.8%);
  min-height: 0;
}

.left-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-title {
  font-size: 4rem;
  font-weight: bold;
}

.right-panel {
  flex: 1;
  display: flex;
  align-items: stretch;
  margin-top: -10px;
  min-height: 0;
}

.image-rectangle {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: all 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 1rem;
}

.image-wrapper:hover img {
  filter: brightness(0.5);
}

.image-wrapper:hover .image-overlay {
  opacity: 1;
}
</style>