import { GuardFunction } from 'react-router-guards';
import { GuardFunctionRouteProps, GuardToRoute, Next } from 'react-router-guards/dist/types';
import { baseUrl, login } from '../url';

export const Lock: GuardFunction = (to, from, next) => {
	console.log('public guard', to.location.pathname);
	if (to.meta.auth) {
		if (localStorage.getItem('token') !== null) {
			next();
		} else {
			next.redirect(login);
		}
	} else {
		if (localStorage.getItem('token') !== null) {
			next.redirect(login);
		} else {
			next();
		}
	}
};

export const PrivGuard: any = (to: GuardToRoute, from: GuardFunctionRouteProps, next: Next, user: any) => {
	console.log('priv guard x', to.location.pathname);
	let userDep = user;
	let isWorker = true;
	/*
	const { id_rol, views, id_department } = user;
	let isWorker = id_rol;
	let userDep = views[to.location.pathname.split('/')[1]];

	//Solo para God
	if (id_department === 8) {
		next.props({ isWorker: false });
	}
	*/

	if (userDep) {
		next.props({ isWorker });
	} else {
		next.redirect(login);
	}
};
