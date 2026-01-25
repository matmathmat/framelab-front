<script setup>
import heroBg from '@/assets/images/landingpage/herosection/background.png'
import bgMain from '@/assets/images/landingpage/herosection/cardmain.png'
import card1 from '@/assets/images/landingpage/herosection/card1.png'
import card2 from '@/assets/images/landingpage/herosection/card2.png'
</script>

<template>
    <section id="hero" :style="{
        backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(198, 156, 109, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(168, 90, 63, 0.05) 0%, transparent 50%),
            url(${heroBg})
        `
    }">
        <div class="hero-container">

            <div class="hero-text-side">
                <h1 class="hero-title">
                    Capturez la <br>
                    <span>Vraie Beauté</span>
                </h1>
                <p class="hero-sub">
                    Rejoignez le collectif FrameLab. Sublimez vos clichés bruts et révélez votre signature artistique.
                </p>
                <a href="#story" class="btn-pill btn-dark">Découvrir</a>
            </div>

            <div class="visual-grid">
                <div class="floating-text">Art.</div>
                <img :src="bgMain" class="image-card img-main" alt="Main Card">
                <img :src="card1" class="image-card img-detail-1" alt="Card 1">
                <img :src="card2" class="image-card img-detail-2" alt="Card 2">
            </div>

        </div>
    </section>
</template>

<style scoped>
@font-face {
  font-family: 'Magilio';
  src: url('../fonts/Magilio.ttf') format('truetype'),
    url('../fonts/MagilioDEMO.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

#hero {
    min-height: 100vh;
    width: 100%;
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    padding: 0 5%;
    padding-top: 80px;
}

.hero-container {
    display: grid;
    grid-template-columns: 40% 55%;
    gap: 5%;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    align-items: center;
}

.hero-text-side {
    z-index: 10;
}

.hero-title {
    font-family: 'Magilio';
    font-size: 4.5rem;
    line-height: 1;
    font-weight: 300;
    margin-bottom: 1.5rem;
    color: white;
}

.hero-title span {
    color: rgb(252, 198, 188);
}

.hero-sub {
    font-size: 1.1rem;
    font-weight: 300;
    margin-bottom: 2.5rem;
    color: white;
    line-height: 1.6;
    max-width: 500px;
    border-left: 2px solid rgb(252, 198, 188);
    padding-left: 1.5rem;
}

.visual-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
    height: 600px;
    position: relative;
}

.image-card {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    filter: sepia(10%) contrast(1.05);
    transition: all 0.5s ease;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.image-card:hover {
    transform: scale(1.02);
    z-index: 20;
    filter: sepia(0);
}

.img-main {
    grid-column: 3 / 11;
    grid-row: 2 / 12;
    z-index: 1;
    border: 4px solid var(--bg-sand);
}

.img-detail-1 {
    grid-column: 1 / 5;
    grid-row: 8 / 13;
    z-index: 3;
    border: 4px solid var(--bg-sand);
}

.img-detail-2 {
    grid-column: 9 / 13;
    grid-row: 1 / 5;
    z-index: 1;
    border: 4px solid var(--bg-sand);
}

.floating-text {
    position: absolute;
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 6rem;
    color: rgba(0, 0, 0, 0.05);
    z-index: 0;
    top: 5%;
    right: 0;
    pointer-events: none;
}

.btn-pill {
    display: inline-block;
    padding: 0.9rem 2.2rem;
    border-radius: 999px;

    color: rgb(252, 198, 188);
    border: 1.5px solid rgb(252, 198, 188);
    background: transparent;

    font-size: 0.9rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;

    transition: all 0.3s ease;
}

.btn-pill:hover {
    background: rgb(252, 198, 188);
    color: #1a1a1a;
}

@media (max-width: 1024px) {
    .hero-container {
        grid-template-columns: 1fr;
    }

    .visual-grid {
        height: 400px;
        margin-top: 3rem;
    }

    .img-detail-1 {
        display: none;
    }

    .img-main {
        grid-column: 2 / 12;
    }
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 3rem;
    }
}
</style>