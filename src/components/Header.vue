<template>
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
</template>

<style scoped>
.header {
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 2rem 0;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  max-width: 1400px;
  padding: 0 2rem;
}

.nav {
  display: flex;
  gap: 3rem;
  white-space: nowrap;
}

.nav-link {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: opacity 0.2s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.nav-link:hover {
  opacity: 0.7;
}

.header-line {
  height: 2px;
  background-color: white;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>