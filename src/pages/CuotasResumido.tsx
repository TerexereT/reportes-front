/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from '@mui/material';
import { FC, Fragment, useLayoutEffect, useState } from 'react';
import CheckboxList from '../components/CheckboxList';
import TableReports from '../components/table';
import useAxios from '../config';
import { useStyles } from './RepDinamicos';

const CuotasResumido: FC = () => {
	const classes = useStyles();

	const [state, setState] = useState({});

	useLayoutEffect(() => {
		const getdata = async () => {
			try {
				const resp = await useAxios.get('/cuotas_resumidas/keys');
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
						<CheckboxList state={state} setState={setState} />
					</Card>
				</div>
				<div className={classes.cards}>
					<TableReports state={state} from='CuotasResumen' />
				</div>
			</div>
		</Fragment>
	);
};

export default CuotasResumido;
