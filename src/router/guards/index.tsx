import { GuardFunction } from 'react-router-guards';

export const Lock: GuardFunction = (to, from, next) => {
	if (to.meta.auth) {
		let pwd = window.prompt('Ingrese Contraseña:');
		if (pwd === '@drianaTovar#.') {
			next();
		}
	}
	next();
};
