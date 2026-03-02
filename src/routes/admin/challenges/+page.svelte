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
                const newChallenges = json.result ?? [];
                
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

    async function handleSave(challenge: any) {
        const formData = new FormData();
        formData.append('titleTheme', challenge.titleTheme);
        formData.append('descriptionTheme', challenge.descriptionTheme);
        formData.append('startDate', challenge.startDate);
        formData.append('endDate', challenge.endDate);
        
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
            const res = await fetch(`/api/challenges/${challenge.id}`, {
                method: 'PUT',
                body: formData
            });

            if (res.ok) {
                const updated = await res.json();
                const index = challenges.findIndex(c => c.id === challenge.id);
                if (index !== -1) {
                    challenges[index] = { ...updated.result, isSaving: false, newFile: null, deleteImageFlag: false, previewUrl: null };
                }
                alert("Challenge mis à jour !");
            } else {
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

</script>

<div class="min-h-screen font-sora pb-20 pt-24 px-4 md:px-8">
    <div class="max-w-7xl mx-auto">     
        <!-- Header -->
        <div class="mb-12 border-b-4 border-black pb-6 flex justify-between items-end">
            <div>
                <h1 class="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2">
                    Panneau <span class="text-neo-pink bg-black px-2">Administrateur</span>
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
        </div>

        <div class="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
            <table class="w-full table-fixed">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Id</th>
                        <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Titre</th>
                        <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Description</th>
                        <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Date de début</th>
                        <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Date de fin</th>
                        <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Image</th>
                        <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Archivé</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    {#each challenges as challenge (challenge.id)}
                        <tr>
                            <td class="py-4 px-6 border-b border-gray-200">{challenge.id}</td>
                            <td class="py-4 px-6 border-b border-gray-200">{challenge.titleTheme}</td>
                            <td class="py-4 px-6 border-b border-gray-200">{challenge.descriptionTheme}</td>
                            <td class="py-4 px-6 border-b border-gray-200">{challenge.startDate}</td>
                            <td class="py-4 px-6 border-b border-gray-200">{challenge.endDate}</td>
                            {#if challenge.previewUrl || (challenge.photoUrl && !challenge.deleteImageFlag)}
                                <td class="py-4 px-6 border-b border-gray-200">
                                    <img 
                                        src={challenge.previewUrl || challenge.photoUrl} 
                                        alt="Preview" 
                                        class="w-full h-full object-cover"
                                    />                                    
                                </td>
                            {:else}
                                <td class="py-4 px-6 border-b border-gray-200"></td>
                            {/if}
                            <td class="py-4 px-6 border-b border-gray-200">{challenge.isArchived == 1 ? "Vrai" : "Faux"}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>