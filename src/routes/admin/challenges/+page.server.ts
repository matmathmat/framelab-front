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

     // Redirection si l'utilisateur n'est pas admin
    if (!currentUser.isAdmin) {
        throw redirect(302, '/');
    }
};