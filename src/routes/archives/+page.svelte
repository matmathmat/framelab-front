<script lang="ts">
    import { slide, fade } from 'svelte/transition';
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation'; 
    import type { PageData } from './$types';
    import { quintOut } from 'svelte/easing';
    import type { ApiResponseWithPagination } from '$lib/types/apiResponse';
    import type { Comment } from '$lib/types/comment';

    export let data: PageData;
    
    // Récupérer les données chargées par le serveur
    $: ({ challenges: rawChallenges, total, offset, limit } = data);

    // On synchronise les participations avec les données du serveur pour permettre une mise à jour instantanée
    let challenges = rawChallenges;
    $: challenges = rawChallenges;

    let expandedId: number | null = null;
    let showOnlyNotVoted = false;

    function toggleExpand(id: number) {
        expandedId = expandedId === id ? null : id;
    }

    function formatDate(dateStr: string) {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('fr-FR', { 
            day: 'numeric', month: 'long', year: 'numeric'
        });
    }
</script>

<div class="min-h-screen font-sora pb-20 pt-24 px-4 md:px-8">   
    <div class="max-w-4xl mx-auto mb-12">
        <!-- Entête -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b-4 border-black pb-6">
            <div>
                <a href="/challenges" class="inline-block text-sm font-bold uppercase hover:bg-black hover:text-white px-2 py-1 transition-colors mb-2">
                    ← Retour aux challenges
                </a>
                <h1 class="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                    Les <span class="text-neo-pink">Archives</span>
                </h1>
                <p class="mt-2 font-medium text-gray-600 bg-electric-yellow inline-block px-2 border-2 border-black">
                    Souvenirs des anciens challenges
                </p>
            </div>
        </div>

        <!-- Liste des challenges -->
        <div class="flex flex-col gap-6 relative">        
            <!-- {#if filteredParticipations.length === 0}
                <div class="p-12 border-4 border-black bg-gray-100 text-center border-dashed" in:fade>
                    <p class="font-bold text-xl uppercase text-gray-400">Aucune participation trouvée</p>
                    {#if showOnlyNotVoted}
                        <p class="text-sm mt-2">Tu as tout voté ou il n'y a rien à voir !</p>
                    {/if}
                </div>
            {/if} -->

            <!-- Pour chaque challenge -->
            {#each challenges as p (p.id)}
                <!-- On a une carte challenge -->
                <article class="relative group transition-all duration-300">
                    <div class="absolute inset-0 bg-black translate-x-2 translate-y-2 {expandedId === p.id ? 'translate-x-0 translate-y-0' : ''} transition-transform"></div>
                    <div class="relative bg-white border-4 border-black transition-transform {expandedId === p.id ? 'translate-x-0 translate-y-0' : '-translate-x-2 -translate-y-2 hover:-translate-y-3 hover:-translate-x-3'}">                    
                        <!-- Entête dépliante -->
                        <button 
                            on:click={() => toggleExpand(p.id)}
                            class="w-full flex items-center justify-between p-4 bg-white hover:bg-neo-lilac/20 transition-colors text-left"
                        >
                            <div class="flex items-center gap-4 md:gap-6 overflow-hidden">
                                <!-- Aperçu de la photo -->
                                <div class="w-16 h-16 md:w-20 md:h-20 border-2 border-black shrink-0 relative overflow-hidden bg-gray-200">
                                    <img src={p.photoUrl} alt="Preview" class="w-full h-full object-cover transition-all duration-500" />
                                </div>
                                
                                <!-- Informations du challenge -->
                                <div class="flex flex-col">
                                    <h3 class="font-black text-lg md:text-xl uppercase leading-none truncate max-w-[200px] md:max-w-md">
                                        {p.titleTheme ?? 'Titre'}
                                    </h3>
                                    <div class="flex flex-wrap gap-2 mt-1">
                                        <span class="text-[10px] md:text-xs font-mono bg-black text-white px-1 py-0.5">
                                            DU {formatDate(p.startDate)}
                                        </span>
                                        <span class="text-[10px] md:text-xs font-mono bg-neo-pink text-black border border-black px-1 py-0.5 font-bold">
                                            AU {formatDate(p.endDate)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="ml-4">
                                <svg class="w-6 h-6 transition-transform duration-300 {expandedId === p.id ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>

                        <!-- Contenu déplié -->
                        {#if expandedId === p.id}
                            <div transition:slide={{ duration: 300, easing: quintOut }} class="p-4 border-t-4 border-black bg-gray-50">
                                <div class="flex flex-col gap-4">
                                    <div class="bg-white border-2 border-black p-3 shadow-neo-sm">
                                        <p class="text-sm md:text-base font-medium leading-relaxed">
                                            {p.descriptionTheme}
                                        </p>
                                    </div>
                                    
                                    <a 
                                        href="/challenges/{p.id}/participations" 
                                        class="inline-block text-center bg-neo-green text-black font-black uppercase py-3 border-2 border-black shadow-neo-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:bg-black active:text-white"
                                    >
                                        Voir les participations
                                    </a>
                                </div>
                            </div>
                        {/if}
                    </div>
                </article>
            {/each}
        </div>

        <!-- Zone pour la pagination -->
        <div class="mt-12 flex justify-between items-center border-t-4 border-black pt-6">
            {#if offset > 0}
                <a href="?offset={Math.max(0, offset - limit)}" class="font-black uppercase border-2 border-black px-4 py-2 hover:bg-black hover:text-white shadow-neo-sm transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                    &lt; Précédent
                </a>
            {:else}
                <span class="opacity-0 pointer-events-none">Placeholder</span>
            {/if}

            <span class="font-mono font-bold">Page {Math.floor(offset / limit) + 1}</span>

            {#if (offset + limit) < total}
                <a href="?offset={offset + limit}" class="font-black uppercase border-2 border-black px-4 py-2 hover:bg-black hover:text-white shadow-neo-sm transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                    Suivant &gt;
                </a>
            {:else}
                <span class="opacity-0 pointer-events-none">Placeholder</span>
            {/if}
        </div>
    </div>
</div>

<style>
    .scrollbar-thin::-webkit-scrollbar {
        width: 8px;
    }
    .scrollbar-thin::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-left: 2px solid black;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
        background: #000;
        border: 1px solid white;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background: #fae469;
    }
    
    .pattern-grid-sm {
        background-image: radial-gradient(#000 1px, transparent 1px);
        background-size: 10px 10px;
        opacity: 0.8;
    }

    .cursor-zoom-in {
        cursor: zoom-in;
    }
</style>