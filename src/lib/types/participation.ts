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