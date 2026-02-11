<footer>
  <div class="footer-grid">
    
    <div class="footer-col border-right">
      <span class="col-title">Explorer</span>
      <nav class="footer-nav">
        <a href="#hero">Accueil</a>
        <a href="#challenges">Challenges</a>
        <a href="#hall-of-frames">Hall of Frames</a>
        <a href="https://framelab.shop">Shop</a>
      </nav>
    </div>

    <div class="footer-col border-right">
      <span class="col-title">Légal</span>
      <nav class="footer-nav">
        <a href="/mentions">Mentions Légales</a>
        <a href="/cgu">CGU</a>
        <a href="/privacy">Confidentialité</a>
      </nav>
    </div>

    <div class="footer-col brand-col">
      <div class="brand-name">FRAMELAB<span class="tm">©</span></div>
      <p class="tagline">Capturez la vraie beauté.</p>
      <div class="copyright">
        © 2026 FrameLab Inc. <br> Tous droits réservés.
      </div>
    </div>
  </div>
  
  <div class="footer-bar">
    Designed for creators.
  </div>
</footer>

<style>
  :global(:root) {
    --bg-cream: #FFFDF5;
    --border-thick: 3px solid #121212;
    --font-head: 'Sora', sans-serif;
    --color-green: #23C55E;
  }

  footer {
    background-color: var(--bg-cream);
    color: #121212;
    border-top: var(--border-thick);
    font-family: var(--font-head);
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1.5fr;
    max-width: 100%;
  }

  .footer-col {
    padding: 3rem;
    display: flex;
    flex-direction: column;
  }

  .border-right {
    border-right: var(--border-thick);
  }

  .col-title {
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    background: #121212;
    color: #FFF;
    display: inline-block;
    padding: 5px 10px;
    align-self: flex-start;
  }

  .footer-nav {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .footer-nav a {
    text-decoration: none;
    color: #121212;
    font-weight: 600;
    font-size: 1.1rem;
    text-transform: uppercase;
    transition: color 0.2s;
    width: fit-content;
  }

  .footer-nav a:hover {
    background-color: var(--color-green);
    color: #121212;
    box-shadow: 4px 4px 0 #121212;
    border: 1px solid #121212;
    transform: translate(-2px, -2px);
  }

  /* Colonne Marque */
  .brand-col {
    background-color: #fae469;
    border-left: var(--border-thick);
    justify-content: space-between;
  }

  .brand-name {
    font-size: 3rem;
    font-weight: 800;
    letter-spacing: -2px;
    line-height: 1;
    margin-bottom: 1rem;
  }

  .tm {
    font-size: 1rem;
    vertical-align: top;
  }

  .tagline {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    margin-bottom: 2rem;
  }

  .copyright {
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .footer-bar {
    background-color: #121212;
    color: #FFF;
    text-align: center;
    padding: 0.5rem;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 2px;
    font-weight: 700;
  }
</style>