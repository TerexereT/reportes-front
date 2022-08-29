// File to add reutilizable functions
import Private from '../routes/Private';
import Public from '../routes/Public';

export const isPrivate = () => {
	const is = Private.findIndex((val: any) => {
		// console.log(val.path, window.location.pathname);
		return val.path === window.location.pathname;
	});
	return is !== -1;
};

export const existRoutePublic = () => {
	const is = Public.findIndex((val: any) => {
		// console.log(val.path, window.location.pathname);
		return val.path === window.location.pathname;
	});
	return is !== -1;
};
