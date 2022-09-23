// File to add reutilizable functions
import { Views } from '../../context/auth/interface';
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

export const route = (views: any, pathname: any): Views => {
	//console.log(pathname, 'aqui');
	return views.find((view: any) => {
		//console.log(`${view.root}/`, pathname);
		return view.root === pathname.split('/')[1] || `/${view.root}/` === pathname || `/${view.root}` === pathname;
	});
};
