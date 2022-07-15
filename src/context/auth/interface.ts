export interface User {
	email: string;
	login: string;
}

export interface ContextAuth {
	user: User | null;
}
