import type { OtherUser } from "./user";

export interface Comment {
    id: number;
    textContent: string;
    commentDate: string;
    participationId: number;
    user: OtherUser;
}