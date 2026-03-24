<script>
	import { fade } from 'svelte/transition';

    // Import images
    import background from '$lib/assets/images/login/background.png';

	// État connexion
	let isLoginMode = true;
	let isLoading = false;
	
	// État pour animation images
	let hoverImage = false;
	let hoverTabs = false;
	let focusTabs = false;
	$: isImageColored = hoverImage || hoverTabs || focusTabs;

	// @ts-ignore
	async function submitLogin(event) {
        // On notifie qu'on est en cours de chargement
		isLoading = true;

        // On capture le form pour récupérer ses données
        const form = event.target;
        const data = {
            email: form.email.value,
            password: form.password.value
        }

        // on fait une requete api pour se log
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        // On lit le résultat
        const result = await response.json();

		// Fin du chargement
        isLoading = false;

        // Si erreur on affiche un message d'erreur et on quitte
        if (!result.success) {
            alert(result.message != undefined ? result.message : 'Une erreur est survenue');
            return;
        }

        // Si on a réussit on redirige vers la page de l'utilisateur
		// on utilise window.location.href pour forcer le raffraichissement car goto ne le fait pas
		window.location.href = '/me';  
	}

    // @ts-ignore
	async function submitRegister(event) {
        // On capture le form pour récupérer ses données
        const form = event.target;
        const data = {
            firstname: form.firstname.value,
            lastname: form.lastname.value,
            email: form.email.value,
            password: form.password.value,
            confirmPassword: form.confirmPassword.value
        }

		if (data.password !== data.confirmPassword) {
			alert('Les mots de passe ne correspondent pas');
			return;
		}

        // On notifie qu'on est en cours de chargement
		isLoading = true;

		try {
            // on supprime la confirmation mdp des data
			delete data.confirmPassword;
            
            // on fait une requete api pour s'inscrire
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})

			// On lit le résultat
			const result = await response.json();			
		} catch (error) {
			alert(error);
		} finally {

            // Fin du chargement
			isLoading = false;
		}
	}
</script>

<section class="min-h-screen flex items-center justify-center p-6 font-sora overflow-hidden relative">
	<!-- Zone décorative -->
    <!-- Cercle-->
    <div class="absolute top-10 left-10 hidden md:block">
        <div class="w-32 h-32 bg-green-400 border-4 border-black rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"></div>
    </div>

    <!-- Etoile -->
    <div class="absolute top-20 right-20 hidden lg:block rotate-12">
        <div class="relative group cursor-default">
            <svg viewBox="0 0 200 200" class="w-48 h-48 drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] text-purple-400 fill-current animate-spin-slow duration-700">
                <path d="M100 0 L125 75 L200 100 L125 125 L100 200 L75 125 L0 100 L75 75 Z" stroke="black" stroke-width="3"/>
            </svg>
            <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-black text-xl bg-white border-2 border-black px-2 -rotate-12">WOW!</span>
        </div>
    </div>

    <!-- Journal -->
    <div class="absolute bottom-10 left-20 hidden lg:block -rotate-6 z-0">
        <div class="w-40 h-40 border-4 border-black bg-yellow-300 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
            <span class="font-black text-4xl">★</span>
        </div>
    </div>

    <!-- Texte arrière plan -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 z-0 overflow-hidden">
        <h1 class="text-[20vw] font-black tracking-tighter leading-none whitespace-nowrap">FRAME LAB</h1>
    </div>

     <!-- Zone central -->
	<div class="relative max-w-5xl w-full mt-10 mb-32 z-10">
        <!-- Mini caré sur le coin haut gauche -->
        <div class="absolute -top-4 -left-4 w-8 h-8 bg-black border-4 border-white z-20"></div>
        
        <!-- Mini caré sur le coin bas droite -->
        <div class="absolute -bottom-4 -right-4 w-8 h-8 bg-black border-4 border-white z-20"></div>
        
        <!-- Container image -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div 
			class="border-8 border-black z-0 relative bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]"
			on:mouseenter={() => hoverImage = true}
			on:mouseleave={() => hoverImage = false}
		>
			<img
				src={background}
				alt="FrameLab Creation"
				class="w-full h-[420px] object-cover transition-all duration-300 {isImageColored ? '' : 'grayscale'}" 
			/>
		</div>

		<!-- Overlay tab control connexion / création compte -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div 
			class="absolute left-1/2 -translate-x-1/2 z-10 w-full max-w-[480px]" 
			style="top: 150px;"
			on:mouseenter={() => hoverTabs = true}
			on:mouseleave={() => hoverTabs = false}
			on:focusin={() => focusTabs = true}
			on:focusout={() => focusTabs = false}
		>
			<div class="flex flex-col">
				<div class="flex pl-2 gap-2 translate-y-[3px] z-10">
					<!-- Onglet connexion -->
					<button
						on:click={() => (isLoginMode = true)}
						class="flex-1 py-3 px-4 font-bold uppercase border-t-[3px] border-x-[3px] border-b-0 border-black rounded-t-lg transition-all duration-200 
                        {isLoginMode
							? 'bg-pink-400 -translate-y-1 pb-4 text-black'
							: 'bg-gray-100 text-gray-500 hover:bg-gray-200'}"
					>
						Connexion
					</button>

					<!-- Onglet inscription -->
					<button
						on:click={() => (isLoginMode = false)}
						class="flex-1 py-3 px-4 font-bold uppercase border-t-[3px] border-x-[3px] border-b-0 border-black rounded-t-lg transition-all duration-200 
                        {!isLoginMode
							? 'bg-yellow-300 -translate-y-1 pb-4 text-black'
							: 'bg-gray-100 text-gray-500 hover:bg-gray-200'}"
					>
						Inscription
					</button>
				</div>

				<div class="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 relative z-20">
					{#if isLoginMode}
						<!-- Formulaire connexion -->
						<form
							on:submit|preventDefault={submitLogin}
							in:fade={{ duration: 200 }}
							class="flex flex-col gap-5"
						>
							<div class="space-y-2">
								<label for="email" class="block font-extrabold text-sm uppercase tracking-wide"
									>Email</label
								>
								<input
									type="email"
									name="email"
									required
									placeholder="votre@email.com"
									class="w-full bg-gray-50 border-2 border-black p-3 font-medium placeholder-gray-400 focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white transition-all"
								/>
							</div>

							<div class="space-y-2">
								<label for="password" class="block font-extrabold text-sm uppercase tracking-wide"
									>Mot de passe</label
								>
								<input
									type="password"
									name="password"
									required
									placeholder="••••••••"
									class="w-full bg-gray-50 border-2 border-black p-3 font-medium placeholder-gray-400 focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white transition-all"
								/>
							</div>

							<button
								type="submit"
								disabled={isLoading}
								class="mt-4 w-full bg-black text-white font-bold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:bg-green-400 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLoading ? 'Chargement...' : 'Se connecter'}
							</button>
						</form>
					{:else}
						<!-- Formulaire inscription -->
						<form
							on:submit|preventDefault={submitRegister}
							in:fade={{ duration: 200 }}
							class="flex flex-col gap-4"
						>
							<div class="flex gap-4">
								<div class="space-y-2 w-1/2">
									<label for="lastname" class="block font-extrabold text-xs uppercase">Nom</label>
									<input
										type="text"
										name="lastname"
										required
										placeholder="Monsieur"
										class="w-full bg-gray-50 border-2 border-black p-3 text-sm focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
									/>
								</div>
								<div class="space-y-2 w-1/2">
									<label for="firstname" class="block font-extrabold text-xs uppercase"
										>Prénom</label
									>
									<input
										type="text"
										name="firstname"
										required
										placeholder="Dupont"
										class="w-full bg-gray-50 border-2 border-black p-3 text-sm focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
									/>
								</div>
							</div>

							<div class="space-y-2">
								<label for="email" class="block font-extrabold text-xs uppercase">Email</label>
								<input
									type="email"
									name="email"
									required
									placeholder="votre@email.com"
									class="w-full bg-gray-50 border-2 border-black p-3 text-sm focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
								/>
							</div>

							<div class="space-y-2">
								<label for="password" class="block font-extrabold text-xs uppercase"
									>Mot de passe</label
								>
								<input
									type="password"
									name="password"
									required
									placeholder="••••••••"
									class="w-full bg-gray-50 border-2 border-black p-3 text-sm focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
								/>
							</div>

							<div class="space-y-2">
								<label for="confirmPassword" class="block font-extrabold text-xs uppercase"
									>Confirmer</label
								>
								<input
									type="password"
									name="confirmPassword"
									required
									placeholder="••••••••"
									class="w-full bg-gray-50 border-2 border-black p-3 text-sm focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
								/>
							</div>

							<button
								type="submit"
								disabled={isLoading}
								class="mt-4 w-full bg-white text-black font-bold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#000] hover:bg-yellow-300 disabled:opacity-50"
							>
								{isLoading ? 'Création...' : 'Créer mon compte'}
							</button>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>