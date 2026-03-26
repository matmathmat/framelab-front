import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
    const token = url.searchParams.get('validationToken');

    if (!token) {
        throw redirect(302, '/login');
    }

    try {
        const params = new URLSearchParams();
        params.set('validationToken', token);
        
        const response = await fetch(`/api/auth/validate?${params.toString()}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();

        console.log(result);

        if (!result.success) {
            return { success: false, message: result.message ?? 'Token invalide ou expiré.' };
        }

        return { success: true };

    } catch {
        return { success: false, message: 'Une erreur est survenue.' };
    }
};