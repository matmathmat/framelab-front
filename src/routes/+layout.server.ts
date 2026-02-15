import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
    try {
        // On vérifie si l'utilisateur est connecté
        const meRes = await fetch('/api/users/me');
        
        if (meRes.ok) {
            const meJson = await meRes.json();
            return {
                isLoggedIn: true,
                currentUser: meJson.result
            };
        }
        
        return {
            isLoggedIn: false
        };
    } catch (error) {
        // Si il y'a erreur, on considère l'utilisateur comme non connecté
        return {
            isLoggedIn: false
        };
    }
};