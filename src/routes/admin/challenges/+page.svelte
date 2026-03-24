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
                
                if (json.pagination.hasPrevious) {
                    allLoaded = false;
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
        loadChallenges(); // Chargement initial

        // Infinite Scroll Observer
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadChallenges();
            }
        }, { threshold: 0.1 });

        //if (observerElement) observer.observe(observerElement);

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

    function triggerFileInput(id: number) {
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
    
    

</script>

<div class="min-h-screen font-sora pb-20 pt-24 px-4 md:px-8">
    <div class="max-w-7xl mx-auto">     
        <!-- Header -->
        <div class="mb-12 border-b-4 border-black pb-6 flex justify-between items-end">
            <div>
                <h1 class="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2">
                    Panneau <span class="text-neo-pink bg-black px-2">Administration</span>
                </h1>
                <p class="font-bold text-xl bg-electric-yellow inline-block px-2 border-2 border-black transform -rotate-1">
                    Gestion des Challenges
                </p>
            </div>
            <div class="hidden md:block">
                <span class="font-mono text-xs font-bold border-2 border-black p-2 bg-gray-100 shadow-neo-sm">
                    Total: {challenges.length} chargé(s)
                </span>
            </div>

            <button
                on:click={addNewChallenge}
                class="bg-black text-white font-black px-4 py-2 rounded hover:bg-gray-800 border-2 border-black"
            >
                + Nouveau challenge
            </button>

            {#if selectedIds.size > 0}
                <button
                    on:click={deleteSelected}
                    class="bg-red-600 text-white font-bold px-4 py-2 rounded hover:bg-red-700 border-2 border-black"
                >
                    Supprimer ({selectedIds.size})
                </button>
            {/if}            
        </div>

        <div class="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
            <table class="w-full table-fixed">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="w-10 py-4 px-3"></th>
                        <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Id</th>
                        <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Titre</th>
                        <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Description</th>
                        <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Date de début</th>
                        <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Date de fin</th>
                        <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Image</th>
                        <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Archivé</th>
                        <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    {#each challenges as challenge (challenge.id)}
                        <tr>
                            <td class="py-4 px-3 border-b border-gray-200">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.has(challenge.id)}
                                    on:change={() => toggleSelect(challenge.id)}
                                    class="w-4 h-4 cursor-pointer accent-black"
                                />
                            </td>
                            <td class="py-4 px-6 border-b border-gray-200">{challenge.id}</td>
                            <td class="py-4 px-6 border-b border-gray-200">
                                <input
                                    type="text"
                                    bind:value={challenge.titleTheme}
                                    class="w-full border border-transparent hover:border-gray-300 focus:border-black rounded px-1 py-0.5 bg-transparent focus:bg-white outline-none"
                                />
                            </td>
                            <td class="py-4 px-6 border-b border-gray-200">
                                <textarea
                                    bind:value={challenge.descriptionTheme}
                                    rows="2"
                                    class="w-full border border-transparent hover:border-gray-300 focus:border-black rounded px-1 py-0.5 bg-transparent focus:bg-white outline-none resize-none"
                                />
                            </td>
                            <td class="py-4 px-6 border-b border-gray-200">
                                <input
                                    type="date"
                                    bind:value={challenge.startDate}
                                    class="border border-gray-300 rounded px-2 py-1 focus:border-black outline-none"
                                />
                            </td>
                            <td class="py-4 px-6 border-b border-gray-200">
                                <input
                                    type="date"
                                    bind:value={challenge.endDate}
                                    class="border border-gray-300 rounded px-2 py-1 focus:border-black outline-none"
                                />
                            </td>
                            <td class="py-4 px-6 border-b border-gray-200">
                                <input
                                    type="file"
                                    id="file-{challenge.id}"
                                    accept="image/*"
                                    class="hidden"
                                    on:change={(e) => handleImageSelect(e, challenge)}
                                />

                                {#if challenge.previewUrl || (challenge.photoUrl && !challenge.deleteImageFlag)}
                                    <img
                                        src={challenge.previewUrl || challenge.photoUrl}
                                        alt="Preview"
                                        class="w-16 h-16 object-cover cursor-pointer rounded border border-gray-200 hover:opacity-80"
                                        on:click={() => fullScreenImage = challenge.previewUrl || challenge.photoUrl}
                                    />
                                {:else}
                                    <button
                                        on:click={() => triggerFileInput(challenge.id)}
                                        class="text-sm border-2 border-dashed border-gray-400 rounded px-3 py-2 hover:border-black hover:bg-gray-50 transition"
                                    >
                                        Charger une image
                                    </button>
                                {/if}
                            </td>
                            <td class="py-4 px-6 border-b border-gray-200 text-center">
                                <input
                                    type="checkbox"
                                    checked={challenge.isArchived == 1}
                                    on:change={(e) => {
                                        challenge.isArchived = e.target.checked ? 1 : 0;
                                        challenges = [...challenges];
                                    }}
                                    class="w-5 h-5 cursor-pointer accent-black"
                                />
                            </td>
                            <td class="py-4 px-6 border-b border-gray-200">
                                <button
                                    on:click={() => handleSave(challenge)}
                                    disabled={challenge.isSaving}
                                    class="bg-black text-white font-bold px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50 transition"
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

    {#if fullScreenImage}
        <div
            class="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center gap-4"
            on:click|self={() => fullScreenImage = null}
        >
            <img src={fullScreenImage} alt="Plein écran" class="max-h-[75vh] max-w-[90vw] rounded shadow-2xl" />
            <div class="flex gap-4">
                <button
                    class="bg-white text-black font-bold px-4 py-2 rounded hover:bg-gray-100 border-2 border-black"
                    on:click={() => {
                        const challenge = challenges.find(c =>
                            (c.previewUrl || c.photoUrl) === fullScreenImage
                        );
                        if (challenge) markImageForDeletion(challenge);
                        fullScreenImage = null;
                    }}
                >
                    Supprimer
                </button>
                <button
                    class="bg-black text-white font-bold px-4 py-2 rounded hover:bg-gray-800 border-2 border-black"
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
            </div>
        </div>
    {/if}    
</div>