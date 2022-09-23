import { options } from '../../../pages/Transaccional';

export type FromType =
	| 'CuotasVencidas'
	| 'Movimientos'
	| 'Mantenimiento'
	| 'CuotasResumen'
	| 'PagoCuota'
	| 'Transaccional'
	| 'Contracargo'
	| 'DetallexACI'
	| 'GeneralCont';

export interface TableReportsProps {
	state: any;
	initDate?: Date | null;
	endDate?: Date | null;
	mantOption?: number;
	Sponsor?: number;
	transType?: options[];
	transOption?: string;
	monthoption?: string;
	from: FromType;
}
