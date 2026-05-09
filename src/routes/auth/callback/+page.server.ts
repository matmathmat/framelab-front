import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PRIVATE_BACKEND_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ url, cookies }) => {
    // Récupère le short token envoyé par le backend OAuth
    const shortToken = url.searchParams.get('shortToken');

    // URL de redirection après authentification
    const redirectTo = url.searchParams.get('redirect') ?? '/';

    // Si il n'y a pas de short token, on redirige directement vers la page sans tenter la connexion
    if (!shortToken) {
        throw redirect(302, redirectTo);
    }

    try {
        // On échange le short token contre un vrai tokende session
        const res = await fetch(
            `${PRIVATE_BACKEND_URL}/api/auth/exchange-token?shortToken=${shortToken}`
        );

        if (res.ok) {
            // On récupère le header Set-Cookie renvoyé par le backend
            const setCookie = res.headers.get('set-cookie');

            if (setCookie) {
                // On extrait uniquement la valeur du cookie yoken
                const tokenMatch = setCookie.match(/token=([^;]+)/);

                if (tokenMatch) {
                    cookies.set('token', tokenMatch[1], {
                        path: '/',
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        maxAge: 60 * 60 * 24 * 7
                    });
                }
            }
        }
    } catch (err) {
        // Échec silencieux
        console.error('[auth/callback] Erreur échange short token :', err);
    }

    // on laisse l'utilisateur arriver sur la page sans session
    throw redirect(302, redirectTo);
};