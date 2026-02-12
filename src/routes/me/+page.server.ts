import type { ApiResponse } from '$lib/types/apiResponse';
import type { MyUser } from '$lib/types/user';
import type { PageServerLoad } from './$types';
import { redirect, error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
    const res = await fetch('/api/users/me', {});

    // Redirection si non authentifié
    if (res.status === 401 || res.status === 403) {
        throw redirect(302, '/');
    }

    // On traite les autres type d'erreur comme erreur serveur
    if (!res.ok) {
        throw error(res.status, 'Erreur serveur');
    }

    // On caste la réponse JSON en ApiResponse<MyUser>
    const json = await res.json() as ApiResponse<MyUser>;

    // On extrait l'user
    const user = json.result;

    console.log(user);

    return {
        user
    };
};