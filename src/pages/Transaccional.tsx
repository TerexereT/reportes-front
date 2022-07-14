import { Card, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import classnames from 'classnames';
import { DateTime } from 'luxon';
import { FC, useLayoutEffect, useState } from 'react';
import CheckboxList from '../components/CheckboxList';
import { useStylesDT } from '../components/DateTime';
import TableReports from '../components/table';
import useAxios from '../config';
import { useStyles } from './RepDinamicos';

export interface options {
	name: string;
	value: number;
	code?: string;
}

const mes = [
	{ name: 'Enero', value: 0 },
	{ name: 'Febrero', value: 1 },
	{ name: 'Marzo', value: 2 },
	{ name: 'Abril', value: 3 },
	{ name: 'Mayo', value: 4 },
	{ name: 'Junio', value: 5 },
	{ name: 'Julio', value: 6 },
	{ name: 'Agosto', value: 7 },
	{ name: 'Septiembre', value: 8 },
	{ name: 'Octubre', value: 9 },
	{ name: 'Noviembre', value: 10 },
	{ name: 'Diciembre', value: 11 },
];

const Transaccional: FC = () => {
	const classes = useStyles();
	const classesDT = useStylesDT();
	const lastMonth = Number(DateTime.now().month - 2);

	const [state, setState] = useState({});
	// const [show, setShow] = useState(false);
	const [option, setOption] = useState(0);
	const [monthoption, setMonthOption] = useState(lastMonth);
	const [options, setOptions] = useState<options[]>([]);
	const [transType, setTransType] = useState<options[]>([]);

	const handleChange = (event: SelectChangeEvent<number>) => {
		setOption(event.target.value as number);
	};
	const handleMonthChange = (event: SelectChangeEvent<number>) => {
		setMonthOption(event.target.value as number);
	};

	useLayoutEffect(() => {
		const getdata = async () => {
			// setShow(false);
			try {
				const resp = await useAxios.get(`/transaccional/keys`).then((resp) => resp.data.info);
				setState(resp);
				const resp2 = await useAxios.get(`/transaccional/options`).then((resp) => resp.data.info);
				setOptions(resp2);
				const resp3 = await useAxios.get(`/transaccional/transType`).then((resp) => resp.data.info);
				setTransType(resp3);
				// setShow(true);
			} catch (error) {}
		};
		getdata();
	}, []);

	return (
		<>
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
								Seleccione organización:
							</Typography>
							<Select
								labelId='Seleccione tipo de reporte'
								id='Seleccione tipo de reporte'
								value={option}
								onChange={handleChange}>
								{options.map((val, i) => {
									return (
										<MenuItem key={i} value={val.value}>
											{val.name}
										</MenuItem>
									);
								})}
							</Select>
							<Typography
								className={classnames(classesDT.title, 'm-cross-end')}
								style={{ marginRight: '1rem', marginBottom: 0 }}
								color='textSecondary'
								gutterBottom>
								Seleccione mes:
							</Typography>
							<Select
								labelId='Seleccione tipo de reporte'
								id='Seleccione tipo de reporte'
								value={monthoption}
								onChange={handleMonthChange}>
								{mes.map((val, i) => {
									return (
										<MenuItem key={i} value={val.value}>
											{val.name}
										</MenuItem>
									);
								})}
							</Select>
						</div>
						<CheckboxList state={transType} setState={setTransType} exclusive />
					</Card>
				</div>
				<div className='ed-item s-to-center s-py-2'>
					{/* {show && ( */}
					<TableReports
						state={state}
						from='Transaccional'
						transType={transType}
						transOption={option}
						monthoption={monthoption}
					/>
					{/* )} */}
				</div>
			</div>
		</>
	);
};

export default Transaccional;
