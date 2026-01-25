<template>
    <section id="boutique">
        <div class="boutique-overlay"></div>
        <div class="boutique-box">
            <h2 class="section-title shop-title">La <span>Boutique</span></h2>
            <p class="shop-desc">Découvrez les appareils photo, accessoires et tirages d'art Framelab.</p>
            <a href="https://framelab.shop" class="btn-pill btn-light">Visiter le Shop</a>
        </div>
    </section>
</template>

<style scoped>
#boutique {
    padding: 8rem 5%;
    background-image: url('@/assets/images/landingpage/shopsection/overlay.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.boutique-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.boutique-box {
    position: relative;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 4rem 6rem;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
}

.shop-title {
    color: white;
    margin-bottom: 1rem;
}

.shop-desc {
    margin-bottom: 2rem;
}
</style>