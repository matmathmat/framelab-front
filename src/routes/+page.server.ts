import type { PageServerLoad } from './$types';
import type { ApiResponse } from '$lib/types/apiResponse';

export const load: PageServerLoad = async ({ fetch, parent }) => {
    let topUsers: any[] = [];

    const res = await fetch('/api/leaderboard');
    if (res.ok) {
        const data = await res.json() as ApiResponse<any[]>;
        topUsers = (data.result ?? []).slice(0, 3);
    }

    return { topUsers };
};