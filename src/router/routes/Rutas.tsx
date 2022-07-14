import { Meta } from 'react-router-guards/dist/types';
import CancelarCuotas from '../../pages/CancelarCuotas';
import Cuotas from '../../pages/Cuotas';
import CuotasResumido from '../../pages/CuotasResumido';
import Home from '../../pages/Home';
import LibrePago from '../../pages/LibrePago';
import Mantenimiento from '../../pages/Mantenimiento';
import PagoCuota from '../../pages/PagoCuota';
import RepDinamicos from '../../pages/RepDinamicos';
import ReporteXACI from '../../pages/ReporteXACI';
import Transaccional from '../../pages/Transaccional';
import {
	baseUrl,
	cancelarCuotas,
	cuotas,
	cuotasR,
	librePago,
	mantenimientos,
	movimientos,
	pagoCuota,
	reportexaci,
	transaccional,
} from '../url';

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
		path: transaccional,
		component: Transaccional,
		meta: { auth: false },
	},
	{
		path: librePago,
		component: LibrePago,
		meta: { auth: false },
	},
	{
		path: pagoCuota,
		component: PagoCuota,
		meta: { auth: false },
	},
	{
		path: reportexaci,
		component: ReporteXACI,
		meta: { auth: false },
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
