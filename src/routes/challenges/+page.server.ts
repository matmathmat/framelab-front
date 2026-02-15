import type { PageServerLoad } from './$types';
import type { ApiResponse } from '$lib/types/apiResponse';
import { redirect } from '@sveltejs/kit';
import type { Challenge } from '$lib/types/Challenge';
import type { HasParticipated } from '$lib/types/participation';

export const load: PageServerLoad = async ({ fetch, parent }) => {
    // Récupérer les données du layout parent
    const { isLoggedIn } = await parent();
    
    // Redirection si non authentifié
    if (!isLoggedIn) {
        throw redirect(302, '/');
    }
    
    // Récupérer le challenge en cours
    const challengeRes = await fetch('/api/challenges/current');
    
    let currentChallenge = null;
    let hasParticipated = false;
    let userParticipation = null;
    
    if (challengeRes.ok) {
        // On caste la réponse JSON en ApiResponse<Challenge> puis on extrait le challenge
        const challengeJson = await challengeRes.json() as ApiResponse<Challenge>;
        currentChallenge = challengeJson.result;
        
        if (currentChallenge) {
            // Si il y a un challenge actif, on vérifie si l'utilisateur a participé
            const participationRes = await fetch(
                `/api/challenges/${currentChallenge.id}/participation`
            );
            
            if (participationRes.ok) {
                // On caste la réponse JSON en ApiResponse<HasParticipated> puis on extrait les données
                const participationJson = await participationRes.json() as ApiResponse<HasParticipated>;
                hasParticipated = participationJson.result.hasParticipated;
                userParticipation = participationJson.result.participation;
            }
        }
    }
    
    return {
        currentChallenge,
        hasParticipated
        //userParticipation
    };
};