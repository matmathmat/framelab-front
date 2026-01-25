<template>
    <section id="hall-of-frames">
        <h2 class="section-title">Hall of <span>Frames</span></h2>

        <div class="hof-grid">
            <div class="hof-card grid-bronze">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop"
                    alt="Portrait Bronze">
                <div class="hof-content">
                    <div class="hof-badge bronze-text">III. Bronze</div>
                    <div class="hof-user">Par @Julie_Art</div>
                </div>
            </div>

            <div class="hof-card grid-silver">
                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop"
                    alt="Portrait Silver">
                <div class="hof-content">
                    <div class="hof-badge silver-text">II. Argent</div>
                    <div class="hof-user">Par @Marc_Edit</div>
                </div>
            </div>

            <div class="hof-card grid-gold">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop"
                    alt="Portrait Gold">
                <div class="hof-content gold-content">
                    <div class="hof-badge gold-text">I. Or</div>
                    <div class="hof-user editor-week">L'Éditeur de la Semaine : @Sarah_Vision</div>
                    <a href="#" class="profile-link">Voir le profil</a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
#hall-of-frames {
    padding: 6rem 5%;
}

.hof-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 400px 500px;
    gap: 1.5rem;
}

.hof-card {
    position: relative;
    overflow: hidden;
    border-radius: 4px;
}

.hof-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.hof-card:hover img {
    transform: scale(1.05);
}

.hof-content {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    color: white;
    z-index: 2;
}

.hof-badge {
    font-family: var(--font-serif);
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.hof-user {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.8;
}

.grid-bronze {
    grid-column: 1;
    grid-row: 1;
}

.grid-silver {
    grid-column: 2;
    grid-row: 1;
}

.grid-gold {
    grid-column: 1 / span 2;
    grid-row: 2;
}

.bronze-text {
    color: #Ecdbb0;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.silver-text {
    color: #f2f2f2;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.gold-text {
    color: #FFD700;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    font-size: 3rem;
}

.gold-content {
    bottom: 3rem;
    left: 3rem;
}

.editor-week {
    font-size: 1.2rem;
}

.profile-link {
    color: white;
    margin-top: 10px;
    display: inline-block;
    text-decoration: underline;
}

@media (max-width: 768px) {
    .hof-grid {
        display: flex;
        flex-direction: column;
        height: auto;
    }

    .hof-card {
        height: 300px;
    }

    .grid-gold {
        height: 400px;
    }
}
</style>