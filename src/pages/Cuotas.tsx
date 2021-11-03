/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from '@material-ui/core';
import React, { Fragment } from 'react';
import CheckboxList from '../components/CheckboxList';
import TableReports from '../components/table';
import useAxios from '../config';
import { useStyles } from './RepDinamicos';
// import SelectList from '../components/DateTime';

const Cuotas: React.FC = () => {
	const classes = useStyles();

	const [state, setState]: [any, any] = React.useState({});
	// const today = new Date();
	// const lastMonth = new Date(today);
	// const [initDate, setInitDate] = React.useState<Date | null>(lastMonth);
	// const [endDate, setEndDate] = React.useState<Date | null>(today);

	React.useEffect(() => {
		const getdata = async () => {
			try {
				const resp = await useAxios.get('/aboterminal/keys');
				setState(resp.data.info);
			} catch (error) {}
		};
		getdata();
	}, []);

	return (
		<Fragment>
			<div className='ed-container'>
				{/* <div className='ed-item m-cross-end m-main-justify s-py-2'>
					<div className={classes.headerTitle}>Reportes Dinámicos de Cuotas Vencidas</div>
				</div> */}
				<div className='ed-item s-py-2'>
					<Card className={classes.card}>
						{/* <SelectList initDate={initDate} endDate={endDate} setInitDate={setInitDate} setEndDate={setEndDate} /> */}

						<CheckboxList state={state} setState={setState} />
					</Card>
				</div>
				<div className='ed-item s-to-center s-py-2'>
					<TableReports state={state} from='CuotasVencidas' />
				</div>
			</div>
		</Fragment>
	);
};

export default Cuotas;
