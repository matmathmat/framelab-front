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
</style>