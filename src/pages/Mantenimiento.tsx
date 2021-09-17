/* eslint-disable react-hooks/exhaustive-deps */
import { Card, MenuItem, Select, Typography } from '@material-ui/core';
import classnames from 'classnames';
import React, { Fragment } from 'react';
import CheckboxList from '../components/CheckboxList';
import SelectList, { useStylesDT } from '../components/DateTime';
import TableReports from '../components/table';
import useAxios from '../config';
import { useStyles } from './RepDinamicos';

const Mantenimiento: React.FC = () => {
	const classes = useStyles();
	const classesDT = useStylesDT();
	const today = new Date();
	const lastMonth = new Date(today);
	const opciones = ['Sin Plan de Mantenimiento', 'Plan de Tarifa Inactivo', 'Sin Plan de Comisión'];

	const [state, setState] = React.useState({});
	const [option, setOption] = React.useState(0);
	const [initDate, setInitDate] = React.useState<Date | null>(lastMonth);
	const [endDate, setEndDate] = React.useState<Date | null>(today);

	React.useEffect(() => {
		const getdata = async () => {
			try {
				const resp = await useAxios.get('/aboterminal/keys');
				setState(resp.data.info);
			} catch (error) {}
		};
		getdata();
	}, []);
	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setOption(event.target.value as number);
	};
	return (
		<Fragment>
			<div className='ed-container'>
				<div className='ed-item s-py-2'>
					<Card className={classes.card}>
						<SelectList initDate={initDate} endDate={endDate} setInitDate={setInitDate} setEndDate={setEndDate} />
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
						<CheckboxList state={state} setState={setState} />
					</Card>
				</div>
				<div className='ed-item s-to-center s-py-2'>
					<TableReports state={state} from='Mantenimiento' mantOption={option} />
				</div>
			</div>
		</Fragment>
	);
};

export default Mantenimiento;
