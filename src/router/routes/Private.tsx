import { Meta } from 'react-router-guards/dist/types';
import AbonoClienteRechazadoUpFile from '../../pages/AbonoClienteRechazadoUpFile';
import CancelarCuotas from '../../pages/CancelarCuotas';
import ContabilidadXACI from '../../pages/ContabilidadXACI';
import Contracargo from '../../pages/Contracargo';
import ContraCargoUpFile from '../../pages/ContraCargoUpFile';
import Cuotas from '../../pages/Cuotas';
import CuotasResumido from '../../pages/CuotasResumido';
import ExecContraCargo from '../../pages/ExecContraCargo';
import Home from '../../pages/Home';
import LibrePago from '../../pages/LibrePago';
import Mantenimiento from '../../pages/Mantenimiento';
import PagoCuota from '../../pages/PagoCuota';
import RepDinamicos from '../../pages/RepDinamicos';
import ReporteXACI from '../../pages/ReporteXACI';
import Seguridad from '../../pages/seguridad';
import Transaccional from '../../pages/Transaccional';
import {
	abonoClienteRechazado,
	baseUrl,
	cancelarCuotas,
	contabilidadACI,
	contracargo,
	contraCargoUp,
	cuotas,
	cuotasR,
	execContracargo,
	librePago,
	mantenimientos,
	movimientos,
	pagoCuota,
	reportexaci,
	seguridad,
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
		path: contraCargoUp,
		component: ContraCargoUpFile,
		meta: { auth: true },
	},
	{
		path: seguridad,
		component: Seguridad,
		meta: { auth: true },
	},
	{
		path: contracargo,
		component: Contracargo,
		meta: { auth: true },
	},
	{
		path: execContracargo,
		component: ExecContraCargo,
		meta: { auth: true },
	},
	{
		path: contabilidadACI,
		component: ContabilidadXACI,
		meta: { auth: true },
	},
	{
		path: abonoClienteRechazado,
		component: AbonoClienteRechazadoUpFile,
		meta: { auth: true },
	},
];

export default Private;
