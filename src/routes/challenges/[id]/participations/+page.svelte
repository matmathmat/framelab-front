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
    $: ({ challenge, participations: rawParticipations, total, offset, limit, currentUser } = data);

    // On synchronise les participations avec les données du serveur pour permettre une mise à jour instantanée
    let participations = rawParticipations;
    $: participations = rawParticipations;

    let expandedId: number | null = null;
    let showOnlyNotVoted = false;
    
    // États de chargement pour les actions utilisateur
    let isVoting: Record<number, boolean> = {};
    let isCommenting: Record<number, boolean> = {};

    // Cache des commentaires par participation (pour éviter de recharger inutilement)
    let commentsCache: Record<number, Comment[]> = {};
    let commentsLoading: Record<number, boolean> = {};
    let commentsPage: Record<number, number> = {};

    // On filtre les participations selon le filtre actif
    $: filteredParticipations = showOnlyNotVoted 
        ? participations.filter(p => !p.currentUserVote && !p.isMyParticipation)
        : participations;

    function toggleExpand(id: number) {
        if (expandedId === id) {
            expandedId = null;
        } else {
            expandedId = id;
            // On charge les commentaires uniquement si le cache est vide
            if (!commentsCache[id]) {
                loadComments(id, 0);
            }
        }
    }

    async function loadComments(participationId: number, pageOffset: number) {
        commentsLoading[participationId] = true;
        try {
            // On récupère les commentaires de la participation
            const res = await fetch(`/api/comments?participationId=${participationId}&offset=${pageOffset}`);

            if (res.ok) {
                // On caste la réponse JSON en ApiResponseWithPagination<Comment[]> puis on extrait les commentaires
                const json = await res.json() as ApiResponseWithPagination<Comment[]>;
                const newComments = json.result ?? [];
                
                // Si on est en première page on remplace le cache, sinon on ajoute à la suite
                commentsCache[participationId] = pageOffset === 0
                    ? newComments
                    : [...(commentsCache[participationId] || []), ...newComments];

                commentsPage[participationId] = pageOffset;
                commentsCache = { ...commentsCache };
            }
        } finally {
            commentsLoading[participationId] = false;
        }
    }

    function formatDate(dateStr: string) {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('fr-FR', { 
            day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' 
        });
    }

    function getAverageScore(vote: any) {
        if (!vote) return 0;
        const avg = (vote.creativityNote + vote.technicNote + vote.respectNote) / 3;
        return avg.toFixed(1);
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
                    Soumissions <span class="text-neo-pink">Reçues</span>
                </h1>
                <p class="mt-2 font-medium text-gray-600 bg-electric-yellow inline-block px-2 border-2 border-black">
                    Thème : {challenge?.titleTheme}
                </p>
            </div>

            <!-- switch pour le filtre -->
            <label class="relative inline-flex items-center cursor-pointer group">
                <input type="checkbox" bind:checked={showOnlyNotVoted} class="sr-only peer">
                <div class="w-14 h-8 bg-gray-200 peer-focus:outline-none border-4 border-black peer-checked:bg-neo-green transition-colors shadow-neo-sm peer-checked:shadow-none peer-checked:translate-x-[2px] peer-checked:translate-y-[2px]"></div>
                <div class="absolute left-1 top-1 bg-white border-2 border-black h-4 w-4 transition-all peer-checked:left-7"></div>
                <span class="ml-3 text-sm font-black uppercase select-none">
                    {showOnlyNotVoted ? 'À voter uniquement' : 'Tout afficher'}
                </span>
            </label>
        </div>

        <!-- Liste des participations -->
        <div class="flex flex-col gap-6 relative">        
            {#if filteredParticipations.length === 0}
                <div class="p-12 border-4 border-black bg-gray-100 text-center border-dashed" in:fade>
                    <p class="font-bold text-xl uppercase text-gray-400">Aucune participation trouvée</p>
                    {#if showOnlyNotVoted}
                        <p class="text-sm mt-2">Tu as tout voté ou il n'y a rien à voir !</p>
                    {/if}
                </div>
            {/if}

            <!-- Pour chaque participation -->
            {#each filteredParticipations as p (p.id)}
                <!-- On a une carte participation -->
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
                                
                                <!-- Informations de la participation -->
                                <div class="flex flex-col">
                                    <h3 class="font-black text-lg md:text-xl uppercase leading-none truncate max-w-[200px] md:max-w-md">
                                        {p.user?.firstname ?? 'Anonyme'} {p.user?.lastname ?? ''}
                                    </h3>
                                    <span class="text-xs font-mono bg-black text-white px-1 py-0.5 inline-block w-max mt-1">
                                        {formatDate(p.submissionDate)}
                                    </span>
                                    
                                    <!-- Badges de statut -->
                                    <div class="flex gap-2 mt-1 items-center">
                                        {#if p.isMyParticipation}
                                            <span class="text-[10px] font-bold uppercase border border-black px-1 bg-electric-yellow">C'est toi</span>
                                        {/if}
                                        {#if p.currentUserVote}
                                            <div class="flex items-stretch border border-black shadow-neo-xs">
                                                <span class="text-[10px] font-bold uppercase px-1 bg-neo-green text-white flex items-center">Voté</span>
                                                <span class="text-[10px] font-bold px-1 bg-white flex items-center">{getAverageScore(p.currentUserVote)}/5</span>
                                            </div>
                                        {/if}
                                    </div>
                                </div>
                            </div>

                            <!-- Icône chevron -->
                            <div class="border-2 border-black p-2 bg-white transition-transform duration-300 {expandedId === p.id ? 'rotate-180 bg-black text-white' : 'rotate-0'}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter"><path d="M6 9l6 6 6-6"/></svg>
                            </div>
                        </button>

                        <!-- Si la carte est déplié -->
                        {#if expandedId === p.id}
                            <div transition:slide={{ duration: 400, easing: quintOut }} class="border-t-4 border-black">
                                <div class="flex flex-col lg:flex-row h-auto lg:h-[650px]">
                                    <div class="w-full lg:w-2/3 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col overflow-y-auto scrollbar-thin">                                    
                                        <!-- Zone pour l'image -->
                                        <div class="bg-black p-2 md:p-4 shrink-0 flex justify-center items-center h-80 md:h-96 relative group/img">
                                            <a href={p.photoUrl} target="_blank" class="block w-full h-full relative cursor-zoom-in">
                                                <img src={p.photoUrl} alt="Full view" class="w-full h-full object-contain border-2 border-white/20" />
                                                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                                                    <span class="bg-black text-white text-xs px-2 py-1 font-bold uppercase border border-white">Ouvrir l'original ↗</span>
                                                </div>
                                            </a>
                                        </div>

                                        <!-- Zone pour le vote -->
                                        <div class="p-6 md:p-8 bg-cream flex-1">
                                            <h4 class="font-black text-2xl uppercase mb-6 flex items-center gap-2">
                                                <span class="bg-black text-white px-2">Mon</span> Vote
                                            </h4>

                                            {#if p.isMyParticipation}
                                                <!-- L'utilisateur ne peut pas voter pour sa propre participation -->
                                                <div class="bg-gray-200 border-2 border-black p-4 text-center font-bold font-mono text-sm opacity-70">
                                                    // Vous ne pouvez pas voter pour votre propre participation //
                                                </div>
                                            {:else if p.currentUserVote}
                                                <!-- Si l'utilisateur a déjà voté, on affiche les notes qu'il a mis -->
                                                <div class="grid grid-cols-3 gap-4">
                                                    <div class="flex flex-col items-center p-4 border-2 border-black bg-white shadow-neo-sm">
                                                        <span class="text-xs font-bold uppercase mb-2">Créativité</span>
                                                        <span class="text-4xl font-black text-neo-pink">{p.currentUserVote.creativityNote}</span>
                                                    </div>
                                                    <div class="flex flex-col items-center p-4 border-2 border-black bg-white shadow-neo-sm">
                                                        <span class="text-xs font-bold uppercase mb-2">Technique</span>
                                                        <span class="text-4xl font-black text-electric-yellow">{p.currentUserVote.technicNote}</span>
                                                    </div>
                                                    <div class="flex flex-col items-center p-4 border-2 border-black bg-white shadow-neo-sm">
                                                        <span class="text-xs font-bold uppercase mb-2">Thème</span>
                                                        <span class="text-4xl font-black text-neo-green">{p.currentUserVote.respectNote}</span>
                                                    </div>
                                                </div>
                                                <div class="mt-4 text-center text-xs font-bold uppercase text-gray-500">
                                                    Vote enregistré le {formatDate(p.currentUserVote.voteDate)}
                                                </div>
                                            {:else}
                                                <!-- Si l'utilisateur n'a pas voté on affiche le formulaire de vote -->
                                                <form method="POST" action="?/vote" use:enhance={() => {
                                                    isVoting[p.id] = true;
                                                    return async ({ result, update }) => {
                                                        if (result.type === 'success') {
                                                            await invalidateAll(); 
                                                        } else {
                                                            await update();
                                                        }
                                                        isVoting[p.id] = false;
                                                    };
                                                }}>
                                                    <input type="hidden" name="participationId" value={p.id}>
                                                    
                                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                        {#each ['creativity', 'technic', 'respect'] as criteria}
                                                            <div class="flex flex-col gap-2">
                                                                <label class="font-bold text-[10px] uppercase bg-black text-white inline-block w-max px-1">
                                                                    {criteria === 'creativity' ? 'Créativité' : criteria === 'technic' ? 'Technique' : 'Respect du thème'}
                                                                </label>
                                                                <div class="flex justify-between gap-1 bg-white border-2 border-black p-1">
                                                                    {#each [1, 2, 3, 4, 5] as note}
                                                                        <label class="flex-1 relative cursor-pointer group">
                                                                            <input type="radio" name={criteria} value={note} class="peer sr-only" required>
                                                                            <span class="block text-center text-sm font-black py-1.5 border-2 border-transparent peer-checked:bg-black peer-checked:text-white peer-checked:border-black hover:bg-gray-100 transition-all">
                                                                                {note}
                                                                            </span>
                                                                        </label>
                                                                    {/each}
                                                                </div>
                                                            </div>
                                                        {/each}
                                                    </div>

                                                    <button 
                                                        type="submit" 
                                                        disabled={isVoting[p.id]}
                                                        class="w-full bg-neo-pink border-4 border-black py-3 text-lg font-black uppercase hover:bg-black hover:text-white hover:shadow-neo-sm transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
                                                    >
                                                        {#if isVoting[p.id]}
                                                            <span class="flex items-center justify-center gap-2">
                                                                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Envoi...
                                                            </span>
                                                        {:else}
                                                            Valider le vote
                                                        {/if}
                                                    </button>
                                                </form>
                                            {/if}
                                        </div>
                                    </div>

                                    <!-- Zone pour les commentaires -->
                                    <div class="w-full lg:w-1/3 bg-white flex flex-col h-[500px] lg:h-full relative">
                                        <div class="p-4 border-b-4 border-black bg-electric-yellow flex justify-between items-center shrink-0">
                                            <h4 class="font-black uppercase">Commentaires</h4>
                                            <span class="text-xs font-bold border border-black px-1 bg-white">
                                                {commentsCache[p.id]?.length || 0}
                                            </span>
                                        </div>

                                        <div class="bg-black text-white p-2 text-[10px] font-mono leading-tight border-b-4 border-black shrink-0">
                                            ⚠ CECI EST UNE ZONE D'ÉCHANGE. MERCI DE NE PAS INFLUENCER LES VOTES.
                                        </div>

                                        <!-- Liste des commentaires -->
                                        <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 pattern-grid-sm scrollbar-thin">
                                            {#if commentsLoading[p.id] && (!commentsCache[p.id] || commentsCache[p.id].length === 0)}
                                                <div class="flex justify-center py-8">
                                                    <div class="animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full"></div>
                                                </div>
                                            {:else if commentsCache[p.id]?.length > 0}
                                                {#each commentsCache[p.id] as comment}
                                                    <div class="bg-white border-2 border-black p-3 shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-sm">
                                                        <div class="flex justify-between items-baseline mb-1">
                                                            <span class="font-bold uppercase text-xs">{comment.user?.firstname ?? 'Utilisateur'}</span>
                                                            <span class="text-[10px] text-gray-500">{formatDate(comment.commentDate)}</span>
                                                        </div>
                                                        <p class="leading-snug break-words">{comment.textContent}</p>
                                                    </div>
                                                {/each}
                                                
                                                {#if (commentsCache[p.id].length % 20 === 0)}
                                                    <button 
                                                        on:click={() => loadComments(p.id, (commentsPage[p.id] || 0) + 20)}
                                                        class="w-full text-xs font-bold uppercase py-2 border-2 border-black bg-gray-200 hover:bg-white"
                                                    >
                                                        Charger plus
                                                    </button>
                                                {/if}
                                            {:else}
                                                <p class="text-center text-gray-400 text-sm italic">Aucun commentaire pour l'instant.</p>
                                            {/if}
                                        </div>

                                        <!-- Formulaire pour ajouter un commentaire -->
                                        <div class="p-4 border-t-4 border-black bg-white shrink-0">
                                            <form method="POST" action="?/comment" use:enhance={() => {
                                                isCommenting[p.id] = true;
                                                return async ({ result, update }) => {
                                                    if (result.type === 'success') {
                                                        await loadComments(p.id, 0);
                                                        await update({ reset: true, invalidateAll: false });
                                                    } else {
                                                        await update();
                                                    }
                                                    isCommenting[p.id] = false;
                                                };
                                            }}>
                                                <input type="hidden" name="participationId" value={p.id}>
                                                <div class="relative">
                                                    <textarea 
                                                        name="content"
                                                        rows="2" 
                                                        required
                                                        placeholder="Ton avis constructif..." 
                                                        class="w-full bg-gray-100 border-2 border-black p-2 text-sm font-medium focus:outline-none focus:bg-white focus:shadow-neo-sm resize-none disabled:bg-gray-200"
                                                        disabled={isCommenting[p.id]}
                                                    ></textarea>
                                                    <button 
                                                        type="submit" 
                                                        disabled={isCommenting[p.id]}
                                                        class="absolute bottom-2 right-2 bg-black text-white p-1 hover:bg-neo-green hover:text-black border border-black transition-colors disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:hover:text-white"
                                                    >
                                                        {#if isCommenting[p.id]}
                                                            <div class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                                        {:else}
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                                        {/if}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
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