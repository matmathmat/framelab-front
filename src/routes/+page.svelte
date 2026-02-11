<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Sora:wght@400;600;800&display=swap" rel="stylesheet">
</svelte:head>

<script>
  // Import images
  import heroMain from '$lib/assets/images/landingpage/herosection/cardmain.png';
  import heroFloat1 from '$lib/assets/images/landingpage/herosection/card1.png';
  import heroFloat2 from '$lib/assets/images/landingpage/herosection/card2.png';
  import imgPassion from '$lib/assets/images/landingpage/storysection/card1.png';
  import imgTech from '$lib/assets/images/landingpage/storysection/card2.png';
  import imgCommunity from '$lib/assets/images/landingpage/storysection/card3.png';
  import imgPolaroidRaw from '$lib/assets/images/landingpage/challengesection/card1.png';
  import imgPolaroidEdit from '$lib/assets/images/landingpage/challengesection/card2.png';   
</script>

<main class="neo-wrapper">
  
  <!-- Section Hero -->
  <section class="container section-hero">
    <div class="hero-content">
      <span class="eyebrow">CREATEUR D'INSPIRATION</span>
      <h1>
        Capturez la <br>
        <span class="highlight-text">Vraie Beauté.</span>
      </h1>
      <p class="subtitle">
        Rejoignez le collectif FrameLab. Sublimez vos clichés<br>et révélez votre signature artistique.
      </p>

      <div class="cta-group">
        <a href="#join" class="btn-primary">Découvrir</a>
        <a href="#challenges" class="btn-outline">Le Challenge</a>
      </div>
    </div>

    <div class="hero-visuals">
       <div class="img-stack">
          <img src={heroMain} class="img-hero main-img" alt="Main Visual">
          <img src={heroFloat1} class="img-hero float-1" alt="Detail 1">
          <img src={heroFloat2} class="img-hero float-2" alt="Detail 2">
       </div>
    </div>
  </section>

  <!-- Section Qui sommes nous -->
  <section class="container section-values">
    <!-- La passion -->
    <div class="card card-pink">
      <div class="card-img-top">
        <img src={imgPassion} alt="Passion">
      </div>
      <div class="card-content">
        <span class="card-label">NOTRE ADN</span>
        <h3>La Passion</h3>
        <p>La photographie est une expérience. Nous offrons le meilleur du matériel et des événements exclusifs.</p>
      </div>
    </div>

    <!-- La technique -->
    <div class="card card-green">
      <div class="card-img-top">
        <img src={imgTech} alt="Technique">
      </div>
      <div class="card-content">
        <span class="card-label">COMPÉTITION</span>
        <h3>La Technique</h3>
        <p>Challenge photo hebdomadaire : un thème, une photo brute imposée. Vos retouches mises en lumière.</p>
      </div>
    </div>

    <!-- La communauté -->
    <div class="card card-yellow">
      <div class="card-img-top">
        <img src={imgCommunity} alt="Communauté">
      </div>
      <div class="card-content">
        <span class="card-label">RÉSEAU</span>
        <h3>La Communauté</h3>
        <p>Un espace où la technique rencontre l'esthétique. Chaque photographe trouve sa place ici.</p>
      </div>
    </div>
  </section>

  <!-- Section engagement -->
  <section class="container section-engagement">   
    <!-- Challenge hebdomadaire -->
    <div class="card large-card challenge-card">
      <div class="challenge-text">
        <span class="card-label">CHALLENGE HEBDOMADAIRE</span>
        <h3>Le défi</h3>
        
        <div class="rules-block">
          <div class="step">1. Téléchargez l'app FrameLab</div>
          <div class="step">2. Récupérez le fichier RAW</div>
          <div class="step">3. Postez votre EDIT</div>
        </div>
        
        <a href="/" class="btn-primary btn-small">Participer</a>
      </div>
      
      <div class="challenge-duo-visual">
        <!-- RAW IMAGE-->
         <div class="polaroid-wrapper raw-pos">
            <span class="tag-label tag-raw">RAW</span>
            <img src={imgPolaroidRaw} alt="Photo brute" class="square-img">
         </div>

         <!-- EDIT IMAGE -->
         <div class="polaroid-wrapper edit-pos">
            <span class="tag-label tag-edit">EDIT</span>
            <img src={imgPolaroidEdit} alt="Photo éditée" class="square-img">
         </div>
      </div>
    </div>

    <!-- Hall of frames -->
    <div class="card large-card hof-card">
      <div class="hof-header">
        <span class="eyebrow">HALL OF FRAMES</span>
        <h3 class="text-black">Les Champions</h3>
      </div>

      <div class="list-content">
        <!-- #1 Gold -->
        <div class="winner-item">
          <span class="rank-square gold-bg">1</span> 
          <div class="name-wrapper">
             <span class="name underline-gold">@Sarah_Vision</span>
             <span class="points">980 pts</span>
          </div>
        </div>

        <!-- #2 Silver -->
        <div class="winner-item">
          <span class="rank-square silver-bg">2</span> 
          <div class="name-wrapper">
            <span class="name underline-silver">@Julie_Art</span>
            <span class="points">850 pts</span>
          </div>
        </div>

        <!-- #3 Bronze -->
        <div class="winner-item">
          <span class="rank-square bronze-bg">3</span> 
          <div class="name-wrapper">
            <span class="name underline-bronze">@Marc_Edit</span>
            <span class="points">720 pts</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section Boutique -->
  <section class="section-shop">
    <div class="bg-pattern"></div>
    <div class="shop-card">
      <h2>La Boutique</h2>
      <p>Découvre nos Appareils, accessoires et tirages d'art.</p>

      <!-- On redirige vers google car on n'a pas de boutique -->
      <a href="https://google.com" class="btn-white">Visiter la boutique</a>
    </div>
  </section>

  <!-- Section Contact -->
  <section class="section-contact" id="contact">
    <div class="container contact-wrapper">
      <h2 class="big-text text-white">Let's Talk.</h2>
      <div class="contact-action">
        <p>Une question ou une collab ?</p>
        <a href="mailto:hello@framelab.com" class="btn-primary">Envoyer un message</a>
      </div>
    </div>
  </section>

</main>

<style>
  :global(:root) {
    --bg-cream: #FFFDF5;
    --text-black: #121212;
    --color-pink: #FF90E8;
    --color-green: #23C55E;
    --color-custom-pink: rgb(250, 112, 215);
    --color-electric-yellow: #fae469;
    --color-lilac: #C4A1FF;
    --color-gold: #FFD700;
    --color-silver: #C0C0C0;
    --color-bronze: #CD7F32;
    --border-thick: 3px solid #121212;
    --shadow-hard: 6px 6px 0px 0px #121212;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    background-color: var(--bg-cream);
    color: var(--text-black);
    font-family: 'Inter', sans-serif;
    border-radius: 0;
    background-image: radial-gradient(#121212 1px, transparent 1px);
    background-size: 40px 40px;
  }

  h1, h2, h3, .big-text {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    margin: 0;
    letter-spacing: -0.02em;
    text-transform: uppercase;
  }

  p {
    line-height: 1.6;
    font-weight: 500;
    margin-top: 0.5rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  .neo-wrapper {
    padding-top: 4rem;
  }

  .eyebrow, .card-label, .tag-label {
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
    color: #000;
    display: inline-block;
    border: 2px solid #000;
    box-shadow: 3px 3px 0 #000;
    border-radius: 0;
  }

  .eyebrow { 
    background-color: var(--color-custom-pink); 
    padding: 4px 8px; 
    margin-bottom: 1rem; 
  }

  .card-label {
    background-color: var(--color-custom-pink);
    padding: 4px 8px;
    margin-bottom: 1rem;
  }

  .btn-primary, .btn-outline, .btn-white {
    text-decoration: none;
    font-weight: 700;
    padding: 1rem 2rem;
    border: 3px solid #000;
    font-family: 'Sora', sans-serif;
    text-transform: uppercase;
    display: inline-block;
    transition: all 0.2s;
    border-radius: 0;
  }

  .btn-primary {
    background-color: #000;
    color: #FFF;
    box-shadow: 4px 4px 0 rgba(0,0,0,0.3);
  }
  .btn-primary:hover {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 rgba(0,0,0,0.3);
  }

  .btn-outline {
    background-color: #FFF;
    color: #000;
    box-shadow: 4px 4px 0 #000;
  }
  .btn-outline:hover {
    background-color: var(--color-custom-pink);
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 #000;
  }

  .btn-white {
    background-color: white;
    color: #121212;
    box-shadow: 5px 5px 0 #000;
  }

  .section-hero {
    margin-bottom: 3rem;
    
    display: flex;
    align-items: center;
    gap: 3rem;
  }

  .hero-content { flex: 1; }
  
  .hero-visuals { 
    flex: 1; 
    height: 500px; 
    position: relative; 
    display: flex; 
    align-items: center; 
    justify-content: center;
    margin-top: 40px; 
  }

  .section-hero h1 {
    font-size: 4rem;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }

  .section-hero .highlight-text {
    font-style: italic;
    background: linear-gradient(180deg, transparent 60%, var(--color-custom-pink) 60%);
    display: inline-block;
    padding: 0 5px;
  }

  .subtitle {
    font-size: 1.25rem;
    margin-bottom: 2.5rem;
    border-left: 5px solid #000;
    padding-left: 1rem;
  }

  .cta-group { display: flex; gap: 1.5rem; }

  .img-stack { position: relative; width: 100%; height: 100%; }
  
  .img-hero {
    position: absolute;
    border: 3px solid #000; 
    box-shadow: var(--shadow-hard);
    object-fit: cover;
    border-radius: 0;
  }
  
  .main-img { 
    width: 65%; 
    z-index: 2; 
    left: 15%; 
    top: 15%; 
    transform: rotate(-2deg); 
    border: 4px solid rgb(112, 176, 250);
  }
  
  .float-1 { 
    width: 40%; 
    top: 55%; 
    left: 0; 
    z-index: 3; 
    transform: rotate(5deg); 
    border: 4px solid rgb(255, 62, 78);
  }
  
  .float-2 { 
    width: 35%; 
    top: 5%; 
    right: 5%; 
    z-index: 1; 
    transform: rotate(8deg); 
    border: 4px solid rgb(142, 252, 69);
  }

  .card {
    border: var(--border-thick);
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-hard);
    transition: transform 0.2s;
    overflow: hidden;
    border-radius: 0;
  }
  .card:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 #000; }

  .section-values {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 6rem;
  }
  
  .card-img-top { height: 200px; border-bottom: var(--border-thick); }
  .card-img-top img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transition: 0.3s; }
  .card:hover .card-img-top img { filter: grayscale(0%); }
  .card-content { padding: 1.5rem; }

  .section-engagement {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 6rem;
  }
  
  .large-card { padding: 2.5rem; background-color: #FFF; }
  .large-card h3 { font-size: 2rem; margin-bottom: 1.5rem; }

  .challenge-card {
    background-color: var(--color-lilac);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    overflow: visible;
  }
  .challenge-text { flex: 1; z-index: 2; }
  
  .rules-block {
    margin: 1.5rem 0;
    background-color: #FFF;
    border: var(--border-thick);
    padding: 1.5rem;
    box-shadow: 5px 5px 0 #000;
  }
  .step { font-weight: 700; margin-bottom: 0.8rem; font-size: 0.95rem; }
  .btn-small { padding: 0.8rem 1.5rem; font-size: 0.9rem; }

  .challenge-duo-visual {
    flex: 1;
    position: relative;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .polaroid-wrapper {
    position: absolute;
    width: 160px;
    background: white;
    border: 3px solid #000;
    padding: 10px 10px 25px 10px;
    box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
    transition: transform 0.3s;
  }
  .polaroid-wrapper:hover { z-index: 10; transform: scale(1.05); }

  .square-img { width: 100%; height: auto; display: block; border: 1px solid #000; }

  .raw-pos { 
    transform: rotate(-10deg) translate(-20px, 10px); 
    z-index: 1; 
  }
  .edit-pos { 
    transform: rotate(8deg) translate(20px, -10px); 
    z-index: 2; 
  }

  .tag-label {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    padding: 3px 10px;
    z-index: 5;
    background: #FFF;
  }
  .tag-raw { background-color: #ccc; }
  .tag-edit { background-color: var(--color-green); }

  .hof-card {
    background-color: var(--color-electric-yellow);
    border: var(--border-thick);
  }
  
  .hof-header { margin-bottom: 1.5rem; }
  .text-white { color: #FFF; text-shadow: 2px 2px 0 #000; }
  .white-label { background: #FFF; color: #000; }

  .list-content { display: flex; flex-direction: column; gap: 1rem; }
  
  .winner-item {
    display: flex;
    align-items: center;
    background: #FFF;
    border: var(--border-thick);
    padding: 1rem;
    box-shadow: 4px 4px 0 #000;
    border-radius: 0;
  }
  
  .rank-square {
    width: 30px; height: 30px; 
    border: 2px solid #000; color: #000;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; margin-right: 15px;
    border-radius: 0;
  }
  .gold-bg { background: var(--color-gold); }
  .silver-bg { background: var(--color-silver); }
  .bronze-bg { background: var(--color-bronze); }
  
  .name-wrapper { flex: 1; display: flex; justify-content: space-between; align-items: center; }
  .name { font-weight: 700; font-size: 1.1rem; }
  .points { font-size: 0.9rem; font-weight: 600; color: #555; }

  .underline-gold { border-bottom: 4px solid var(--color-gold); }
  .underline-silver { border-bottom: 4px solid var(--color-silver); }
  .underline-bronze { border-bottom: 4px solid var(--color-bronze); }

  .section-shop {
    position: relative;
    padding: 6rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: var(--color-green);
    border-top: var(--border-thick);
  }

  .bg-pattern {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background-size: cover;
    opacity: 0.15;
    z-index: 1;
  }

  .shop-card {
    position: relative;
    z-index: 2;
    background: var(--color-green);
    padding: 4rem 6rem;
    border: var(--border-thick);
    box-shadow: 10px 10px 0 #121212;
    text-align: center;
    max-width: 600px;
    width: 100%;
    border-radius: 0;
  }

  .shop-card h2 { margin-bottom: 1rem; font-size: 2.5rem; }
  .shop-card p { margin-bottom: 2rem; font-size: 1.2rem; }

  .section-contact {
    padding: 6rem 0;
    background: #121212;
    color: white;
  }

  .contact-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .big-text {
    font-size: 6rem;
    line-height: 1;
  }
  
  .text-pink {
    color: var(--color-custom-pink);
  }

  .contact-action p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: var(--bg-cream);
  }
</style>