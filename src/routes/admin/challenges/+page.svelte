<script lang="ts">
    import type { ApiResponseWithPagination } from '$lib/types/apiResponse';
    import type { Challenge } from '$lib/types/Challenge';
    import { onMount } from 'svelte';

    // Variable pour aider la gestion de challenge
    let challenges: any[] = [];
    let loading = false;
    let offset = 0;
    let allLoaded = false;
    let observerElement: HTMLElement;
    
    // Gestion de l'image agrandie
    let fullScreenImage: string | null = null;

    // Gestion barre de recherche et tri
    let searchQuery = "";
    let sortOrder: 'asc' | 'desc' = 'desc';

    async function loadChallenges() {
        if (loading || allLoaded) return;

        loading = true;

        try {
            // On récupère les challenges
            const res = await fetch(`/api/challenges?offset=${offset}`);

            if (res.ok) {
                // On caste la réponse JSON en ApiResponseWithPagination<Challenge[]> puis on extrait les challenge
                const json = await res.json() as ApiResponseWithPagination<Challenge[]>;
                const newChallenges = (json.result ?? []).map(challenge => ({
                    ...challenge,
                    startDate: formatDate(challenge.startDate),
                    endDate: formatDate(challenge.endDate)
                }));
                
                if (!json.pagination.hasNext) {
                    allLoaded = true;
                }

                // Si offset 0, on remplace, sinon on ajoute
                challenges = offset === 0 ? newChallenges : [...challenges, ...newChallenges];
                offset += json.pagination.limit;
                
            }
        } catch (e) {
            console.error("Erreur chargement", e);
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        // Chargement initial
        loadChallenges();

        // Scroll infini
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadChallenges();
            }
        }, { threshold: 0.1 });

        // if (observerElement) observer.observe(observerElement);

        return () => observer.disconnect();
    });

    function formatDate(dateHeure: string) {
        if (!dateHeure || typeof dateHeure !== "string") return "";
        const parts = dateHeure.split(" ");
        return parts.length > 0 ? parts[0] : "";
    }    

    async function handleSave(challenge: any) {
        if (challenge.titleTheme == "") {
            alert("Le titre ne peut pas être vide");
            return;
        }

        if (challenge.descriptionTheme == "") {
            alert("La description ne peut pas être vide");
            return;
        }
        
        if (challenge.startDate == "") {
            alert("La date de début ne peut pas être vide");
            return;
        }

        if (challenge.endDate == "") {
            alert("La date de fin ne peut pas être vide");
            return;
        }        

        const formData = new FormData();
        formData.append('titleTheme', challenge.titleTheme);
        formData.append('descriptionTheme', challenge.descriptionTheme);
        formData.append('startDate', challenge.startDate);
        formData.append('endDate', challenge.endDate);
        formData.append('isArchived', String(challenge.isArchived));
        
        // Gestion de l'image
        if (challenge.newFile) {
            formData.append('file', challenge.newFile);
        }
        if (challenge.deleteImageFlag) {
            formData.append('deleteImage', 'true');
        }

        challenge.isSaving = true;

        // Trigger update
        challenges = [...challenges]; 

        try {
            const url = challenge.isNew ? `/api/challenges` : `/api/challenges/${challenge.id}`;
            const method = challenge.isNew ? 'POST' : 'PATCH';

            const res = await fetch(url, { method, body: formData });

            if (res.ok) {
                const updated = await res.json();

                const index = challenges.findIndex(c => c.id === challenge.id);

                if (index !== -1) {
                    challenges[index] = { ...updated.result, isSaving: false, newFile: null, deleteImageFlag: false, previewUrl: null };
                }

                alert("Challenge mis à jour !");
            } else {
                console.log(res);
                alert("Erreur lors de la sauvegarde");
            }
        } catch (e) {
            console.error(e);
            alert("Erreur réseau");
        } finally {
            challenge.isSaving = false;
            challenges = [...challenges];
        }
    }

    function markImageForDeletion(challenge: any) {
        challenge.deleteImageFlag = true;
        challenge.previewUrl = null;
        challenges = [...challenges];
    }

    function handleImageSelect(e: Event, challenge: any) {
        const input = e.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            challenge.newFile = file;

            // On annule le delete si on remet une image
            challenge.deleteImageFlag = false;
            
            // Création preview
            const reader = new FileReader();
            reader.onload = (e) => {
                challenge.previewUrl = e.target?.result;
                challenges = [...challenges];
            };
            reader.readAsDataURL(file);
        }
    }

    function triggerFileInput(id: any) {
        document.getElementById(`file-${id}`)?.click();
    }

    function addNewChallenge() {
        const newEntry = {
            id: `new-${Date.now()}`,
            titleTheme: '',
            descriptionTheme: '',
            startDate: '',
            endDate: '',
            photoUrl: null,
            isArchived: 0,
            isNew: true,
            isSaving: false,
            newFile: null,
            deleteImageFlag: false,
            previewUrl: null
        };
        challenges = [newEntry, ...challenges];
    }

    let selectedIds = new Set<any>();

    function toggleSelect(id: any) {
        if (selectedIds.has(id)) {
            selectedIds.delete(id);
        } else {
            selectedIds.add(id);
        }

        selectedIds = new Set(selectedIds);
    }

    async function deleteSelected() {
        if (selectedIds.size === 0) return;
        if (!confirm(`Supprimer ${selectedIds.size} entrée(s) ?`)) return;

        for (const id of selectedIds) {
            if (String(id).startsWith('new-')) {
                challenges = challenges.filter(c => c.id !== id);
                continue;
            }

            await fetch(`/api/challenges/${id}`, { method: 'DELETE' });
        }

        challenges = challenges.filter(c => !selectedIds.has(c.id));
        selectedIds = new Set();
    }

    $: filteredChallenges = challenges
        .filter(c => {
            const term = searchQuery.toLowerCase();
            return (c.titleTheme?.toLowerCase().includes(term) || 
                    c.descriptionTheme?.toLowerCase().includes(term));
        })
        .sort((a, b) => {
            const idA = typeof a.id === 'string' ? 999999 : a.id;
            const idB = typeof b.id === 'string' ? 999999 : b.id;
            return sortOrder === 'desc' ? idB - idA : idA - idB;
        });

    function toggleSort() {
        sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    }
    
</script>

<div class="h-screen flex flex-col font-sora pb-10 pt-24 px-[20px] overflow-hidden">
    <div class="w-full flex flex-col h-full">
         <!-- Entête -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b-4 border-black pb-6">
            <div>
                <a href="/challenges" class="inline-block text-sm font-bold uppercase hover:bg-black hover:text-white px-2 py-1 transition-colors mb-2">
                    ← Retour aux challenges
                </a>
                <h1 class="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                    Panneau <span class="text-neo-pink">Administration</span>
                </h1>
                <p class="mt-2 font-medium text-gray-600 bg-electric-yellow inline-block px-2 border-2 border-black">
                    Gestion des Challenges
                </p>                
            </div>          
        </div>

        <!-- Barre de contrôles -->
        <div class="flex flex-wrap items-stretch gap-4 mb-8">
            <button
                on:click={addNewChallenge}
                class="bg-neo-green text-black font-black px-6 py-4 text-base border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase"
            >
                + Nouveau challenge
            </button>

            {#if selectedIds.size > 0}
                <button
                    on:click={deleteSelected}
                    class="bg-red-500 text-white font-black px-6 py-4 text-base border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase"
                >
                    Supprimer ({selectedIds.size})
                </button>
            {/if}

            <div class="flex-1 relative min-w-[250px]">
                <input 
                    type="text" 
                    bind:value={searchQuery}
                    placeholder="Rechercher un titre ou une description..."
                    class="w-full h-full bg-white border-4 border-black px-4 py-3 font-bold text-lg shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:outline-none focus:ring-0 focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all"
                />
            </div>

            <button 
                on:click={toggleSort}
                class="bg-neo-lilac border-4 border-black px-6 py-4 font-black uppercase shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2"
            >
                Tri ID {sortOrder === 'desc' ? '▼' : '▲'}
            </button>

            <div class="flex items-center bg-white border-4 border-black px-6 font-black uppercase shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                Total: {challenges.length}
            </div>            
        </div>

        <!-- Datagrid -->
        <div class="bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] overflow-y-auto flex-1 min-h-0">
            <table class="w-full border-collapse table-fixed">
                <thead class="sticky top-0 z-10 bg-black text-white">
                    <tr>
                        <th class="w-16 p-4 border-r-2 border-white"></th>
                        <th class="w-24 p-4 text-left font-black uppercase border-r-2 border-white">Id</th>
                        <th class="w-[20%] p-4 text-left font-black uppercase border-r-2 border-white">Titre</th>
                        <th class="w-[30%] p-4 text-left font-black uppercase border-r-2 border-white">Description</th>
                        <th class="w-40 p-4 text-left font-black uppercase border-r-2 border-white">Début</th>
                        <th class="w-40 p-4 text-left font-black uppercase border-r-2 border-white">Fin</th>
                        <th class="w-32 p-4 text-left font-black uppercase border-r-2 border-white">Image</th>
                        <th class="w-24 p-4 text-center font-black uppercase border-r-2 border-white">Archivé</th>
                        <th class="w-32 p-4 text-center font-black uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each filteredChallenges as challenge (challenge.id)}
                        <tr class="border-b-4 border-black hover:bg-gray-50 transition-colors">
                            <td class="p-4 border-r-4 border-black text-center">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.has(challenge.id)}
                                    on:change={() => toggleSelect(challenge.id)}
                                    class="w-6 h-6 cursor-pointer accent-neo-pink border-4 border-black rounded-none appearance-none checked:bg-neo-pink bg-white border-2 inline-block relative"
                                    style="border-style: solid;"
                                />
                            </td>

                            <td class="p-4 border-r-4 border-black font-mono font-normal text-lg">
                                #{challenge.id}
                            </td>
                            <td class="p-4 border-r-4 border-black">
                                <input
                                    type="text"
                                    bind:value={challenge.titleTheme}
                                    class="w-full bg-neo-green/10 border-2 border-transparent focus:border-black p-2 font-normal outline-none transition-all"
                                />
                            </td>
                            <td class="p-4 border-r-4 border-black">
                                <textarea
                                    bind:value={challenge.descriptionTheme}
                                    rows="2"
                                    class="w-full bg-neo-lilac/10 border-2 border-transparent focus:border-black p-2 font-normal outline-none resize-none transition-all"
                                />
                            </td>
                            <td class="p-4 border-r-4 border-black">
                                <input
                                    type="date"
                                    bind:value={challenge.startDate}
                                    class="w-full border-2 border-black p-1 font-normal focus:bg-electric-yellow transition-colors outline-none"
                                />
                            </td>
                            <td class="p-4 border-r-4 border-black">
                                <input
                                    type="date"
                                    bind:value={challenge.endDate}
                                    class="w-full border-2 border-black p-1 font-normal focus:bg-electric-yellow transition-colors outline-none"
                                />
                            </td>
                            <td class="p-4 border-r-4 border-black text-center">
                                <input
                                    type="file"
                                    id="file-{challenge.id}"
                                    accept="image/*"
                                    class="hidden"
                                    on:change={(e) => handleImageSelect(e, challenge)}
                                />

                                {#if challenge.previewUrl || (challenge.photoUrl && !challenge.deleteImageFlag)}
                                    <div class="relative group inline-block">
                                        <img
                                            src={challenge.previewUrl || challenge.photoUrl}
                                            alt="Preview"
                                            class="w-20 h-20 object-cover border-4 border-black cursor-pointer hover:rotate-2 transition-transform shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                                            on:click={() => fullScreenImage = challenge.previewUrl || challenge.photoUrl}
                                        />
                                    </div>
                                {:else}
                                    <button
                                        on:click={() => triggerFileInput(challenge.id)}
                                        class="text-xs font-black uppercase border-2 border-black p-2 bg-gray-200 hover:bg-black hover:text-white transition-all"
                                    >
                                        Ajouter
                                    </button>
                                {/if}
                            </td>
                            <td class="p-4 border-r-4 border-black text-center">
                                <button 
                                    on:click={() => {
                                        challenge.isArchived = challenge.isArchived == 1 ? 0 : 1;
                                        challenges = [...challenges];
                                    }}
                                    class="w-10 h-10 border-4 border-black transition-colors {challenge.isArchived == 1 ? 'bg-black text-white' : 'bg-white'}"
                                >
                                    {challenge.isArchived == 1 ? '✓' : ''}
                                </button>
                            </td>
                            <td class="p-4 text-center">
                                <button
                                    on:click={() => handleSave(challenge)}
                                    disabled={challenge.isSaving}
                                    class="w-full bg-black text-white font-black py-2 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:opacity-50 transition-all uppercase text-sm"
                                >
                                    {challenge.isSaving ? '...' : 'Valider'}
                                </button>
                            </td>                            
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>        
    </div>

    <!-- Modal image preview -->
    {#if fullScreenImage}
        <div
            class="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4"
            on:click|self={() => fullScreenImage = null}
        >
            <div class="bg-white border-8 border-black p-4 shadow-[15px_15px_0_0_rgba(255,255,255,0.2)]">
                <img src={fullScreenImage} alt="Plein écran" class="max-h-[70vh] max-w-full border-4 border-black" />
                <div class="flex gap-6 mt-8">
                    <button
                        class="flex-1 bg-red-500 text-white font-black px-6 py-4 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase"
                        on:click={() => {
                            const challenge = challenges.find(c =>
                                (c.previewUrl || c.photoUrl) === fullScreenImage
                            );
                            if (challenge) markImageForDeletion(challenge);
                            fullScreenImage = null;
                        }}
                    >
                        Supprimer l'image
                    </button>
                    <button
                        class="flex-1 bg-neo-green text-black font-black px-6 py-4 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase"
                        on:click={() => {
                            const challenge = challenges.find(c =>
                                (c.previewUrl || c.photoUrl) === fullScreenImage
                            );
                            if (challenge) triggerFileInput(challenge.id);
                            fullScreenImage = null;
                        }}
                    >
                        Remplacer
                    </button>
                    <button 
                        class="bg-black text-white px-4 border-4 border-black font-black shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]"
                        on:click={() => fullScreenImage = null}
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    {/if}    
</div>

<style>
    input[type="checkbox"] {
        -webkit-appearance: none;
        appearance: none;
        background-color: #fff;
        margin: 0;
        font: inherit;
        color: currentColor;
        width: 1.5em;
        height: 1.5em;
        border: 4px solid black;
        display: grid;
        place-content: center;
        transition: 0.1s transform ease-in-out;
    }

    input[type="checkbox"]::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em black;
        background-color: CanvasText;
    }

    input[type="checkbox"]:checked::before {
        transform: scale(1);
    }

    div::-webkit-scrollbar {
        width: 16px;
    }
    div::-webkit-scrollbar-track {
        background: white;
        border-left: 4px solid black;
    }
    div::-webkit-scrollbar-thumb {
        background: black;
        border: 4px solid white;
    }
</style>