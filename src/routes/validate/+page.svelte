<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import type { PageData } from './$types';

    export let data: PageData;

    let countdown = 5;

    onMount(() => {
        if (data.success) {
            const interval = setInterval(() => {
                countdown -= 1;
                if (countdown <= 0) {
                    clearInterval(interval);
                    window.location.href = '/login';
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    });
</script>

<section class="min-h-screen flex items-center justify-center p-6 font-sora">
    <div class="border-8 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-12 max-w-md w-full text-center" in:fade>

        {#if data.success}
            <div class="flex flex-col items-center gap-6">
                <div class="w-20 h-20 bg-green-400 border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span class="text-4xl font-black">✓</span>
                </div>
                <h1 class="text-3xl font-black uppercase">Compte validé !</h1>
                <p class="font-medium text-gray-600">
                    Ton compte a bien été activé. Tu vas être redirigé vers la page de connexion dans <span class="font-black text-black">{countdown}</span> seconde{countdown > 1 ? 's' : ''}...
                </p>
                <a
                
                    href="/login"
                    class="mt-2 w-full bg-black text-white font-bold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all hover:bg-green-400 hover:text-black hover:translate-x-0.5 hover:translate-y-0.5"
                >
                    Se connecter maintenant
                </a>
            </div>
        {:else}
            <div class="flex flex-col items-center gap-6">
                <div class="w-20 h-20 bg-red-400 border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span class="text-4xl font-black">✕</span>
                </div>
                <h1 class="text-3xl font-black uppercase">Lien invalide</h1>
                <p class="font-medium text-gray-600">{data.message}</p>
                <a
                
                    href="/login"
                    class="mt-2 w-full bg-white text-black font-bold uppercase py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-yellow-300 hover:translate-x-0.5 hover:translate-y-0.5"
                >
                    Retour à la connexion
                </a>
            </div>
        {/if}

    </div>
</section>