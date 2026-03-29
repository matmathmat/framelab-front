import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import type { ApiResponse, ApiResponseWithPagination } from '$lib/types/apiResponse';
import type { Challenge } from '$lib/types/Challenge';
import type { Participation } from '$lib/types/participation';

export const load: PageServerLoad = async ({ fetch, params, url, parent }) => {
    // Récupérer les données du layout parent
    const { isLoggedIn, currentUser } = await parent();

    // Redirection si non authentifié
    if (!isLoggedIn || !currentUser) {
        throw redirect(302, '/');
    }

    // Récupérer l'offset en parametre url
    const offset = Number(url.searchParams.get('offset')) || 0;
    const limit = 20;

    // On récupère les challenges
    const challengeRes = await fetch(`/api/challenges?offset=${offset}`);

    // On caste la réponse JSON en ApiResponseWithPagination<Challenge> puis on extrait les challenges et la pagination
    const challengesData = await challengeRes.json() as ApiResponseWithPagination<Challenge[]>;
    const challenges = challengesData.result ?? [];
    const totalChallenges = challengesData.pagination?.total ?? 0;

    // Filtrer les challenges encore actifs (exclure si on est entre startDate et endDate)
    const now = new Date();
    const archivedChallenges = challenges.filter((c) => {
        const start = new Date(c.startDate);
        const end = new Date(c.endDate);
        return !(now >= start && now <= end);
    });

    return {
        challenges: archivedChallenges,
        total: totalChallenges,
        offset,
        limit,
    };
};