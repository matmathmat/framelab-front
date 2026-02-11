<footer>
  <div class="footer-content">
    <div class="footer-links">
      <a href="#">Mentions Légales</a>
      <a href="#">CGU</a>
      <a href="#">Confidentialité</a>
    </div>
    <div class="footer-brand">
      FRAMELAB
      <span class="footer-copyright">© 2026 FrameLab</span>
    </div>
    <div class="footer-links">
      <a href="#hero">Accueil</a>
      <a href="#challenges">Challenges</a>
      <a href="#boutique">Shop</a>
    </div>
  </div>
</footer>

<style>
  footer {
    background-color: #1a1a1a;
    color: #888;
    padding: 4rem 5%;
    font-size: 0.8rem;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .footer-brand {
    color: white;
    font-family: var(--font-serif);
    font-size: 1.5rem;
    letter-spacing: 1px;
    text-align: center;
  }
  
  .footer-copyright {
    display: block;
    font-family: var(--font-sans);
    font-size: 0.7rem;
    color: #555;
    margin-top: 5px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .footer-links a {
    color: #888;
    text-decoration: none;
    margin: 0 1rem;
    transition: color 0.3s;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.7rem;
  }
  
  .footer-links a:hover {
    color: white;
  }
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      gap: 2rem;
      text-align: center;
    }
    
    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>