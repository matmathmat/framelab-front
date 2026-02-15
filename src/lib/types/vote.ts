import type { OtherUser } from "./user";

export interface Vote {
	id: number;
	creativityNote: number;
	technicNote: number;
	respectNote: number;
	voteDate: string;
	user: OtherUser;
}