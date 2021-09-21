/* eslint-disable react-hooks/exhaustive-deps */
import { Card, MenuItem, Select, Typography } from '@material-ui/core';
import classnames from 'classnames';
import React, { Fragment } from 'react';
import CheckboxList from '../components/CheckboxList';
import { useStylesDT } from '../components/DateTime';
import TableReports from '../components/table';
import useAxios from '../config';
import { useStyles } from './RepDinamicos';

export const opciones = [
	'Sin Plan de Mantenimiento',
	'Sin Plan de Comisión',
	'Plan de Mantenimiento Inactivo',
	'Plan de Comisión Inactivo',
];

const Mantenimiento: React.FC = () => {
	const classes = useStyles();
	const classesDT = useStylesDT();

	const [state, setState] = React.useState({});
	const [show, setShow] = React.useState(false);
	const [option, setOption] = React.useState(0);

	React.useEffect(() => {
		const getdata = async () => {
			try {
				await setShow(false);
				const resp = await useAxios.get(`/mantenimiento/${option}/keys`);
				setState(resp.data.info);
				setShow(true);
			} catch (error) {}
		};
		getdata();
	}, [option]);
	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setOption(event.target.value as number);
	};
	return (
		<Fragment>
			<div className='ed-container'>
				<div className='ed-item s-py-2'>
					<Card className={classes.card}>
						{/* <SelectList initDate={initDate} endDate={endDate} setInitDate={setInitDate} setEndDate={setEndDate} /> */}
						<div className={classes.row}>
							<Typography
								className={classnames(classesDT.title, 'm-cross-end')}
								style={{ marginRight: '1rem', marginBottom: 0 }}
								color='textSecondary'
								gutterBottom>
								Seleccione tipo de reporte:
							</Typography>
							<Select
								labelId='Seleccione tipo de reporte'
								id='Seleccione tipo de reporte'
								value={option}
								onChange={handleChange}>
								{opciones.map((val, i) => {
									return <MenuItem value={i}>{val}</MenuItem>;
								})}
							</Select>
						</div>
						{show && <CheckboxList state={state} setState={setState} />}
					</Card>
				</div>
				<div className='ed-item s-to-center s-py-2'>
					{show && <TableReports state={state} from='Mantenimiento' mantOption={option} />}
				</div>
			</div>
		</Fragment>
	);
};

export default Mantenimiento;
