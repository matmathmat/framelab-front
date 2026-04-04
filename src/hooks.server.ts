import type { Handle } from '@sveltejs/kit';
import { PRIVATE_BACKEND_URL } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
    // Si la requête commence par /api, on la redirige vers le backend

    if (event.url.pathname.startsWith('/api')) {
        // On clone les headers de la requête originale
        const requestHeaders = new Headers(event.request.headers);
        
        // On construit l'URL cible
        const targetUrl = `${PRIVATE_BACKEND_URL}${event.url.pathname}${event.url.search}`;

        try {
            // Configuration de la requête de proxy
            const proxyRequest: RequestInit = {
                method: event.request.method,
                headers: requestHeaders,

                // On ne passe le corps de la requête que si ce n'est pas un GET ou HEAD
                body: event.request.method !== 'GET' && event.request.method !== 'HEAD' 
                    ? event.request.body 
                    : undefined,
                
                // @ts-ignore
                duplex: 'half'
            };

            const response = await fetch(targetUrl, proxyRequest);

            // On retourne la réponse du backend
            return response;
        } catch (err) {
            console.error("Erreur Proxy Hooks (TS):", err);

            return new Response(
                JSON.stringify({ success: false, message: 'Le serveur backend est injoignable.' }), 
                { status: 502, headers: { 'Content-Type': 'application/json' } }
            );
        }
    }

    // Pour toutes les autres requêtes, on laisse SvelteKit gérer
    return resolve(event);
}