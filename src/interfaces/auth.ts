export interface Permissions {
	id: number;
	active: number;
	id_action: {
		id: number;
		name: string;
		active: number;
	};
}

export interface InterfaceObject {
	[key: string]: number;
}

export interface UserInterface {
	login: string;
	name: string;
	id_department: {
		name: string;
		id: number;
		active: number;
	};
	id_rol: {
		name: string;
		id: number;
		active: number;
	};
}

export interface AuthUser {
	data: UserInterface;
	views: String[] | [];
	permiss: InterfaceObject | {};
}
