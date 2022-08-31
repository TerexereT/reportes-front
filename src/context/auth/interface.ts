import { UserInterface, InterfaceObject } from '../../interfaces/auth';

export interface User {
	email: string;
	login: string;
}

export interface Views {
	name: string;
	key: number;
	root: string;
}

export interface ContextAuth {
	user: UserInterface | null;
	views: Views[] | [];
	permiss: InterfaceObject | {};
	handleLogin: (user: String, password: String, historyA?: any) => void;
	handleLogout: () => void;
}
