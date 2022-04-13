/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from '@mui/material';
import { FC, useEffect, useState } from 'react';
// import CheckboxList from '../components/CheckboxList';
import SelectList from '../components/DateTime';
import TableReports from '../components/table';
import useAxios from '../config';
import { useStyles } from './RepDinamicos';

const PagoCuota: FC = () => {
	const classes = useStyles();

	const [state, setState] = useState({});
	const today = new Date();
	const lastMonth = new Date(today);
	const [initDate, setInitDate] = useState<Date | undefined>(lastMonth);
	const [endDate, setEndDate] = useState<Date | undefined>(today);

	useEffect(() => {
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
