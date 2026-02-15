<script lang="ts">
	import type { PageData } from './$types';
    import { fade } from 'svelte/transition';
    import { generateUserColor } from '$lib/utils/colors';

	export let data: PageData;

    // On récupère les données chargées par le serveur
	$: ({ profileUser, isOwner } = data);
    
    // Mode édition
    let isEditMode = false;

    // Pour notifier qu'on est en attente d'une réponse
    let isLoading = false;
    
    // Données du formulaire
    let formData = {
        firstname: '',
        lastname: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    };
    
    // On génère une couleur aléatoire pour le fond de l'utilisateur
    $: headerColor = generateUserColor(profileUser.id, profileUser.registrationDate);
    
    // On formate la date pour l'affichage
    $: joinDate = new Date(profileUser.registrationDate).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    function handleSettingsClick(e: MouseEvent) {
        e.preventDefault();
        alert('Non disponible pour le moment');
    }
    
    function handleEditClick(e: MouseEvent) {
        e.preventDefault();
        
        // On initialise le formulaire avec les données actuelles
        formData = {
            firstname: profileUser.firstname,
            lastname: profileUser.lastname,
            email: profileUser.email,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        };

        isEditMode = true;
    }
    
    function handleCancel() {
        isEditMode = false;

        // On réinitialise le formulaire
        formData = {
            firstname: '',
            lastname: '',
            email: '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
    }
    
    async function handleSubmit(event: Event) {
        event.preventDefault();
        
        // Vérifier si le mot de passe et la confirmation correspondent
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
        
        // Vérifier si on essaie de modifier l'email ou le mot de passe sans l'ancien mot de passe
        const emailChanged = formData.email !== profileUser.email;
        const passwordChanged = formData.newPassword.trim() !== '';
        
        if ((emailChanged || passwordChanged) && !formData.currentPassword) {
            alert('Vous devez fournir votre mot de passe actuel pour modifier l\'email ou le mot de passe');
            return;
        }
        
        // Préparer les données à envoyer
        const updateData: any = {};
        
        if (formData.firstname !== profileUser.firstname) {
            updateData.firstname = formData.firstname;
        }
        
        if (formData.lastname !== profileUser.lastname) {
            updateData.lastname = formData.lastname;
        }
        
        if (emailChanged) {
            updateData.email = formData.email;
        }
        
        if (passwordChanged) {
            updateData.password = formData.newPassword;
        }
        
        // Vérifier qu'il y a au moins un champ modifié
        if (Object.keys(updateData).length === 0) {
            alert('Aucune modification détectée');
            return;
        }
        
        // On ajoute le mot de passe actuel si nécessaire
        if (formData.currentPassword) {
            updateData.currentPassword = formData.currentPassword;
        }
        
        isLoading = true;
        
        try {
            const response = await fetch('/api/users/me', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                // On raffraichit la page si y'a eu un succès
                window.location.reload();
            } else {
                // On affiche le message d'erreur si y'a eu une erreur
                alert(result.message || 'Une erreur est survenue');
            }
        } catch (error) {
            alert('Erreur de connexion au serveur');
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="min-h-screen font-sora py-12 px-4 relative overflow-hidden flex items-center justify-center">
    <!-- Zone décorative -->
    <div class="absolute top-10 left-10 w-20 h-20 bg-neo-green rounded-full border-4 border-black hidden md:block"></div>
    <div class="absolute bottom-20 right-10 w-16 h-16 bg-neo-pink border-4 border-black rotate-12 hidden md:block"></div>

    <!-- Carte de profil -->
    <div class="w-full max-w-4xl bg-white border-[4px] border-black shadow-neo-xl relative z-10" in:fade={{ duration: 300 }}>    
        <!-- En tête -->
        <div 
            class="h-48 w-full border-b-[4px] border-black relative overflow-hidden"
            style="background-color: {headerColor};"
        >
        </div>

        <!-- Corps du profil -->
        <div class="px-8 pb-12 relative">
            
            {#if !isEditMode}
                <!-- Quand on n'est pas en mode édition -->
                
                <!-- Avatar -->
                <div class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div class="w-32 h-32 rounded-full border-[4px] border-black bg-white flex items-center justify-center text-3xl font-extrabold shadow-neo-md overflow-hidden z-20">
                         {`${profileUser.firstname.charAt(0)}${profileUser.lastname.charAt(0)}`.toUpperCase()}
                    </div>
                </div>

                <div class="flex justify-between items-start pt-4 min-h-[60px]">
                    <!-- Si c'est l'utilisateur de la page, on affiche ces boutons -->
                    {#if isOwner}
                        <!-- Bouton paramètres -->
                        <button on:click={handleSettingsClick} class="group flex items-center gap-2 font-bold uppercase text-sm hover:underline">
                            <div class="w-10 h-10 bg-neo-lilac border-[3px] border-black flex items-center justify-center shadow-neo-sm transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span class="hidden sm:inline">Paramètres</span>
                        </button>

                        <!-- Bouton modifier -->
                        <button on:click={handleEditClick} class="group flex items-center gap-2 font-bold uppercase text-sm hover:underline flex-row-reverse">
                            <div class="w-10 h-10 bg-electric-yellow border-[3px] border-black flex items-center justify-center shadow-neo-sm transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                            <span class="hidden sm:inline">Modifier</span>
                        </button>
                    {:else}
                        <div></div>
                        <div></div>
                    {/if}
                </div>

                <!-- Infos Utilisateur -->
                <div class="mt-12 text-center">
                    <h1 class="text-4xl font-extrabold uppercase tracking-tight mb-2">
                        {profileUser.firstname} {profileUser.lastname}
                    </h1>
                    
                     <!-- Si l'utilisateur est administrateur on affiche son badge -->
                    {#if profileUser.isAdmin}
                        <div class="inline-block bg-black text-white px-3 py-1 font-bold text-xs uppercase border-2 border-black shadow-[4px_4px_0px_#C4A1FF] mb-6">
                            Administrateur
                        </div>
                    {/if}

                    <div class="flex flex-col items-center gap-6 mt-6 max-w-lg mx-auto">                    
                        <!-- Date d'inscription -->
                        <div class="text-gray-600 font-medium bg-gray-50 px-4 py-2 border-2 border-black border-dashed">
                            Membre depuis le <span class="font-bold text-black">{joinDate}</span>
                        </div>

                        <!-- Score de l'utilisateur -->
                        <div class="relative group cursor-default">
                            <div class="bg-neo-pink border-[3px] border-black p-6 shadow-neo transition-transform hover:-translate-y-1 hover:shadow-neo-hover">
                                <span class="absolute -top-3 -right-3 bg-white border-2 border-black px-2 py-0.5 text-xs font-black uppercase shadow-neo-sm rotate-6">
                                    Score
                                </span>
                                <div class="text-5xl font-black font-sora">
                                    {profileUser.score}
                                </div>
                                <div class="text-xs font-bold uppercase mt-1 tracking-widest">Points</div>
                            </div>
                        </div>
                    </div>
                </div>
            {:else}
                <!-- Quand on est en mode édition -->
                <div class="mt-8" in:fade={{ duration: 200 }}>
                    <h2 class="text-3xl font-extrabold uppercase tracking-tight mb-6 text-center">Modifier mon profil</h2>
                    
                    <form on:submit={handleSubmit} class="max-w-2xl mx-auto space-y-6">
                        <!-- Section pour les informations personnelles -->
                        <div class="space-y-4">
                            <div class="flex gap-4">
                                <div class="space-y-2 w-1/2">
                                    <label for="firstname" class="block font-extrabold text-sm uppercase tracking-wide">
                                        Prénom
                                    </label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        bind:value={formData.firstname}
                                        required
                                        placeholder="Prénom"
                                        class="w-full bg-gray-50 border-2 border-black p-3 font-medium placeholder-gray-400 focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white transition-all"
                                    />
                                </div>
                                <div class="space-y-2 w-1/2">
                                    <label for="lastname" class="block font-extrabold text-sm uppercase tracking-wide">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        bind:value={formData.lastname}
                                        required
                                        placeholder="Nom"
                                        class="w-full bg-gray-50 border-2 border-black p-3 font-medium placeholder-gray-400 focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            <div class="space-y-2">
                                <label for="email" class="block font-extrabold text-sm uppercase tracking-wide">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    bind:value={formData.email}
                                    required
                                    placeholder="votre@email.com"
                                    class="w-full bg-gray-50 border-2 border-black p-3 font-medium placeholder-gray-400 focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <!-- Séparateur -->
                        <div class="relative my-8">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t-2 border-dashed border-black"></div>
                            </div>
                            <div class="relative flex justify-center">
                                <span class="bg-white px-4 text-sm font-black uppercase tracking-wide border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    Le mot de passe actuel est requis pour les modifications ci-dessous
                                </span>
                            </div>
                        </div>

                        <!-- Section pour les infos de sécurité (email et mot de passe) -->
                        <div class="space-y-4 bg-yellow-50 border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div class="space-y-2">
                                <label for="currentPassword" class="block font-extrabold text-sm uppercase tracking-wide">
                                    Mot de passe actuel
                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    bind:value={formData.currentPassword}
                                    placeholder="••••••••"
                                    class="w-full bg-white border-2 border-black p-3 font-medium placeholder-gray-400 focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                />
                            </div>

                            <div class="space-y-2">
                                <label for="newPassword" class="block font-extrabold text-sm uppercase tracking-wide">
                                    Nouveau mot de passe
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    bind:value={formData.newPassword}
                                    placeholder="••••••••"
                                    class="w-full bg-white border-2 border-black p-3 font-medium placeholder-gray-400 focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                />
                            </div>

                            <div class="space-y-2">
                                <label for="confirmPassword" class="block font-extrabold text-sm uppercase tracking-wide">
                                    Confirmer le nouveau mot de passe
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    bind:value={formData.confirmPassword}
                                    placeholder="••••••••"
                                    class="w-full bg-white border-2 border-black p-3 font-medium placeholder-gray-400 focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                />
                            </div>
                        </div>

                        <!-- Boutons annuler et confirmer -->
                        <div class="flex gap-4 pt-4">
                            <button
                                type="button"
                                on:click={handleCancel}
                                class="flex-1 bg-gray-200 text-black font-bold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_rgba(0,0,0,1)]"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                class="flex-1 bg-black text-white font-bold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:bg-green-400 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Modification...' : 'Modifier'}
                            </button>
                        </div>
                    </form>
                </div>
            {/if}
        </div>
    </div>
</div>