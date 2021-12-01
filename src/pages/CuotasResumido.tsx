/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from '@material-ui/core';
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
					<TableReports state={state} from='CuotasResumen' />
				</div>
			</div>
		</Fragment>
	);
};

export default CuotasResumido;
