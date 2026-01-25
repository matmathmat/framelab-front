<script setup>
import { ref, onMounted } from 'vue';
import WaitingRoom from './WaitingRoom.vue';

const props = defineProps({
    challengeId: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['back']);

const participations = ref([]);
const currentParticipation = ref(null);
const userId = ref(null);
const isLoading = ref(true);
const queueIndex = ref(0);
const isFinished = ref(false);

const creativityNote = ref(3);
const technicNote = ref(3);
const respectNote = ref(3);

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const token = getCookie('token');

const fetchUser = async () => {
    try {
        const response = await fetch('/api/users/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        userId.value = data.result.id;
    } catch (e) {
        console.error("Erreur user", e);
    }
};

const loadNextVotableParticipation = async () => {
    isLoading.value = true;
    currentParticipation.value = null;

    // Si on a parcouru tout le tableau initial
    if (queueIndex.value >= participations.value.length) {
        isFinished.value = true;
        isLoading.value = false;
        return;
    }

    const candidate = participations.value[queueIndex.value];

    // On n'affiche que les participations visible et qui ne sont pas de l'utilisateur
    if (!candidate.isVisible || candidate.user.userId === userId.value) {
        queueIndex.value++;
        await loadNextVotableParticipation();
        return;
    }

    // Code bricoller à cause du backend qui a beaucoup de limitation
    // il faudra refaire les requetes api
    try {
        console.log("2");
        // On vérifie que l'utilisateur n'a pas déjà voté pour cette participation
        const response = await fetch(`/api/votes?participationId=${candidate.id}&userId=${userId.value}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const data = await response.json();

            // On récupère le tableau ou un tableau vide par défaut
            const votesList = data.result || [];

            // On vérifie si mon userId est présent dans l'un des votes de la liste
            const hasAlreadyVoted = votesList.some(vote => vote.user && vote.user.id === userId.value);

            if (!hasAlreadyVoted) {
                // L'utilisateur n'a pas voté donc j'affiche la page de vote
                currentParticipation.value = candidate;
                creativityNote.value = 3;
                technicNote.value = 3;
                respectNote.value = 3;

                isLoading.value = false;
            } else {
                // L'utilisateur a voté je passe aux suivants
                queueIndex.value++;
                await loadNextVotableParticipation();
            }
        } else {
            // Si l'API renvoie une erreur on skip
            console.error("Erreur API", response.status);
            queueIndex.value++;
            await loadNextVotableParticipation();
        }
    } catch (error) {
        console.error("Erreur check vote", error);
        queueIndex.value++;
        await loadNextVotableParticipation();
    }
};

onMounted(async () => {
    await fetchUser();

    if (!userId.value) return;

    try {
        // On récupère toutes les participations du challenge
        // Ici il y a un problème qui faudra corriger plus tard
        // On force la page 1 car le code back end a été mal fait, 
        // il n'est pas capable de nous retourner le nombre de page maximum
        const response = await fetch(`/api/participations?challengeId=${props.challengeId}&selectedPage=1`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            // On lance la recherche du premier candidat valide
            const data = await response.json();
            console.log(data.result);
            participations.value = Array.isArray(data) ? data : (data.result || []);
            await loadNextVotableParticipation();
        }
    } catch (e) {
        console.error("Erreur fetch participations", e);
    }
});

const handleIgnore = () => {
    queueIndex.value++;
    loadNextVotableParticipation();
};

const handleVote = async () => {
    if (!currentParticipation.value) return;

    const body = {
        participationId: currentParticipation.value.id,
        creativityNote: creativityNote.value,
        technicNote: technicNote.value,
        respectNote: respectNote.value,
        userId: userId.value
    };

    try {
        // On envoie une requete pour voter
        const response = await fetch('/api/votes', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            // Vote réussi, on passe au suivant
            queueIndex.value++;
            loadNextVotableParticipation();
        } else {
            alert("Une erreur est survenue lors du vote.");
        }
    } catch (e) {
        console.error(e);
    }
};

</script>

<template>
    <WaitingRoom v-if="isFinished" mode="no-votes" @back="$emit('back')" />

    <div v-else class="white-card">
        <div class="card-header">
            <button class="back-btn" @click="$emit('back')">← Retour</button>
            <div class="line-deco"></div>
            <span class="subtitle">JE VOTE</span>
        </div>

        <div v-if="isLoading" class="loading">Recherche de participations...</div>

        <div v-else-if="currentParticipation" class="vote-content">

            <div class="photo-frame">
                <img :src="currentParticipation.photoUrl" alt="Participation" />
                <div class="author-info">
                    Par {{ currentParticipation.user.firstname }} {{ currentParticipation.user.lastname }}
                </div>
            </div>

            <div class="sliders-section">
                <div class="slider-group">
                    <label>Créativité ({{ creativityNote }}/5)</label>
                    <input type="range" v-model.number="creativityNote" min="1" max="5" step="1">
                </div>
                <div class="slider-group">
                    <label>Technique ({{ technicNote }}/5)</label>
                    <input type="range" v-model.number="technicNote" min="1" max="5" step="1">
                </div>
                <div class="slider-group">
                    <label>Respect du thème ({{ respectNote }}/5)</label>
                    <input type="range" v-model.number="respectNote" min="1" max="5" step="1">
                </div>
            </div>

            <p class="warning-text">
                Attention : Une fois validé, vous ne pouvez ni annuler ni modifier votre vote. Prenez le temps de bien
                noter.
            </p>

            <div class="actions">
                <button class="btn-primary" @click="handleVote">Voter</button>
                <button class="btn-secondary" @click="handleIgnore">Ignorer ></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.white-card {
    background-color: #ffffff;
    padding: 3rem;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;
}

.card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    width: 100%;
}

.back-btn {
    border: none;
    background: none;
    cursor: pointer;
    font-family: var(--font-sans, 'Montserrat', sans-serif);
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #888;
    transition: color 0.3s;
}

.back-btn:hover {
    color: #222;
}

.line-deco {
    flex-grow: 1;
    height: 1px;
    background-color: #eee;
}

.subtitle {
    font-family: var(--font-sans, 'Montserrat', sans-serif);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #666;
}

.photo-frame {
    width: 100%;
    margin-bottom: 2rem;
    text-align: center;
}

.photo-frame img {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    background-color: #f9f9f9;
    border: 1px solid #eee;
}

.author-info {
    margin-top: 0.5rem;
    font-family: 'Magilio', serif;
    font-size: 1.1rem;
    color: #333;
}

.sliders-section {
    width: 100%;
    margin-bottom: 2rem;
}

.slider-group {
    margin-bottom: 1rem;
}

.slider-group label {
    display: block;
    font-family: var(--font-sans, 'Montserrat', sans-serif);
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 1px;
}

input[type=range] {
    width: 100%;
    accent-color: #222;
    cursor: pointer;
}

.warning-text {
    font-family: var(--font-sans, 'Montserrat', sans-serif);
    font-size: 0.75rem;
    color: #999;
    font-style: italic;
    margin-bottom: 1.5rem;
    line-height: 1.4;
}

.actions {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
}

.btn-primary,
.btn-secondary {
    padding: 1rem 2rem;
    font-family: var(--font-sans, 'Montserrat', sans-serif);
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
}

.btn-primary {
    background-color: #222;
    color: #fff;
    border: 1px solid #222;
}

.btn-primary:hover {
    background-color: #444;
    border-color: #444;
}

.btn-secondary {
    background-color: transparent;
    color: #888;
    border: 1px solid #ddd;
}

.btn-secondary:hover {
    border-color: #222;
    color: #222;
}

.loading {
    text-align: center;
    padding: 2rem;
    font-family: var(--font-sans, sans-serif);
    color: #666;
}

@media (max-width: 768px) {
    .white-card {
        padding: 1.5rem;
    }

    .actions {
        flex-direction: column;
    }
}
</style>