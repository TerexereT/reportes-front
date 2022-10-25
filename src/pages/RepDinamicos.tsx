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
		padding: '1rem',
		display: 'flex',
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
			<div className='ed-container'>
				<div className='ed-item s-py-2'>
					<Card className={classes.card}>
						<SelectList initDate={initDate} endDate={endDate} setInitDate={setInitDate} setEndDate={setEndDate} />

						<CheckboxList state={state} setState={setState} Sponsor={Sponsor} setSponsor={setSponsor} />
					</Card>
				</div>
				<div className='ed-item s-to-center s-py-2'>
					<TableReports initDate={initDate} endDate={endDate} state={state} Sponsor={Sponsor} from='Movimientos' />
				</div>
			</div>
		</Fragment>
	);
};

export default RepDinamicos;
