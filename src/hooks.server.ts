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

            // On reconstruit la réponse pour gérer les cookies proprement
            const body = await response.text();
            const newHeaders = new Headers();

            // On copie tous les headers sauf Set-Cookie
            response.headers.forEach((value, key) => {
                if (key.toLowerCase() !== 'set-cookie') {
                    newHeaders.set(key, value);
                }
            });

            // Si le backend pose un cookie, on le passe via SvelteKit
            const setCookie = response.headers.get('set-cookie');
            if (setCookie) {
                const tokenMatch = setCookie.match(/token=([^;]+)/);
                if (tokenMatch) {
                    // On set le cookie
                    event.cookies.set('token', tokenMatch[1], {
                        path: '/',
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        maxAge: 60 * 60 * 24 * 7
                    });
                }

                // Le backend clear le cookie, on fait pareil
                if (setCookie.includes('Max-Age=0') || setCookie.includes('Expires=Thu, 01 Jan 1970')) {
                    event.cookies.delete('token', { path: '/' });
                }
            }

			// On retourne la réponse du backend
            return new Response(body, {
                status: response.status,
                headers: newHeaders
            });

        } catch (err) {
            console.error("Erreur Proxy Hooks:", err);
            return new Response(
                JSON.stringify({ success: false, message: 'Le serveur backend est injoignable.' }),
                { status: 502, headers: { 'Content-Type': 'application/json' } }
            );
        }
    }

	// Pour toutes les autres requêtes, on laisse SvelteKit gérer
    return resolve(event);
};