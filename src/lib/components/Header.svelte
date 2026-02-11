<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  let isScrolled = false;
  let isLoggedIn = false;

  const handleScroll = () => {
    if (browser) {
      isScrolled = window.scrollY > 20;
    }
  };

  onMount(() => {
    if (browser) {
      window.addEventListener('scroll', handleScroll);
      // Vérifier l'authentification ici
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        alert("Vous allez être déconnecté");
        isLoggedIn = false;
        goto('/');
      } else {
        alert("Une erreur est survenue lors de la déconnexion.");
      }
    } catch (e) {
      console.error(e);
    }
  };
</script>

<header class:scrolled={isScrolled}>
  <div class="header-container">
    <a href="/" class="logo">
      FrameLab<span class="dot">.</span>
    </a>

    <nav class="nav-links">
      {#if !isLoggedIn}
        <!-- Non connecté -->
        <a href="/#challenges" class="nav-item">Challenges</a>
        <a href="/#hall-of-frames" class="nav-item">Hall of Frames</a>
        <a href="/#boutique" class="nav-item">Boutique</a>
        <a href="/#contact" class="nav-item">Contact</a>
        <a href="/login" class="cta-neo">Mon Compte</a>
      {:else}
        <!-- Est connecté -->
        <a href="/challenges" class="nav-item">Challenges</a>
        <a href="/hall-of-frames" class="nav-item">Hall of Frames</a>
        <a href="https://framelab.shop" class="nav-item">Boutique</a>
        <a href="/contact" class="nav-item">Contact</a>
        <div class="user-actions">
          <a href="/me" class="nav-item user-link">Mon Espace</a>
          <button class="cta-neo logout" on:click={handleLogout}>Sortir</button>
        </div>
      {/if}
    </nav>
  </div>
</header>

<style>
  :global(:root) {
    --bg-cream: #FFFDF5;
    --border-thick: 3px solid #121212;
    --shadow-hard: 4px 4px 0px 0px #121212;
    --color-pink: #FF90E8;
    --font-head: 'Sora', sans-serif;
    --font-body: 'Inter', sans-serif;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: var(--bg-cream);
    border-bottom: var(--border-thick);
    transition: all 0.3s ease;
    padding: 0;
  }

  header.scrolled {
    box-shadow: 0 10px 0 rgba(0,0,0,0.1);
  }

  .header-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.2rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-family: var(--font-head);
    font-size: 1.8rem;
    font-weight: 800;
    text-transform: uppercase;
    color: #121212;
    text-decoration: none;
    letter-spacing: -1px;
    position: relative;
    padding: 5px 10px;
    border: 3px solid transparent;
    transition: 0.2s;
  }

  .logo:hover {
    background: var(--color-pink);
    border: var(--border-thick);
    box-shadow: var(--shadow-hard);
    transform: translate(-2px, -2px);
  }

  .dot {
    color: var(--color-pink);
    font-size: 2.5rem;
    line-height: 0;
  }

  .logo:hover .dot { color: #121212; }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .nav-item {
    text-decoration: none;
    color: #121212;
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.9rem;
    text-transform: uppercase;
    position: relative;
    padding: 5px 0;
  }

  .nav-item::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-pink);
    z-index: -1;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  .nav-item:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }

  .cta-neo {
    background-color: #121212;
    color: #fff;
    font-family: var(--font-head);
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    padding: 0.8rem 1.5rem;
    border: 2px solid #121212;
    box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
    transition: all 0.2s ease;
    cursor: pointer;
    font-size: 0.8rem;
    margin-left: 1rem;
    display: inline-block;
  }

  .cta-neo:hover {
    background-color: var(--color-pink);
    color: #121212;
    box-shadow: 2px 2px 0 #121212;
    transform: translate(2px, 2px);
  }

  .cta-neo.logout {
    background-color: #fff;
    color: #121212;
    box-shadow: 4px 4px 0 #121212;
  }
  .cta-neo.logout:hover {
    background-color: #ff4d4d;
    color: #fff;
  }

  .user-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
</style>