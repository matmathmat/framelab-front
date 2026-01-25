<script setup>
import { ref, onMounted, computed } from 'vue';
import waitingBg from '@/assets/images/challenge/waitingbackground.png';
import ActiveChallenge from './ActiveChallenge.vue';
import WaitingRoom from './WaitingRoom.vue';

const currentChallenge = ref(null);
const isLoading = ref(true);
const hasChallenge = ref(false);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

onMounted(async () => {
  const token = getCookie('token');

  // Si l'utilisateur n'est pas connecté on le redirige vers l'accueil
  if (!token) {
    window.location = '/';
    return;
  }

  // Si l'utilisateur est connecté on récupère le challenge en cours
  try {
    const response = await fetch('/api/challenges/current', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      // Il y a un challenge en cours, on l'affiche
      const data = await response.json();
      currentChallenge.value = data.result || data;
      hasChallenge.value = true;
    } else if (response.status === 404) {
      // Il n'y a pas de challenge en cours, on affiche la salle d'attente
      hasChallenge.value = false;
    }
  } catch (error) {
    // Si erreur on affiche l'erreur
    alert(error);
  } finally {
    // Fin du chargemet
    isLoading.value = false;
  }
});

const backgroundImage = computed(() => {
  // Si y'a un challenge on récupère l'image du challenge
  if (hasChallenge.value && currentChallenge.value?.photoUrl) {
    return `url(${currentChallenge.value.photoUrl})`;
  }

  // Sinon on affiche l'image d'attente
  return `url(${waitingBg})`;
});

const handleParticipate = () => {
  // To do
};

const handleVote = () => {
  // To do
};
</script>

<template>
  <main class="page-container" :style="{ backgroundImage: backgroundImage }">
    <div class="dark-overlay"></div>

    <div v-if="!isLoading" class="content-wrapper">
      <!-- On délègue la tache aux composants enfants -->
      <ActiveChallenge v-if="hasChallenge" :challenge="currentChallenge" @participate="handleParticipate"
        @vote="handleVote" />
      <WaitingRoom v-else />
    </div>
  </main>
</template>

<style>
@font-face {
  font-family: 'Magilio';
  src: url('../fonts/Magilio.ttf') format('truetype');
}

.page-container {
  min-height: 100vh;
  width: 100%;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10%;
}

.dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .page-container {
    justify-content: center;
    padding: 20px;
  }

  .content-wrapper {
    justify-content: center;
  }
}
</style>