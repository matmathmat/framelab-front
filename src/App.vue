<script setup>
import mainImage from './assets/images/mainImage.jpg'
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="header-content">
        <nav class="nav">
          <router-link to="/" class="nav-link">FrameLab</router-link>
          <router-link to="/shop" class="nav-link">Boutique</router-link>
          <router-link to="/challenges" class="nav-link">Challenges</router-link>
          <router-link to="/hall-of-frames" class="nav-link">Hall of Frames</router-link>
          <router-link to="/about" class="nav-link">A propos</router-link>          
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </nav>
        <div class="header-line"></div>
      </div>
    </header>

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

    <footer class="footer">
      <div class="footer-line"></div>
      <div class="footer-text">2026 By FrameLab All right reserved.</div>
    </footer>
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

.header {
  height: 10vh;
  display: flex;
  align-items: flex-end;
  padding-left: 2rem;
  padding-bottom: 0;
  flex-shrink: 0;
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
}

.nav {
  display: flex;
  gap: 1.5rem;
  white-space: nowrap;
}

.nav-link {
  font-size: 0.875rem;
  font-weight: bold;
  color: black;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}

.header-line {
  height: 2px;
  background-color: black;
  flex: 1;
}

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

.footer {
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 2rem;
  flex-shrink: 0;
}

.footer-line {
  height: 2px;
  background-color: black;
  width: 90%;
}

.footer-text {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
