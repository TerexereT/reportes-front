import React, { Fragment } from 'react';
import CheckboxList from '../components/CheckboxList';
import SelectList from '../components/DateTime';
// ? components
import TableReports from '../components/table';

const Home: React.FC = () => {
	const [state, setState]: [any, any] = React.useState({
		CEDULA_RIF: false,
		COMERCIO: false,
		DIRECCION: false,
		TERMINAL: false,
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
	return (
		<Fragment>
			<div className='ed-container'>
				<div className='ed-item s-center m-left s-py-2'>
					<h2>Resportes dinamicos</h2>
				</div>
				<div className='ed-item s-py-2'>
					<SelectList />
				</div>
				<div className='ed-item s-py-2'>
					<CheckboxList state={state} setState={setState} />
				</div>
				<div className='ed-item s-to-center s-py-2'>
					<TableReports state={state} />
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
