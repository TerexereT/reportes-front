import { GuardFunction } from 'react-router-guards';
import { GuardFunctionRouteProps, GuardToRoute, Next } from 'react-router-guards/dist/types';
import { baseUrl, login } from '../url';

export const Lock: GuardFunction = (to, from, next) => {
	console.log('publicc guarddx', to.location.pathname);
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

export const PrivGuard: any = (to: GuardToRoute, from: GuardFunctionRouteProps, next: Next, views: any) => {
	console.log('priv guard xxd', to.location.pathname);
	console.log(views);
	//
	let isWorker = 1;
	let userDep = views[to.location.pathname.split('/')[1]];
	console.log('voyy', userDep);

	next.props({ isWorker });

	//
	if (userDep) next.props({ isWorker });
	else next.redirect(from.match.path);
};
