import { Meta } from 'react-router-guards/dist/types';
import CancelarCuotas from '../../pages/CancelarCuotas';
import Cuotas from '../../pages/Cuotas';
import CuotasResumido from '../../pages/CuotasResumido';
import Home from '../../pages/Home';
import Mantenimiento from '../../pages/Mantenimiento';
import RepDinamicos from '../../pages/RepDinamicos';
import { baseUrl, cancelarCuotas, cuotas, cuotasR, mantenimientos, movimientos } from '../url';

export interface meta extends Meta {
	auth: boolean;
}

export interface Route {
	path: string;
	component: any;
	meta: meta;
}

const RutasNav: Route[] = [
	{
		path: cancelarCuotas,
		component: CancelarCuotas,
		meta: { auth: true },
	},
	{
		path: cuotas,
		component: Cuotas,
		meta: { auth: false },
	},
	{
		path: cuotasR,
		component: CuotasResumido,
		meta: { auth: false },
	},
	{
		path: mantenimientos,
		component: Mantenimiento,
		meta: { auth: false },
	},
	{
		path: movimientos,
		component: RepDinamicos,
		meta: { auth: false },
	},
	{
		path: baseUrl,
		component: Home,
		meta: { auth: false },
	},
];

export default RutasNav;
