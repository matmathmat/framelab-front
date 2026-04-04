import type { LayoutServerLoad } from './$types';
import { PRIVATE_BACKEND_URL } from '$env/static/private';

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
    // On récupère le token
    const token = cookies.get('token');

    // S'il n'y a pas de token -> l'utilisateur n'est pas connecté
    if (!token) {
        return {
            isLoggedIn: false
        };
    }

    try {
        // On vérifie si l'utilisateur est connecté
        const meRes = await fetch(`${PRIVATE_BACKEND_URL}/api/users/me`, {
            headers: {
                'Cookie': `token=${token}`
            }
        });
        
        if (meRes.ok) {
            const meJson = await meRes.json();
            return {
                isLoggedIn: true,
                currentUser: meJson.result
            };
        }
        
        // Si le token est invalide ou expiré -> l'utilisateur n'est pas connecté
        return {
            isLoggedIn: false
        };
    } catch (error) {
        // Si il y'a erreur, on considère l'utilisateur comme non connecté
        console.error("Erreur chargement utilisateur (SSR):", error);
        return {
            isLoggedIn: false
        };
    }
};