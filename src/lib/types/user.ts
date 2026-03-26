export interface MyUser {
	id: number;
	firstname: string;
	lastname: string;
	isAdmin: number;
	isActive: number;
	score: number;
	registrationDate: string;
	email: string;
}

export interface OtherUser {
	id: number;
	firstname: string;
	lastname: string;
	isAdmin: number;
	score: number;
	registrationDate: string;
}