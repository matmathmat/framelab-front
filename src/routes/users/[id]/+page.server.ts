import type { ApiResponse } from '$lib/types/apiResponse';
import type { MyUser } from '$lib/types/user';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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

    // On caste la réponse JSON en ApiResponse<OtherUser> puis on extrait l'user
    const profileJson = await profileRes.json() as ApiResponse<MyUser>;
    const profileUser = profileJson.result;

    // On vérifie si l'utilisateur ciblé est le même que l'utilisateur courant, si oui c'est sa page
    const isOwner = currentUser.id === profileUser.id;

    return {
        profileUser,
        isOwner
    };
};