/* eslint-disable react-hooks/exhaustive-deps */
import { Card, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import classnames from 'classnames';
import { FC, useEffect, useState } from 'react';
import CheckboxList from '../components/CheckboxList';
import { useStylesDT } from '../components/DateTime';
import TableReports from '../components/table';
import useAxios from '../config';
import { useStyles } from './RepDinamicos';

export const opciones = [
	'Sin Mantenimiento / Inactivo',
	'Sin Comisión / Inactivo',
	// 'Plan de Mantenimiento Inactivo',
	// 'Plan de Comisión Inactivo',
];

const Mantenimiento: FC = () => {
	const classes = useStyles();
	const classesDT = useStylesDT();

	const [state, setState] = useState({});
	const [show, setShow] = useState(false);
	const [option, setOption] = useState(0);

	useEffect(() => {
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
	const handleChange = (event: SelectChangeEvent<number>) => {
		setOption(event.target.value as number);
	};
	return (
		<>
			<div className={classes.base}>
				<div className={classes.cards}>
					<Card className={classes.card}>
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
									return (
										<MenuItem key={i} value={i}>
											{val}
										</MenuItem>
									);
								})}
							</Select>
						</div>
						{show && <CheckboxList state={state} setState={setState} />}
					</Card>
				</div>
				<div className={classes.cards}>
					{show && <TableReports state={state} from='Mantenimiento' mantOption={option} />}
				</div>
			</div>
		</>
	);
};

export default Mantenimiento;
