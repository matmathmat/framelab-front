<script setup>
import card1 from '@/assets/images/landingpage/challengesection/card1.png'
import card2 from '@/assets/images/landingpage/challengesection/card2.png'
import card3 from '@/assets/images/landingpage/challengesection/card3.png'
</script>

<template>
    <section id="challenges">
        <div class="challenge-layout">

            <div class="challenge-mosaic">
                <img :src="card1"
                    class="mosaic-img m-img-1" alt="Landscape Raw">
                <img :src="card2"
                    class="mosaic-img m-img-2" alt="Photographer">
            </div>

            <div class="challenge-info">
                <h2 class="section-title title-align-left">Le Challenge <span>Hebdomadaire</span></h2>
                <p>
                    Chaque semaine, une nouvelle photo brute, une nouvelle opportunité. Téléchargez le fichier RAW,
                    appliquez votre style, et soumettez votre création.
                    Les meilleures retouches sont exposées et récompensées.
                </p>
                <a href="#" class="btn-pill btn-dark">Participer maintenant</a>
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

#challenges {
    padding: 8rem 5%;
    background: #EBE5DE;
    overflow: hidden;
}

.challenge-layout {
    display: flex;
    gap: 6rem;
    align-items: center;
}

.title-align-left {
    text-align: left;
    font-style: normal;
}

.title-align-left span {
    font-family: 'Magilio';
    color: rgb(252, 198, 188);
    font-style: normal;
}

.challenge-mosaic {
    flex: 1;
    position: relative;
    height: 600px;
    width: 100%;
}

.mosaic-img {
    position: absolute;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    transition: transform 0.5s ease;
}

.m-img-1 {
    width: 70%;
    height: 80%;
    top: 0;
    left: 0;
    z-index: 1;
    filter: grayscale(20%);
    border: 5px solid white
}

.m-img-2 {
    width: 55%;
    height: 60%;
    bottom: 0;
    right: 0;
    z-index: 2;
    border: 5px solid white;
}

.challenge-mosaic:hover .m-img-1 {
    transform: scale(0.98);
}

.challenge-mosaic:hover .m-img-2 {
    transform: scale(1.02) translate(-10px, -10px);
}

.challenge-info {
    flex: 1;
}

.challenge-info p {
    line-height: 1.6;
    margin-bottom: 2rem;
    color: var(--text-muted);
}

@media (max-width: 1024px) {
    .challenge-layout {
        flex-direction: column;
    }

    .challenge-mosaic {
        height: 400px;
        margin-bottom: 2rem;
    }
}
</style>