import { CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
// import Card from '@material-ui/core/Card';
import React from 'react';
import { useStylesDT } from '../DateTime';

interface CBListProps {
	state: any;
	setState: (val: any) => void;
}

const CheckboxList: React.FC<CBListProps> = ({ state, setState }) => {
	const classes = useStylesDT();
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.name !== 'TERMINAL') {
			setState({ ...state, [event.target.name]: event.target.checked });
		}
	};
	return (
		<>
			<CardHeader
				title='Filtros'
				subheader='Seleccione las columnas que desea ver en su reporte'
				className={classes.title}
			/>
			<CardContent className='m-px-2 m-pb-2' style={{ paddingTop: 0 }}>
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
			</CardContent>
		</>
	);
};
export default CheckboxList;
