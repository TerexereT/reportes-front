/* eslint-disable react-hooks/exhaustive-deps */
import { makeStyles, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import React, { Fragment } from 'react';
// ? components
import CheckboxList from '../components/CheckboxList';
import SelectList from '../components/DateTime';
import TableReports from '../components/table';
import useAxios from '../config';

export const useStyles = makeStyles((theme: Theme) => ({
	headerTitle: {
		color: '#37256b',
		fontWeight: 600,
		fontSize: 40,
		padding: 0,
	},
	card: {
		minWidth: 275,
		boxShadow: '7px 7px 22px -4px rgba(0,0,0,0.74)',
		WebkitBoxShadow: '7px 7px 22px -4px rgba(0,0,0,0.74)',
		MozBoxShadow: '7px 7px 22px -4px rgba(0,0,0,0.74)',
	},
	row: {
		padding: '1rem 1rem 0',
		display: 'flex',
	},
}));

const RepDinamicos: React.FC = () => {
	const [state, setState]: [any, any] = React.useState({});

	const today = new Date();
	const lastMonth = new Date(today);
	const [initDate, setInitDate] = React.useState<Date | null>(lastMonth);
	const [endDate, setEndDate] = React.useState<Date | null>(today);

	const classes = useStyles();

	React.useEffect(() => {
		const getdata = async () => {
			try {
				const resp = await useAxios.get('/history/keys');
				setState(resp.data.info);
			} catch (error) {}
		};
		getdata();
	}, []);
	return (
		<Fragment>
			<div className='ed-container'>
				{/* <div className='ed-item m-cross-end m-main-justify s-py-2'>
					<div className={classes.headerTitle}>Reportes Dinámicos de Movimientos</div>
				</div> */}
				<div className='ed-item s-py-2'>
					<Card className={classes.card}>
						<SelectList initDate={initDate} endDate={endDate} setInitDate={setInitDate} setEndDate={setEndDate} />

						<CheckboxList state={state} setState={setState} />
					</Card>
				</div>
				<div className='ed-item s-to-center s-py-2'>
					<TableReports initDate={initDate} endDate={endDate} state={state} from='Movimientos' />
				</div>
			</div>
		</Fragment>
	);
};

export default RepDinamicos;
