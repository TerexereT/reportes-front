import { Meta } from 'react-router-guards/dist/types';
import CancelarCuotas from '../../pages/CancelarCuotas';
import Cuotas from '../../pages/Cuotas';
import CuotasResumido from '../../pages/CuotasResumido';
import Home from '../../pages/Home';
import LibrePago from '../../pages/LibrePago';
import LoadExcel from '../../pages/LoadExcel';
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
	loadExcel,
} from '../url';

export interface meta extends Meta {
	auth: boolean;
}

export interface Route {
	path: string;
	component: any;
	meta: meta;
}

const Private: Route[] = [
	{
		path: baseUrl,
		component: Home,
		meta: { auth: true },
	},
	{
		path: cancelarCuotas,
		component: CancelarCuotas,
		meta: { auth: true },
	},
	{
		path: transaccional,
		component: Transaccional,
		meta: { auth: true },
	},
	{
		path: librePago,
		component: LibrePago,
		meta: { auth: true },
	},
	{
		path: pagoCuota,
		component: PagoCuota,
		meta: { auth: true },
	},
	{
		path: reportexaci,
		component: ReporteXACI,
		meta: { auth: true },
	},
	{
		path: cuotas,
		component: Cuotas,
		meta: { auth: true },
	},
	{
		path: cuotasR,
		component: CuotasResumido,
		meta: { auth: true },
	},
	{
		path: mantenimientos,
		component: Mantenimiento,
		meta: { auth: true },
	},
	{
		path: movimientos,
		component: RepDinamicos,
		meta: { auth: true },
	},
	{
		path: loadExcel,
		component: LoadExcel,
		meta: { auth: true },
	},
];

export default Private;
