<script setup>
import card1 from '@/assets/images/landingpage/storysection/card1.png'
import card2 from '@/assets/images/landingpage/storysection/card2.png'
import card3 from '@/assets/images/landingpage/storysection/card3.png'
</script>

<template>
    <section id="story">
        <h2 class="section-title">Qui sommes-nous ?</h2>
        
        <div class="story-container">
            <div class="story-row">
                <div class="story-image">
                    <img :src="card1" alt="La Passion">
                </div>
                <div class="story-content">
                    <h3 class="story-subtitle">La Passion</h3>
                    <p>
                        Chez FrameLab, nous croyons que la photographie est bien plus qu'un art : c'est une expérience,
                        une émotion capturée dans chaque image. Depuis notre création, nous nous consacrons à offrir aux
                        passionnés de photographie le meilleur du matériel haut de gamme et des événements exclusifs où
                        créativité et inspiration se rencontrent.
                    </p>
                </div>
            </div>

            <div class="story-row">
                <div class="story-image">
                    <img :src="card2" alt="La Technique">
                </div>
                <div class="story-content">
                    <h3 class="story-subtitle">La Technique</h3>
                    <p>
                        Pour nourrir cette passion et renforcer les liens de notre communauté, nous proposons un
                        <strong>challenge photo hebdomadaire</strong>. Chaque semaine, un thème et une photo imposée sont
                        partagés, invitant nos membres à laisser libre cours à leur créativité. Les retouches et interprétations
                        sont ensuite mises en lumière sur notre plateforme web communautaire.
                    </p>
                </div>
            </div>

            <div class="story-row">
                <div class="story-image">
                    <img :src="card3" alt="La Communauté">
                </div>
                <div class="story-content">
                    <h3 class="story-subtitle">La Communauté</h3>
                    <p>
                        FrameLab, c'est donc plus qu'une entreprise : c'est un espace où la technique rencontre l'esthétique,
                        où chaque image raconte une histoire, et où chaque photographe trouve sa place au sein d'une communauté
                        passionnée et engagée.
                    </p>
                </div>
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

#story {
    padding: 6rem 5%;
    background-color: #fff;
}

.section-title {
    font-family: 'Magilio';
    text-align: center;
    margin-bottom: 4rem;
    font-size: 2.5rem;
    color: rgb(252, 198, 188);
}

.story-container {
    display: flex;
    flex-direction: column;
    gap: 6rem;
    max-width: 1200px;
    margin: 0 auto;
}

.story-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
}

.story-row:nth-child(even) {
    flex-direction: row-reverse;
}

.story-image {
    flex: 1;
    width: 100%;
}

.story-image img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    filter: sepia(0.1);
    display: block;
}


.story-content {
    flex: 1;
    text-align: left;
}

.story-subtitle {
    font-family: 'Magilio';
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: rgb(252, 198, 188);
}

.story-content p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-muted, #666);
    margin-bottom: 1rem;
}

@media (max-width: 900px) {
    .story-row, 
    .story-row:nth-child(even) {
        flex-direction: column;
        gap: 2rem;
        text-align: center;
    }

    .story-content {
        text-align: center;
    }
    
    .story-image img {
        height: 300px;
    }
}
</style>