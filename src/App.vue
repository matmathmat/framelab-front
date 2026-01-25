<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app-container">
    <Header />
    
    <main>
      <RouterView /> 
    </main>

    <Footer />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@300;400;500&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

:root {
  --bg-sand: #F9F5F0;
  --bg-warm: #E6DCD3;
  --text-dark: #2A221E;
  --text-light: #F9F5F0;
  --text-muted: #6B5B52;
  --accent-gold: #C69C6D;
  --accent-terracotta: #A85A3F;
  
  --font-serif: 'Cormorant Garamond', serif;
  --font-sans: 'Montserrat', sans-serif;
}

@font-face {
  font-family: 'Magilio';
  src: url('../fonts/Magilio.ttf') format('truetype'),
    url('../fonts/MagilioDEMO.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  background-color: var(--bg-sand);
  color: var(--text-dark);
  font-family: var(--font-sans);
  overflow-x: hidden;
}

.btn-pill {
  display: inline-block;
  padding: 0.8rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 1px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-dark {
  background: var(--text-dark);
  color: var(--bg-sand);
  border: 1px solid var(--text-dark);
}
.btn-dark:hover {
  background: transparent;
  color: var(--text-dark);
}

.btn-light {
  background: var(--bg-sand);
  color: var(--text-dark);
}
.btn-light:hover {
  background: var(--text-dark);
  color: var(--bg-sand);
}

.section-title {
  font-family: 'Magilio';
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 400;
}
.section-title span { 
  color: rgb(252, 198, 188);
}
</style>