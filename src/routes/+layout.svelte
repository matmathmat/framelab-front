<script>
  import Header from '$lib/components/Header.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import '../app.css';

  export let data;
  
  // On récupère les données chargées par le serveur
  $: ({ isLoggedIn } = data);
</script>

<div class="app-container">
  <Header {isLoggedIn} />
  
  <main>
    <slot />
  </main>
  
  <Footer />
</div>

<style>
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  main {
    flex: 1;
  }
</style>