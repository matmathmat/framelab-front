import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ApiResponse } from '$lib/types/apiResponse';

export const load: PageServerLoad = async ({ fetch, parent }) => {
    const { isLoggedIn } = await parent();

    if (!isLoggedIn) {
        throw redirect(302, '/');
    }

    const res = await fetch('/api/leaderboard');

    if (!res.ok) {
        return { leaderboard: [] };
    }

    const data = await res.json() as ApiResponse<any[]>;

    return {
        leaderboard: data.result ?? []
    };
};