import {
	Button,
	CardActions,
	CardContent,
	CardHeader,
	Checkbox,
	FormControlLabel,
	FormGroup,
} from '@mui/material';
// import Card from '@mui/material/Card';
import React from 'react';
import { useStylesDT } from '../DateTime';

interface CBListProps {
	state: any;
	setState: (val: any) => void;
}

const CheckboxList: React.FC<CBListProps> = ({ state, setState }) => {
	const classes = useStylesDT();
	const [options, setOptions] = React.useState(true);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
