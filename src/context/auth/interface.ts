import { UserInterface, Views, Permissions } from '../../interfaces/auth';

export interface User {
	email: string;
	login: string;
}

export interface ContextAuth {
	user: UserInterface | null;
	views: String[] | [];
	permiss: Permissions[] | [];
	handleLogin: (user: String, password: String, historyA?: any) => void;
	handleLogout: () => void;
}
