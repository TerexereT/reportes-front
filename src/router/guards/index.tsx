import { GuardFunction } from 'react-router-guards';
import { GuardFunctionRouteProps, GuardToRoute, Next } from 'react-router-guards/dist/types';
import { baseUrl, login } from '../url';

export const Lock: GuardFunction = (to, from, next) => {
	console.log('public guarddx', to.location.pathname);
	if (to.meta.auth) {
		if (localStorage.getItem('token') !== null) {
			next();
		} else {
			next.redirect(login);
		}
	} else {
		if (localStorage.getItem('token') !== null) {
			next.redirect(baseUrl);
		} else {
			next();
		}
	}
};

export const PrivGuard: any = (to: GuardToRoute, from: GuardFunctionRouteProps, next: Next, user: any) => {
	console.log('priv guard xd', to.location.pathname);
	const { id_rol, views, id_department } = user;
	//
	let isWorker = id_rol;
	let userDep = views[to.location.pathname.split('/')[1]];

	next.props({ isWorker });

	//
	if (userDep) next.props({ isWorker });
	else next.redirect(from.match.path);
};
