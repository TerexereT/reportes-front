/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from '@material-ui/core';
import React from 'react';
// import CheckboxList from '../components/CheckboxList';
import SelectList from '../components/DateTime';
import TableReports from '../components/table';
import useAxios from '../config';
import { useStyles } from './RepDinamicos';

const PagoCuota: React.FC = () => {
	const classes = useStyles();

	const [state, setState]: [any, any] = React.useState({});
	const today = new Date();
	const lastMonth = new Date(today);
	const [initDate, setInitDate] = React.useState<Date | null>(lastMonth);
	const [endDate, setEndDate] = React.useState<Date | null>(today);

	React.useEffect(() => {
		const getdata = async () => {
			try {
				const resp = await useAxios.get('/pago-cuotas/keys');
				setState(resp.data.info);
			} catch (error) {}
		};
		getdata();
	}, []);

	return (
		<>
			<div className='ed-container'>
				<div className='ed-item s-py-2'>
					<Card className={classes.card}>
						<SelectList initDate={initDate} endDate={endDate} setInitDate={setInitDate} setEndDate={setEndDate} />
					</Card>
				</div>
				<div className='ed-item s-to-center s-py-2'>
					<TableReports initDate={initDate} endDate={endDate} state={state} from='PagoCuota' />
				</div>
			</div>
		</>
	);
};

export default PagoCuota;
