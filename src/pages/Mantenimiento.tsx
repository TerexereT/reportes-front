/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from '@material-ui/core';
import React, { Fragment } from 'react';
import CheckboxList from '../components/CheckboxList';
import TableReports from '../components/table';
import useAxios from '../config';
import { useStyles } from './RepDinamicos';
// import SelectList from '../components/DateTime';

const Mantenimiento: React.FC = () => {
	const classes = useStyles();
	const [state, setState]: [any, any] = React.useState({});

	React.useEffect(() => {
		const getdata = async () => {
			try {
				const resp = await useAxios.get('/aboterminal/keys');
				setState(resp.data.info);
				console.log('aboterminal', state);
			} catch (error) {}
		};
		getdata();
	}, []);
	return (
		<Fragment>
			<div className='ed-container'>
				<div className='ed-item s-py-2'>
					<Card className={classes.card}>
						{/* <SelectList initDate={initDate} endDate={endDate} setInitDate={setInitDate} setEndDate={setEndDate} /> */}

						<CheckboxList state={state} setState={setState} />
					</Card>
					<div className='ed-item s-to-center s-py-2'>
						<TableReports state={state} from='Mantenimiento' />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Mantenimiento;
