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

    // Récupérer l'id du challenge passé en parametre url
    const challengeId = params.id;

    // Récupérer l'offset en parametre url
    const offset = Number(url.searchParams.get('offset')) || 0;
    const limit = 20;

    // On récupère le challenge
    const challengeRes = await fetch(`/api/challenges/${challengeId}`);

    // Si on n'arrive pas à récupérer le challenge on redirige vers la page challenges
    if (!challengeRes.ok) throw redirect(302, '/challenges');

    // On caste la réponse JSON en ApiResponse<Challenge> puis on extrait le challenge
    const challengeData = await challengeRes.json() as ApiResponse<Challenge>;
    const challenge = challengeData.result;

    const now = new Date();
    const isActive = challenge
        ? now >= new Date(challenge.startDate) && now <= new Date(challenge.endDate)
        : false;
    const isPast = challenge
        ? now > new Date(challenge.endDate)
        : false;    

    // On récupère les participations + données de la pagination
    const participationsRes = await fetch(
        `/api/participations?challengeId=${challengeId}&offset=${offset}${isPast ? '&sortByScore=true' : ''}`
    );

    // On caste la réponse JSON en ApiResponseWithPagination<Participation> puis on extrait les participations et la pagination
    const participationsData = await participationsRes.json() as ApiResponseWithPagination<Participation[]>;
    const participations = participationsData.result ?? [];
    const totalParticipations = participationsData.pagination?.total ?? 0;

    // Pour chaque participation, on vérifier si l'utilisateur courant a voté
    const participationsWithVotes = await Promise.all(participations.map(async (p: Participation) => {
        let myVote = null;

        // On récupère uniquement le vote de l'utilisateur courant pour cette participation
        const voteRes = await fetch(`/api/votes?participationId=${p.id}&userId=${currentUser.id}`);

        if (voteRes.ok) {
            // On caste la réponse JSON en ApiResponse<Vote> puis on extrait le vote
            const voteData = await voteRes.json() as ApiResponse<any>;
            myVote = voteData.result ?? null;
        }

        return {
            ...p,
            currentUserVote: myVote,
            isMyParticipation: Number(p.user.id) === Number(currentUser.id)
        };
    }));

    return {
        challenge,
        participations: participationsWithVotes,
        total: totalParticipations,
        offset,
        limit,
        currentUser,
        isActive,
        isPast,
    };
};

export const actions: Actions = {
    vote: async ({ request, fetch }) => {
        // Récupérer les données du formulaire
        const formData = await request.formData();
        const participationId = formData.get('participationId');
        const creativity = formData.get('creativity');
        const technic = formData.get('technic');
        const respect = formData.get('respect');

        // Vérifier que toutes les notes sont présentes
        if (!participationId || !creativity || !technic || !respect) {
            return fail(400, { missing: true, message: "Toutes les notes sont requises." });
        }

        // On envoie le vote à l'API
        const res = await fetch('/api/votes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                participationId: participationId,
                creativityNote: Number(creativity),
                technicNote: Number(technic),
                respectNote: Number(respect)
            })
        });

        // Si l'API retourne une erreur on la transmet au client
        if (!res.ok) {
            const err = await res.json();
            return fail(res.status, { error: true, message: err.message || "Erreur lors du vote" });
        }

        return { success: true, message: "Vote enregistré !" };
    },

    comment: async ({ request, fetch }) => {
        // Récupérer les données du formulaire
        const formData = await request.formData();
        const participationId = formData.get('participationId');
        const content = formData.get('content');

        // Vérifier que le commentaire et la participation sont présents
        if (!participationId || !content) {
            return fail(400, { missing: true, message: "Le commentaire ne peut pas être vide." });
        }

        // On envoie le commentaire à l'API
        const res = await fetch('/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                participationId: participationId,
                textContent: content
            })
        });

        // Si l'API retourne une erreur on la transmet au client
        if (!res.ok) {
            const err = await res.json();
            return fail(res.status, { error: true, message: err.message || "Erreur lors de l'envoi" });
        }

        return { success: true, message: "Commentaire posté !" };
    },

    archive: async ({ fetch, params }) => {
        // Requête pour archiver un challenge, l'utilisateur doit être admin
        const res = await fetch(`/api/challenges/${params.id}/archive`, {
            method: 'POST'
        });

        // Si l'API retourne une erreur on la transmet au client
        if (!res.ok) {
            const err = await res.json();
            return fail(res.status, { error: true, message: err.message || "Erreur lors de la validation" });
        }

        return { success: true };
    }    
};