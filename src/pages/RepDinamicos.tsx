/* eslint-disable react-hooks/exhaustive-deps */
import { Theme } from '@mui/material';
import Card from '@mui/material/Card';
import makeStyles from '@mui/styles/makeStyles';
import { FC, Fragment, useEffect, useState } from 'react';
// ? components
import CheckboxList from '../components/CheckboxList';
import SelectList from '../components/DateTime';
import TableReports from '../components/table';
import useAxios from '../config';

export const useStyles = makeStyles((theme: Theme) => ({
	headerTitle: {
		color: theme.palette.primary.main,
		fontWeight: 600,
		fontSize: 40,
		padding: 0,
	},
	title: {
		fontWeight: 600,
		fontSize: '2rem',
		padding: 0,
		color: theme.palette.text.primary,
	},
	card: {
		minWidth: 275,
		boxShadow: '7px 7px 22px -4px rgba(0,0,0,0.74)',
		WebkitBoxShadow: '7px 7px 22px -4px rgba(0,0,0,0.74)',
		MozBoxShadow: '7px 7px 22px -4px rgba(0,0,0,0.74)',
	},
	row: {
		padding: '1rem',
		display: 'flex',
	},
	rowItem: {
		marginTop: '1rem',
	},
	datePicker: {
		maxWidth: '18%',
		alignSelf: 'center',
	},
	base: {
		margin: '0 8%',
	},
	cards: {
		padding: '1rem',
	},
	inputText: {
		color: theme.palette.text.primary,
		fontSize: '1.5rem',
	},
}));

export interface ISponsor {
	name: string;
	value: string;
}

const RepDinamicos: FC = () => {
	const [state, setState]: [any, any] = useState({});

	const today = new Date();
	const lastMonth = new Date();
	const [initDate, setInitDate] = useState<Date | undefined>(lastMonth);
	const [endDate, setEndDate] = useState<Date | undefined>(today);
	const [Sponsor, setSponsor] = useState(720);

	const classes = useStyles();

	useEffect(() => {
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
			<div className={classes.base}>
				<div className={classes.cards}>
					<Card className={classes.card}>
						<SelectList initDate={initDate} endDate={endDate} setInitDate={setInitDate} setEndDate={setEndDate} />

						<CheckboxList state={state} setState={setState} Sponsor={Sponsor} setSponsor={setSponsor} />
					</Card>
				</div>
				<div className={classes.cards}>
					<TableReports initDate={initDate} endDate={endDate} state={state} Sponsor={Sponsor} from='Movimientos' />
				</div>
			</div>
		</Fragment>
	);
};

export default RepDinamicos;
