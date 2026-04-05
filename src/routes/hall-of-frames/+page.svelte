<script lang="ts">
    import { fade } from "svelte/transition";
    import type { PageData } from "./$types";

    export let data: PageData;

    $: ({ leaderboard } = data);

    $: filteredLeaderboard = leaderboard.filter(user => user.score > 0);

    const podiumColors = [
        {
            bg: "bg-electric-yellow",
            border: "border-electric-yellow",
            label: "1er",
            shadow: "#B8860B",
        },
        {
            bg: "bg-[#C0C0C0]",
            border: "border-[#C0C0C0]",
            label: "2e",
            shadow: "#707070",
        },
        {
            bg: "bg-[#CD7F32]",
            border: "border-[#CD7F32]",
            label: "3e",
            shadow: "#8B4513",
        },
    ];

    function getRankStyle(index: number) {
        return index < 3 ? podiumColors[index] : null;
    }
</script>

<div
    class="min-h-screen font-sora pb-20 pt-24 px-4 md:px-8"
    in:fade={{ duration: 300 }}
>
    <div class="max-w-4xl mx-auto mb-12">
        <!-- Entête -->
        <div
            class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b-4 border-black pb-6"
        >
            <div>
                <a
                    href="/"
                    class="inline-block text-sm font-bold uppercase hover:bg-black hover:text-white px-2 py-1 transition-colors mb-2"
                >
                    ← Retour à l'accueil
                </a>
                <h1
                    class="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none"
                >
                    Les <span class="text-neo-pink">CLASSEMENT</span>
                </h1>
                <p
                    class="mt-2 font-medium text-gray-600 bg-electric-yellow inline-block px-2 border-2 border-black"
                >
                    Top 10 des membres par score cumulé
                </p>
            </div>
        </div>

        <!-- Liste des membres triés par leur score -->
        {#if filteredLeaderboard.length === 0}
            <div class="p-12 border-4 border-dashed border-black text-center">
                <p class="font-black text-xl uppercase text-gray-400">
                    Aucun membre classé pour le moment
                </p>
            </div>
        {:else}
            <div class="flex flex-col gap-3">
                {#each filteredLeaderboard as user, i}
                    {@const style = getRankStyle(i)}

                    <div class="relative group">
                        <div
                            class="absolute inset-0 translate-x-[3px] translate-y-[3px] transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                            style="background-color: {style
                                ? style.shadow
                                : '#000'};"
                        ></div>

                        <a
                            href={`/users/${user.id}`}
                            class="relative flex items-center gap-4 p-4 bg-white border-[3px] border-black transition-transform group-hover:translate-x-0 group-hover:translate-y-0 -translate-x-[3px] -translate-y-[3px]"
                        >
                            <!-- Badge de rang -->
                            <div
                                class="w-12 h-12 border-[3px] border-black flex items-center justify-center font-black text-sm shrink-0
                                        {style ? style.bg : 'bg-white'}"
                            >
                                {#if style}
                                    {style.label}
                                {:else}
                                    {i + 1}
                                {/if}
                            </div>

                            <!-- Nom -->
                            <div class="flex-1 min-w-0">
                                <p
                                    class="font-black uppercase text-lg leading-none truncate"
                                >
                                    {user.firstname}
                                    {user.lastname}
                                </p>
                            </div>

                            <!-- Score -->
                            <div class="shrink-0 text-right">
                                <span class="font-black text-2xl">{user.score}</span>
                                <span
                                    class="text-xs font-bold uppercase block text-gray-500"
                                    >pts</span
                                >
                            </div>

                            <div
                                class="shrink-0 w-8 h-8 border-2 border-black flex items-center justify-center bg-white group-hover:bg-black group-hover:text-white transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="3"
                                    stroke-linecap="square"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>