/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from '@mui/material';
import { FC, useLayoutEffect, useState } from 'react';
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

	useLayoutEffect(() => {
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
			<div className={classes.base}>
				<div className={classes.cards}>
					<Card className={classes.card}>
						<SelectList initDate={initDate} endDate={endDate} setInitDate={setInitDate} setEndDate={setEndDate} />
					</Card>
				</div>
				<div className={classes.cards}>
					<TableReports initDate={initDate} endDate={endDate} state={state} from='PagoCuota' />
				</div>
			</div>
		</>
	);
};

export default PagoCuota;
