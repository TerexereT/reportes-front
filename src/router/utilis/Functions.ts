// File to add reutilizable functions
import PublicNav from '../routes/PublicRutas';
import PrivateNav from '../routes/Rutas';

export const isPrivate = () => {
	const is = PrivateNav.findIndex((val: any) => {
		return val === window.location.pathname;
	});
	return is !== -1;
};

export const existRoutePublic = () => {
	const is = PublicNav.findIndex((val: any) => {
		return val === window.location.pathname;
	});
	return is !== -1;
};
