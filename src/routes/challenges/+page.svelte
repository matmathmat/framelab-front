<script lang="ts">
    import { onDestroy } from "svelte";
    import type { PageData } from "./$types";

    // Import images
    import waitingRoom from "$lib/assets/images/challenge/waitingbackground.png";
    import archive from "$lib/assets/images/challenge/archive.png";

    export let data: PageData;

    // On récupère les données chargées par le serveur
    $: ({ currentChallenge, hasParticipated, currentUser } = data);

    // Variable pour aider calcul timer
    let timeLeft = "";
    let interval: any;

    function calculateTimeLeft() {
        if (!currentChallenge || !currentChallenge.endDate) {
            timeLeft = "";
            return;
        }

        // Timestamp actuel (en millisecondes)
        const now = new Date().getTime();

        // Timestamp de la date de fin du challenge
        const endDate = new Date(currentChallenge.endDate.replace(' ', 'T')).getTime();        

        // Différence entre la date de fin et maintenant
        const distance = endDate - now;

        // Si la date de fin est dépassée, on arrête le timer pour éviter temps négatif
        if (distance < 0) {
            timeLeft = "Terminé";
            if (interval) clearInterval(interval);
            return;
        }

        // Conversion du temps restant en jours, heures, minutes et secondes
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timeLeft = `${days}j ${hours}h ${minutes}m ${seconds}s`;
    }

    $: if (currentChallenge) {
        calculateTimeLeft();
        if (interval) clearInterval(interval);
        interval = setInterval(calculateTimeLeft, 1000);
    }

    onDestroy(() => {
        if (interval) clearInterval(interval);
    });
</script>

<div class="min-h-screen font-sora selection:bg-black selection:text-white pb-20" style="padding-top: var(--header-height, 40px);">
    <div class="max-w-7xl mx-auto px-4 md:px-8 pt-12 flex flex-col gap-16">     
        <!-- Section espace créatif -->
        <header class="relative group">
            <div class="absolute inset-0 bg-black translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4"></div>        
            <div class="relative bg-neo-lilac border-4 border-black p-8 md:p-6 flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-transform duration-200 hover:-translate-y-1 hover:-translate-x-1">
                <div class="hidden md:flex shrink-0 w-24 h-24 bg-electric-yellow border-4 border-black items-center justify-center shadow-neo-sm transform rotate-3">
                    <span class="text-4xl">★</span>
                </div>

                <div class="flex-1 text-center md:text-left">
                    <div class="inline-block bg-black text-white text-sm md:text-base font-black uppercase px-4 py-2 mb-4 transform -rotate-1">
                        Espace Créatif
                    </div>
                    <h1 class="text-4xl md:text-6xl font-black text-black uppercase leading-tight tracking-tighter mb-4">
                        Challenge <br class="hidden md:block" />
                        <span class="bg-neo-pink px-2 text-black">Hebdomadaire</span>
                    </h1>
                    <p class="text-lg md:text-xl font-medium border-l-4 border-black pl-4 md:pl-6 py-2 max-w-2xl bg-white/50 backdrop-blur-sm">
                        Un thème, une photo, ton imagination. Modifie l'image avec l'application FrameLab Desktop et soumets ta création au vote de la communauté.
                    </p>
                </div>
            </div>
        </header>

        <!-- Section contenu principal -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">         
            <!-- Carte challenge en cours -->
            <article class="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col h-full relative">
                <div class="absolute -top-4 -left-2 z-10">
                    <span class="bg-neo-green border-4 border-black px-4 py-2 font-black uppercase text-sm shadow-neo-sm transform -rotate-2">
                        En live {#if currentChallenge && timeLeft}— {timeLeft}{/if}
                    </span>
                </div>
                <div class="bg-white border-4 border-black shadow-neo flex flex-col md:flex-row h-full transition-all duration-300 hover:shadow-neo-hover">
                    <div class="w-full md:w-1/2 h-64 md:h-auto border-b-4 md:border-b-0 md:border-r-4 border-black relative overflow-hidden group">
                        {#if currentChallenge}
                            <img
                                src={currentChallenge.photoUrl || waitingRoom}
                                alt={currentChallenge.titleTheme}
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale"
                            />
                            <div class="absolute inset-0 bg-neo-pink/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-multiply"></div>
                        {:else}
                            <div class="w-full h-full bg-gray-100 flex items-center justify-center font-black text-xl uppercase pattern-grid-lg">
                                En attente
                            </div>
                        {/if}
                    </div>
                    <div class="p-8 md:p-10 flex flex-col justify-between w-full md:w-1/2 bg-white">
                        <div>
                            {#if currentChallenge}
                                <h2 class="text-xl font-black uppercase leading-none mb-6">
                                    {currentChallenge.titleTheme}
                                </h2>
                                <div class="bg-electric-yellow border-2 border-black p-4 mb-8 shadow-neo-sm">
                                    <p class="font-medium text-black leading-snug text-sm">
                                        {currentChallenge.descriptionTheme}
                                    </p>
                                </div>
                            {:else}
                                <h2 class="text-3xl font-black uppercase text-gray-400 mb-4">Aucun challenge</h2>
                                <p class="font-medium">Reviens plus tard pour le prochain défi !</p>
                            {/if}
                        </div>
                        {#if currentChallenge}
                            <div class="flex flex-col gap-4 mt-4">
                                {#if hasParticipated}
                                    <button disabled class="w-full bg-silver text-black border-4 border-black py-3 font-black uppercase cursor-not-allowed opacity-50">
                                        Tu as déjà participé
                                    </button>
                                {:else}
                                    <a href="/participate" 
                                       class="group w-full relative">
                                        <div class="absolute inset-0 bg-black translate-x-1 translate-y-1"></div>
                                        <div class="relative w-full bg-neo-green border-4 border-black py-3 px-6 text-center text-sm font-black uppercase transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1">
                                            Participer maintenant
                                        </div>
                                    </a>
                                {/if}

                                <a href="/challenges/{currentChallenge.id}/vote" 
                                   class="group w-full relative">
                                    <div class="absolute inset-0 bg-black translate-x-1 translate-y-1"></div>
                                    <div class="relative w-full bg-white border-4 border-black py-3 px-6 text-center text-sm font-black uppercase transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:bg-electric-yellow">
                                        Voir les soumissions
                                    </div>
                                </a>
                            </div>
                        {/if}
                    </div>
                </div>
            </article>

            <!-- Séparateur vertical invisible -->
            <div class="flex flex-col gap-8 h-full">             
                <!-- Carte archive -->
                <article class="flex-1 bg-white border-4 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm transition-all duration-300">
                    <div class="h-32 border-b-4 border-black overflow-hidden relative">
                         <img
                            src={archive}
                            alt="Archives"
                            class="w-full h-full object-cover"
                        />
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-black uppercase mb-2">Les archives</h3>
                        <p class="text-sm font-medium mb-6">
                            Retrouvez l'historique de tous nos défis précédents et
                            admirez les créations de la communauté FrameLab.
                        </p>
                        <a href="/challenges/archives" class="inline-block bg-black text-white font-bold text-sm uppercase px-4 py-2 hover:bg-neo-lilac hover:text-black transition-colors">
                            Ouvrir les archives ->
                        </a>
                    </div>
                </article>

                <!-- Carte administrateur -->
                {#if currentUser && currentUser.isAdmin}
                <article class="bg-electric-yellow border-4 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm transition-all duration-300">
                    <div class="p-6 border-b-4 border-black bg-white">
                        <div class="flex items-center justify-between mb-2">
                            <span class="font-black uppercase text-xl">Zone Administrateur</span>
                            <div class="w-4 h-4 rounded-full bg-red-500 border-2 border-black animate-pulse"></div>
                        </div>
                        <p class="text-sm font-medium">Créer et gérer les challenges.</p>
                    </div>
                    <div class="p-4">
                        <a href="/admin/challenges" class="block w-full text-center bg-white border-4 border-black py-2 font-black uppercase text-sm hover:bg-black hover:text-white transition-colors">
                            Accéder au panel
                        </a>
                    </div>
                </article>
                {/if}
            </div>
        </section>
    </div>
</div>