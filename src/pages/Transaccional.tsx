import { Card, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
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

const Transaccional: FC = () => {
	const classes = useStyles();
	const classesDT = useStylesDT();

	const [state, setState] = useState({});
	const [option, setOption] = useState(0);
	const [monthoption, setMonthOption] = useState('');
	const [fecha, setFecha] = useState<Date | null>(new Date());
	const [options, setOptions] = useState<options[]>([]);
	const [transType, setTransType] = useState<options[]>([]);

	const handleChange = (event: SelectChangeEvent<number>) => {
		setOption(event.target.value as number);
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

	useEffect(() => {
		setMonthOption(`${fecha!.getFullYear()}-${fecha!.getMonth() + 1}`);
	}, [fecha]);

	return (
		<>
			<div className={classes.base}>
				<div className={classes.cards}>
					<Card className={classes.card}>
						{/* <SelectList initDate={initDate} endDate={endDate} setInitDate={setInitDate} setEndDate={setEndDate} /> */}
						<div className={classes.row}>
							<Typography
								className={classesDT.title}
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
								className={classesDT.title}
								style={{ marginRight: '1rem', marginBottom: 0 }}
								color='textSecondary'
								gutterBottom>
								Seleccione la fecha:
							</Typography>
							<div className={classes.datePicker}>
								<DatePicker
									views={['month', 'year']}
									// label={'Elija la fecha'}
									minDate={new Date('2000-01-01')}
									// maxDate={new Date('2023-06-01')}
									value={fecha}
									disableFuture
									onChange={(newValue: Date | null) => {
										setFecha(newValue!);
									}}
									renderInput={(params: any) => <TextField {...params} />}
								/>
							</div>
						</div>
						<CheckboxList state={transType} setState={setTransType} exclusive />
					</Card>
				</div>
				<div className={classes.cards}>
					<TableReports
						state={state}
						from='Transaccional'
						transType={transType}
						transOption={option}
						monthoption={monthoption}
					/>
				</div>
			</div>
		</>
	);
};

export default Transaccional;
