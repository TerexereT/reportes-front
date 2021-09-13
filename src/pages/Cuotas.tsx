import { Card, makeStyles, Theme } from '@material-ui/core';
import React, { Fragment } from 'react';
import CheckboxList from '../components/CheckboxList';
import TableReports from '../components/table';
// import SelectList from '../components/DateTime';

const useStyles = makeStyles((theme: Theme) => ({
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
}));

const Cuotas: React.FC = () => {
	const classes = useStyles();

	const [state, setState]: [any, any] = React.useState({
		TERMINAL: true,
		MONTOTOTAL: false,
		ESTATUS: false,
	});
	// const today = new Date();
	// const lastMonth = new Date(today);
	// const [initDate, setInitDate] = React.useState<Date | null>(lastMonth);
	// const [endDate, setEndDate] = React.useState<Date | null>(today);

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
