import { GuardFunction } from 'react-router-guards';
import { GuardFunctionRouteProps, GuardToRoute, Next } from 'react-router-guards/dist/types';
import { Views } from '../../context/auth/interface';
import { baseUrl, login } from '../url';
import { isPrivate, route } from '../utilis/Functions';

export const Lock: GuardFunction = (to, from, next) => {
	// console.log('publicc guarddx', to.location.pathname);
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

export const PrivGuard: any = (
	to: GuardToRoute,
	from: GuardFunctionRouteProps,
	next: Next,
	views: Views[] | []
) => {
	if (localStorage.getItem('token') !== null && !isPrivate()) {
		next.redirect(baseUrl);
	}

	let isWorker = 1;
	let userDep = route(views, to.location.pathname);

	if (userDep) next.props({ isWorker });
	else next.redirect(baseUrl);
};
