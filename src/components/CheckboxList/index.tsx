/* eslint-disable react-hooks/exhaustive-deps */
import {
	Button,
	CardActions,
	CardContent,
	CardHeader,
	Checkbox,
	FormControlLabel,
	FormGroup,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
// import Card from '@mui/material/Card';
import { ChangeEvent, FC, useState } from 'react';
import { useStylesDT } from '../DateTime';

interface CBListProps {
	state: any;
	setState: (val: any) => void;
	Sponsor?: any;
	setSponsor?: (val: any) => void;
}

const CheckboxList: FC<CBListProps> = ({ state, setState, Sponsor, setSponsor }) => {
	const classes = useStylesDT();
	const [options, setOptions] = useState(true);
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.name !== 'TERMINAL') {
			setState({ ...state, [event.target.name]: event.target.checked });
		}
	};
	const handleSelectAll = async () => {
		await setOptions(false);
		setState((prev: any) => {
			let res: any = {};
			for (const key in prev) {
				res[key] = true;
			}
			return res;
		});
		setOptions(true);
	};

	const handleChangeSelect = (event: SelectChangeEvent) => {
		setSponsor!(event.target.value as string);
	};

	return (
		<>
			<div className={classes.row}>
				<CardHeader
					title='Filtros'
					subheader='Seleccione las columnas que desea ver en su reporte'
					className={classes.title}
				/>
				<CardActions>
					<Button size='small' onClick={handleSelectAll} className={classes.Button}>
						Seleccionar todos
					</Button>
				</CardActions>
				{
					<CardActions>
						<Select value={Sponsor} onChange={handleChangeSelect}>
							<MenuItem value={720}>BVC</MenuItem>
							<MenuItem value={722}>Plaza</MenuItem>
						</Select>
					</CardActions>
				}
			</div>
			<CardContent className='m-px-2 m-pb-2' style={{ paddingTop: 0 }}>
				{options && (
					<FormGroup row style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
						{Object.keys(state).map((key: any) => {
							return (
								<FormControlLabel
									control={<Checkbox checked={state[key]} onChange={handleChange} name={key} color='primary' />}
									label={key.replaceAll('_', ' ')}
									key={key}
								/>
							);
						})}
					</FormGroup>
				)}
			</CardContent>
		</>
	);
};
export default CheckboxList;
