import { GuardFunction } from 'react-router-guards';
import { GuardFunctionRouteProps, GuardToRoute, Next } from 'react-router-guards/dist/types';
import { Views } from '../../context/auth/interface';
import { baseUrl, login } from '../url';

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
	// console.log('priv guard xxd', to.location.pathname);
	//console.log('aquii', views);
	//
	let isWorker = 1;
	let userDep = views.find((view) => view.root === to.location.pathname.split('/')[1]);
	//console.log('valid', userDep);

	next.props({ isWorker });

	//
	if (userDep) next.props({ isWorker });
	else {
		//console.log('aquix2');
		//next.redirect(baseUrl);
		window.location.replace(baseUrl);
	}
};
