<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const isScrolled = ref(false)
const isLoggedIn = ref(false)

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  const token = getCookie('token')
  if (token) {
    isLoggedIn.value = true
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleLogout = async () => {
  try {
    // On envoie une requete pour se déconnecter
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    console.log(response);

    if (response.ok) {
      // Déconnexion réussit, on supprime le cookie
      eraseCookie("token");

      alert("Vous allez être déconnecté");

      // On redirige maintenant vers l'accueil
      window.location.href = '/';
    } else {
      alert("Une erreur est survenue lors de la déconnexion.");
    }
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <header :class="{ scrolled: isScrolled }">
    <RouterLink to="/" class="logo" style="text-decoration:none;">FrameLab</RouterLink>

    <nav class="nav-links">

      <!-- Non connecté -->
      <template v-if="!isLoggedIn">
        <a href="/#challenges" class="nav-item">Challenges</a>
        <a href="/#hall-of-frames" class="nav-item">Hall of Frames</a>
        <a href="/#boutique" class="nav-item">Boutique</a>
        <a href="/#contact" class="nav-item">Contact</a>
        <RouterLink to="/login" class="cta-header">Mon Compte</RouterLink>
      </template>

      <!-- Est connecté -->
      <template v-else>
        <RouterLink to="/challenges" class="nav-item">Challenges</RouterLink>
        <RouterLink to="/hall-of-frames" class="nav-item">Hall of Frames</RouterLink>
        <a href="https://framelab.shop" class="nav-item">Boutique</a>
        <RouterLink to="/contact" class="nav-item">Contact</RouterLink>
        <RouterLink to="/me" class="cta-header">Mon Espace</RouterLink>
        <div class="cta-header" @click="handleLogout">Se déconnecter</div>
      </template>

    </nav>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  background: rgba(249, 245, 240, 0.95);
  transition: padding 0.3s, box-shadow 0.3s;
}

header.scrolled {
  padding: 1rem 3rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.logo {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-dark);
}

.nav-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.nav-links a.nav-item {
  text-decoration: none;
  color: var(--text-dark);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
}

.nav-links a.nav-item::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent-terracotta);
  transition: width 0.3s;
}

.nav-links a.nav-item:hover::after {
  width: 100%;
}

.cta-header {
  border: 1px solid var(--text-dark);
  padding: 0.6rem 1.8rem;
  border-radius: 50px;
  text-decoration: none;
  color: var(--text-dark);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-left: 2rem;
}

.cta-header:hover {
  background: var(--text-dark);
  color: var(--bg-sand);
}

@media (max-width: 768px) {
  header {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .cta-header {
    margin-left: 0;
  }
}
</style>