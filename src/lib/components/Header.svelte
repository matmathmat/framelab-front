<script>
  import { browser } from '$app/environment';
  import { onMount, onDestroy } from 'svelte';

  export let isLoggedIn = false;

  let isScrolled = false;
  let menuOpen = false;

  const handleScroll = () => {
    if (browser) {
      isScrolled = window.scrollY > 20;
    }
  };

  onMount(() => {
    if (browser) {
      window.addEventListener('scroll', handleScroll);
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
        
        // Forcer le rechargement pour mettre à jour la page
        window.location.href = '/';
      } else {
        alert("Une erreur est survenue lors de la déconnexion.");
      }

    } catch (e) {
      console.error(e);
    }
  };
</script>

<header 
  class="fixed top-0 left-0 right-0 z-[1000] bg-cream border-b-[3px] border-black transition-all duration-300 {isScrolled ? 'shadow-[0_10px_0_rgba(0,0,0,0.1)]' : ''}">
  <div class="max-w-[1400px] mx-auto py-5 px-8 flex items-center relative md:justify-between justify-center">

    <!-- Mobile : FrameLab + textes en dessous -->
    <div class="flex flex-col md:hidden items-center">
      <a 
        href="/" 
        class="font-sora text-3xl font-extrabold uppercase text-black no-underline -tracking-wider relative py-1.5 px-2.5 border-[3px] border-transparent group">
        FrameLab<span class="text-neo-pink text-[2.5rem] leading-[0] hidden md:inline">.</span>
      </a>
      <div class="flex gap-3 items-center px-2.5">
        {#if !isLoggedIn}
          <!-- Non connecté -->
          <a href="/login" class="text-black font-sora font-bold text-xs uppercase">Se connecter</a>
          <button on:click={() => menuOpen = !menuOpen} class="w-4 h-4 bg-neo-pink cursor-pointer border-none shrink-0"></button>
        {:else}
          <!-- Est connecté -->
          <a href="/me" class="text-black font-sora font-bold text-xs uppercase">Mon Espace</a>
          <button on:click={handleLogout} class="text-black font-sora font-bold text-xs uppercase cursor-pointer bg-transparent border-none p-0">Se déconnecter</button>
          <button on:click={() => menuOpen = !menuOpen} class="w-4 h-4 bg-neo-pink cursor-pointer border-none shrink-0"></button>
        {/if}
      </div>
    </div>

    <!-- Desktop : FrameLab seul -->
    <a 
      href="/" 
      class="hidden md:inline-block font-sora text-3xl font-extrabold uppercase text-black no-underline -tracking-wider relative py-1.5 px-2.5 border-[3px] border-transparent transition-all duration-200 hover:bg-neo-pink hover:border-black hover:shadow-neo-md hover:-translate-x-0.5 hover:-translate-y-0.5 group">
      FrameLab<span class="text-neo-pink text-[2.5rem] leading-[0] group-hover:text-black">.</span>
    </a>

    <nav class="hidden md:flex gap-8 items-center">
      {#if !isLoggedIn}
        <!-- Non connecté -->
        <a href="/#challenges" class="nav-link">Challenges</a>
        <a href="/hall-of-frames" class="nav-link">Hall of Frames</a>
        <a href="/#boutique" class="nav-link">Boutique</a>
        <a 
          href="/login" 
          class="bg-black text-white font-sora font-bold uppercase no-underline py-3 px-6 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,0.2)] transition-all duration-200 text-xs ml-4 inline-block hover:bg-neo-pink hover:text-black hover:shadow-[2px_2px_0_#121212] hover:translate-x-0.5 hover:translate-y-0.5">
          Se connecter
        </a>
      {:else}
        <!-- Est connecté -->
        <a href="/challenges" class="nav-link">Challenges</a>
        <a href="/hall-of-frames" class="nav-link">Hall of Frames</a>
        <a href="/#boutique" class="nav-link">Boutique</a>
        <div class="flex items-center gap-6">
          <a href="/me" class="nav-link">Mon Espace</a>
          <button 
            class="bg-white text-black font-sora font-bold uppercase py-3 px-6 border-2 border-black shadow-neo-md transition-all duration-200 cursor-pointer text-xs ml-4 inline-block hover:bg-red-500 hover:text-white hover:shadow-[2px_2px_0_#121212] hover:translate-x-0.5 hover:translate-y-0.5"
            on:click={handleLogout}>
            Se déconnecter
          </button>
        </div>
      {/if}
    </nav>
  </div>

  {#if menuOpen}
    <div class="md:hidden fixed inset-0 bg-black z-[999] flex flex-col items-center justify-center gap-8">
      <button 
        class="absolute top-6 right-8 text-neo-pink text-5xl font-extrabold leading-none"
        on:click={() => menuOpen = false}>×</button>

      {#if !isLoggedIn}
        <!-- Non connecté -->
        <a href="/#challenges" class="text-white font-sora font-extrabold text-2xl uppercase" on:click={() => menuOpen = false}>Challenges</a>
        <a href="/hall-of-frames" class="text-white font-sora font-extrabold text-2xl uppercase" on:click={() => menuOpen = false}>Hall of Frames</a>
        <a href="/#boutique" class="text-white font-sora font-extrabold text-2xl uppercase" on:click={() => menuOpen = false}>Boutique</a>
        <a 
          href="/login" 
          class="bg-neo-pink text-black font-sora font-bold uppercase py-3 px-8 border-2 border-neo-pink text-lg"
          on:click={() => menuOpen = false}>
          Se connecter
        </a>
      {:else}
        <!-- Est connecté -->
        <a href="/challenges" class="text-white font-sora font-extrabold text-2xl uppercase" on:click={() => menuOpen = false}>Challenges</a>
        <a href="/hall-of-frames" class="text-white font-sora font-extrabold text-2xl uppercase" on:click={() => menuOpen = false}>Hall of Frames</a>
        <a href="/#boutique" class="text-white font-sora font-extrabold text-2xl uppercase" on:click={() => menuOpen = false}>Boutique</a>
        <a href="/me" class="text-white font-sora font-extrabold text-2xl uppercase" on:click={() => menuOpen = false}>Mon Espace</a>
        <button 
          class="bg-red-500 text-white font-sora font-bold uppercase py-3 px-8 border-2 border-red-500 text-lg cursor-pointer"
          on:click={handleLogout}>
          Se déconnecter
        </button>
      {/if}
    </div>
  {/if}
</header>

<style>
  .nav-link {
    @apply no-underline text-black font-inter font-bold text-sm uppercase relative py-1.5 px-0;
    z-index: 1;
  }

  .nav-link::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(250, 112, 215);
    z-index: -1;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  .nav-link:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }
</style>