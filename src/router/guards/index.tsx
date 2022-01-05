import { GuardFunction } from 'react-router-guards';
import { baseUrl } from '../url';

export const Lock: GuardFunction = (to, from, next) => {
	if (to.meta.auth) {
		let pwd = window.prompt('Ingrese Contraseña:');
		if (pwd === (process.env.REACT_APP_PSWD ? process.env.REACT_APP_PSWD : '12345678')) {
			next();
		} else {
			next.redirect(baseUrl);
		}
	}
	next();
};
