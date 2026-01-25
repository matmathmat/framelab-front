<template>
    <section id="challenges">
        <div class="challenge-layout">

            <div class="challenge-mosaic">
                <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop"
                    class="mosaic-img m-img-1" alt="Landscape Raw">
                <img src="https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=2000&auto=format&fit=crop"
                    class="mosaic-img m-img-2" alt="Photographer">
                <img src="https://images.unsplash.com/photo-1515541356284-a16ae37227eb?q=80&w=500&auto=format&fit=crop"
                    class="mosaic-img m-img-3" alt="Abstract">
            </div>

            <div class="challenge-info">
                <h2 class="section-title title-align-left">Le Challenge <br><span>Hebdomadaire</span></h2>
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
}

/* MOSAIQUE */
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
}

.m-img-2 {
    width: 55%;
    height: 60%;
    bottom: 0;
    right: 0;
    z-index: 2;
    border: 5px solid #EBE5DE;
}

.m-img-3 {
    width: 30%;
    height: auto;
    aspect-ratio: 1/1;
    top: 40%;
    left: 60%;
    z-index: 3;
    transform: translate(-50%, -50%);
    border: 3px solid #fff;
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