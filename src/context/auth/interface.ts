import { UserInterface, Views, Permissions } from '../../interfaces/auth';

export interface User {
	email: string;
	login: string;
}

export interface ContextAuth {
	user: UserInterface | null;
	views: Views | {};
	permiss: Permissions[] | [];
}
