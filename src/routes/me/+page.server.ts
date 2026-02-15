import type { ApiResponse } from '$lib/types/apiResponse';
import type { MyUser } from '$lib/types/user';
import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    // On récupère l'utilisateur courant
    const res = await fetch('/api/users/me');

    // Redirection si non authentifié
    if (res.status === 401 || res.status === 403) {
        throw redirect(302, '/');
    }

    // On caste la réponse JSON en ApiResponse<MyUser>
    const json = await res.json() as ApiResponse<MyUser>;
    
    // On extrait l'user
    const me = json.result;

    // On le redirige vers sa page profil public
    throw redirect(302, `/users/${me.id}`);
};