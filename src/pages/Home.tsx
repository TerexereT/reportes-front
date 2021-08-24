import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import React, { Fragment } from 'react';
import CheckboxList from '../components/CheckboxList';
import SelectList from '../components/DateTime';
// ? components
import TableReports from '../components/table';

const useStyles = makeStyles((styles) => ({
	headerTitle: {
		fontSize: 40,
		padding: 0,
	},
}));

const Home: React.FC = () => {
	const [state, setState]: [any, any] = React.useState({
		TERMINAL: true,
		CEDULA_RIF: false,
		COMERCIO: false,
		DIRECCION: false,
		FechaEjec: false,
		FechaPreceso: false,
		COD_COMERCIO: false,
		N_CUENTA: false,
		N_AFILIADO: false,
		MONTO_NETO: false,
		MONTO_BRUTO_TDD: false,
		MONTO_BRUTO_TDC: false,
		COMISION_MANTENIMIENTO: false,
		MONTO_BRUTO: false,
		MONTO_ABONAR: false,
		TASA: false,
		ORG: false,
	});

	const today = new Date();
	const lastMonth = new Date(today);
	const [initDate, setInitDate] = React.useState<Date | null>(lastMonth);
	const [endDate, setEndDate] = React.useState<Date | null>(today);

	const classes = useStyles();
	return (
		<Fragment>
			<div className='ed-container'>
				<div className='ed-item s-center m-left s-py-2'>
					<div className={classes.headerTitle}>Resportes Dinámicos de Movimientos (RDM)</div>
				</div>
				<div className='ed-item s-py-2'>
					<Card>
						<SelectList initDate={initDate} endDate={endDate} setInitDate={setInitDate} setEndDate={setEndDate} />

						<CheckboxList state={state} setState={setState} />
					</Card>
				</div>
				<div className='ed-item s-to-center s-py-2'>
					<TableReports initDate={initDate} endDate={endDate} state={state} />
				</div>
			</div>
		</Fragment>
	);
};

export default Home;