<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  let isScrolled = false;
  let isLoggedIn = false;

  const handleScroll = () => {
    if (browser) {
      isScrolled = window.scrollY > 50;
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

      console.log(response);

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
  <a href="/" class="logo" style="text-decoration:none;">FrameLab</a>

  <nav class="nav-links">
    {#if !isLoggedIn}
      <!-- Non connecté -->
      <a href="/#challenges" class="nav-item">Challenges</a>
      <a href="/#hall-of-frames" class="nav-item">Hall of Frames</a>
      <a href="/#boutique" class="nav-item">Boutique</a>
      <a href="/#contact" class="nav-item">Contact</a>
      <a href="/login" class="cta-header">Mon Compte</a>
    {:else}
      <!-- Est connecté -->
      <a href="/challenges" class="nav-item">Challenges</a>
      <a href="/hall-of-frames" class="nav-item">Hall of Frames</a>
      <a href="https://framelab.shop" class="nav-item">Boutique</a>
      <a href="/contact" class="nav-item">Contact</a>
      <a href="/me" class="cta-header">Mon Espace</a>
      <button class="cta-header" on:click={handleLogout}>Se déconnecter</button>
    {/if}
  </nav>
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 1.5rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    background: rgba(249, 245, 240, 0.95);
    transition: padding 0.3s, box-shadow 0.3s;
  }

  header.scrolled {
    padding: 1rem 3rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  }

  .logo {
    font-family: var(--font-serif);
    font-size: 1.8rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--text-dark);
  }

  .nav-links {
    display: flex;
    gap: 2.5rem;
    align-items: center;
  }

  .nav-links a.nav-item {
    text-decoration: none;
    color: var(--text-dark);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
  }

  .nav-links a.nav-item::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--accent-terracotta);
    transition: width 0.3s;
  }

  .nav-links a.nav-item:hover::after {
    width: 100%;
  }

  .cta-header {
    border: 1px solid var(--text-dark);
    padding: 0.6rem 1.8rem;
    border-radius: 50px;
    text-decoration: none;
    color: var(--text-dark);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
    transition: all 0.3s ease;
    margin-left: 2rem;
    background: transparent;
    cursor: pointer;
  }

  .cta-header:hover {
    background: var(--text-dark);
    color: var(--bg-sand);
  }

  button.cta-header {
    font-family: inherit;
  }

  @media (max-width: 768px) {
    header {
      padding: 1rem;
      flex-direction: column;
      gap: 1rem;
    }

    .nav-links {
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .cta-header {
      margin-left: 0;
    }
  }
</style>