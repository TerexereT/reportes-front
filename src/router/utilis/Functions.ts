// File to add reutilizable functions
import PublicNav from '../routes/PublicRutas';
import PrivateNav from '../routes/Rutas';

export const isPrivate = () => {
	const is = PrivateNav.findIndex((val: any) => {
		console.log(val.path, window.location.pathname);
		return val.path === window.location.pathname;
	});
	return is !== -1;
};

export const existRoutePublic = () => {
	const is = PublicNav.findIndex((val: any) => {
		console.log(val.path, window.location.pathname);
		return val.path === window.location.pathname;
	});
	return is !== -1;
};
