<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// On configure la communication entre composant enfant et parent
const emit = defineEmits(['participate', 'vote']);

// Props reçues depuis le composant parent
const props = defineProps({
    challenge: {
        type: Object,
        required: true
    }
});

const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });
let timerInterval = null;

const calculateTimeLeft = () => {
    // Timestamp actuel (en millisecondes)
    const now = new Date().getTime();

    // Timestamp de la date de fin du challenge
    const end = new Date(props.challenge.endDate).getTime();

    // Différence entre la date de fin et maintenant
    const distance = end - now;

    // Si la date de fin est dépassée, on arrête le timer pour éviter temps négatif
    if (distance < 0) {
        clearInterval(timerInterval);
        return;
    }

    // Conversion du temps restant en jours, heures, minutes et secondes
    timeLeft.value = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
};

onMounted(() => {
    // Raffraichit automatiquement le timer
    calculateTimeLeft();
    timerInterval = setInterval(calculateTimeLeft, 1000);
});

onUnmounted(() => {
    if (timerInterval) clearInterval(timerInterval);
});

const formattedDate = computed(() => {
    return new Date(props.challenge.endDate).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
});
</script>

<template>
    <div class="white-card">
        <div class="card-header">
            <span class="subtitle">CHALLENGE ACTUEL</span>
            <div class="line-deco"></div>
        </div>

        <h1 class="title">{{ challenge.titleTheme }}</h1>
        
        <p class="description">{{ challenge.descriptionTheme }}</p>

        <div class="timer-section">
            <div class="countdown">
                <div class="time-block">
                    <span class="number">{{ timeLeft.days }}</span>
                    <span class="label">Jours</span>
                </div>
                <div class="sep">:</div>
                <div class="time-block">
                    <span class="number">{{ timeLeft.hours.toString().padStart(2, '0') }}</span>
                    <span class="label">Heures</span>
                </div>
                <div class="sep">:</div>
                <div class="time-block">
                    <span class="number">{{ timeLeft.minutes.toString().padStart(2, '0') }}</span>
                    <span class="label">Min</span>
                </div>
            </div>
            <p class="end-date">Fin le {{ formattedDate }}</p>
        </div>

        <div class="actions">
            <button class="btn-primary" @click="$emit('participate')">Je Participe +</button>
            <button class="btn-secondary" @click="$emit('vote')">Je Vote</button>
        </div>

        <div class="footer-link">
            <a href="/archives" class="archive-link">Voir les anciens challenges</a>
        </div>
    </div>
</template>

<style scoped>
.white-card {
    background-color: #ffffff;
    padding: 3.5rem;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    position: relative;
    z-index: 10;
}

.card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.line-deco {
    width: 40px;
    height: 1px;
    background-color: #8c8c8c;
}

.subtitle {
    font-family: var(--font-sans, 'Montserrat', sans-serif);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #666;
}

.title {
    font-family: 'Magilio', serif;
    font-size: 3.5rem;
    line-height: 1.1;
    color: #222;
    margin-bottom: 1.5rem;
    font-weight: normal;
}

.description {
    font-family: var(--font-sans, 'Montserrat', sans-serif);
    color: #555;
    line-height: 1.8;
    margin-bottom: 2.5rem;
    font-size: 0.95rem;
}

.timer-section {
    margin-bottom: 2.5rem;
    width: 100%;
}

.countdown {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    font-family: 'Magilio', serif;
    font-size: 2rem;
    color: #333;
    margin-bottom: 0.5rem;
}

.time-block {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.time-block .number {
    line-height: 1;
}

.time-block .label {
    font-family: var(--font-sans, 'Montserrat', sans-serif);
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #888;
    margin-top: 5px;
}

.sep {
    color: #ccc;
    font-size: 1.5rem;
    transform: translateY(-10px);
}

.end-date {
    font-family: var(--font-sans, 'Montserrat', sans-serif);
    font-size: 0.8rem;
    color: #888;
    font-style: italic;
}

.actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.btn-primary {
    background-color: #222;
    color: #fff;
    border: 1px solid #222;
    padding: 1rem 2rem;
    font-family: var(--font-sans, 'Montserrat', sans-serif);
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background-color: transparent;
    color: #222;
}

.btn-secondary {
    background-color: transparent;
    color: #222;
    border: 1px solid #222;
    padding: 1rem 2rem;
    font-family: var(--font-sans, 'Montserrat', sans-serif);
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background-color: #222;
    color: #fff;
}

.footer-link {
    width: 100%;
    padding-top: 1rem;
    border-top: 1px solid #eee;
}

.archive-link {
    font-family: var(--font-sans, 'Montserrat', sans-serif);
    font-size: 0.85rem;
    color: #888;
    text-decoration: none;
    transition: color 0.3s;
}

.archive-link:hover {
    color: #222;
    text-decoration: underline;
}

@media (max-width: 768px) {
    .white-card {
        padding: 2rem;
        align-items: center;
        text-align: center;
    }
    
    .card-header {
        justify-content: center;
    }

    .title {
        font-size: 2.5rem;
    }

    .countdown {
        justify-content: center;
    }

    .actions {
        justify-content: center;
        width: 100%;
    }
}
</style>