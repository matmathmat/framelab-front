import type { ApiResponse } from '$lib/types/apiResponse';
import type { MyUser } from '$lib/types/user';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { UserParticipation } from '$lib/types/participation';
import type { UserVote } from '$lib/types/vote';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const targetUserId = params.id;

    // On récupère l'utilisateur courant
    const meRes = await fetch('/api/users/me');

    // Redirection si non authentifié
    if (meRes.status === 401 || meRes.status === 403) {
        throw redirect(302, '/');
    }

    // On caste la réponse JSON en ApiResponse<MyUser> puis on extrait l'user
    const meJson = await meRes.json() as ApiResponse<MyUser>;
    const currentUser = meJson.result;

    // On récupère l'utilisateur ciblé
    const profileRes = await fetch(`/api/users/${targetUserId}`);

    if (!profileRes.ok) {
        throw error(404, 'Utilisateur introuvable');
    }

    // On caste la réponse JSON en ApiResponse<MyUser> puis on extrait l'user
    const profileJson = await profileRes.json() as ApiResponse<MyUser>;
    const profileUser = profileJson.result;

    // On vérifie si l'utilisateur ciblé est le même que l'utilisateur courant, si oui c'est sa page
    const isOwner = currentUser.id === profileUser.id;

    // On récupère les participations et les votes de l'utilisateur ciblé en parallèle
    const [participationsRes, votesRes] = await Promise.all([
        fetch(`/api/users/${targetUserId}/participations`),
        fetch(`/api/users/${targetUserId}/votes`)
    ]);

    const participations: UserParticipation[] = participationsRes.ok
        ? ((await participationsRes.json() as ApiResponse<UserParticipation[]>).result ?? [])
        : [];

    const votes: UserVote[] = votesRes.ok
        ? ((await votesRes.json() as ApiResponse<UserVote[]>).result ?? [])
        : [];

    return {
        profileUser,
        isOwner,
        participations,
        votes
    };
};