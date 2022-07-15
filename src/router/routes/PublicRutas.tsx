import { Meta } from 'react-router-guards/dist/types';
import Login from '../../pages/auth';
import { login } from '../url';

export interface meta extends Meta {
	auth: boolean;
}

export interface Route {
	path: string;
	component: any;
	meta: meta;
}

const PublicNav: Route[] = [
	{
		path: login,
		component: Login,
		meta: { auth: false },
	},
];

export default PublicNav;
