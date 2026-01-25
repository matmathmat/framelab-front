<template>
    <div class="white-card">
        <div class="card-header">
            <span class="subtitle">PROCHAINEMENT</span>
            <div class="line-deco"></div>
        </div>

        <h1 class="title">Un nouveau défi.</h1>
        
        <p class="description">
            Le jury délibère sur les créations précédentes ou le prochain thème est en cours de préparation. 
            <br>Revenez vite pour découvrir votre prochain défi.
        </p>

        <div class="actions">
            <a href="/archives" class="btn-primary">Voir les anciens challenges</a>
        </div>
    </div>
</template>

<style scoped>
.white-card {
    background-color: #ffffff;
    padding: 3.5rem;
    max-width: 550px;
    width: 100%;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
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

.actions {
    margin-top: 1rem;
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
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background-color: transparent;
    color: #222;
}

@media (max-width: 768px) {
    .white-card {
        padding: 2rem;
        align-items: center;
        text-align: center;
    }
    .card-header { justify-content: center; }
}
</style>