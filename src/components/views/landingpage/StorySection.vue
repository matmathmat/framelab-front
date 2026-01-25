<template>
    <section id="story">
        <h2 class="section-title">L'Histoire de <span>FrameLab</span></h2>

        <div class="story-grid">
            <div class="story-card">
                <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop"
                    alt="Camera Lens">
                <div class="story-text">La Passion</div>
            </div>
            <div class="story-card">
                <img src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2574&auto=format&fit=crop"
                    alt="Editing Process">
                <div class="story-text">La Technique</div>
            </div>
            <div class="story-card">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
                    alt="Community">
                <div class="story-text">La Communauté</div>
            </div>
        </div>

        <p class="story-description">
            Chez FrameLab, la photographie est une expérience émotionnelle. Nous offrons le meilleur du matériel et des
            événements exclusifs où créativité et inspiration se rencontrent.
            <br><br>
            Notre cœur bat au rythme du <strong>challenge hebdomadaire</strong> : une photo imposée, votre vision, et
            une communauté pour la sublimer. FrameLab est l'espace où la technique rencontre l'esthétique.
        </p>
    </section>
</template>

<style scoped>
#story {
    padding: 6rem 5%;
    text-align: center;
}

.story-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 3rem;
}

.story-card img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 1rem;
    filter: sepia(0.1);
}

.story-text {
    font-family: var(--font-serif);
    font-size: 1.5rem;
    color: var(--text-dark);
}

.story-description {
    margin-top: 3rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.8;
    font-size: 1.1rem;
    color: var(--text-muted);
}

@media (max-width: 768px) {
    .story-grid {
        grid-template-columns: 1fr;
    }
}
</style>