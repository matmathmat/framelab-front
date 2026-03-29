import type { OtherUser } from "./user";

export interface Vote {
	id: number;
	creativityNote: number;
	technicNote: number;
	respectNote: number;
	voteDate: string;
	user: OtherUser;
}

export interface UserVote {
    id: number;
    creativityNote: number;
    technicNote: number;
    respectNote: number;
    voteDate: string;
    participation: {
        id: number;
        photoUrl: string | null;
        user: {
            id: number;
            firstname: string;
            lastname: string;
        };
    };
    challenge: {
        id: number;
        titleTheme: string;
        startDate: string;
        endDate: string;
        isArchived: boolean;
    };
};