import type { OtherUser } from "./user";

export interface HasParticipated {
	hasParticipated: boolean;
	participation: Participation;
}

export interface Participation {
	id: number;
	photoUrl: string;
	submissionDate: string;
	isVisible: number;
	user: OtherUser;
}

export interface UserParticipation {
    id: number;
    photoUrl: string | null;
    submissionDate: string;
    isVisible: boolean;
    challenge: ChallengeInfo;
    averageScore: number | null;
};