import { CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import React from 'react';
import { useStylesDT } from '../DateTime';

interface CBListProps {
	state: any;
	setState: any;
}

const CheckboxList: React.FC<CBListProps> = ({ state, setState }) => {
	const classes = useStylesDT();
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	return (
		<>
			<Card>
				<CardHeader title='Filtros' subheader='Seleccione los valores que desea ver en su reporte' />
				<CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
					<FormGroup row className='ed-grid'>
						{Object.keys(state).map((key: any) => {
							return (
								<FormControlLabel
									control={<Checkbox checked={state[key]} onChange={handleChange} name={key} color='primary' />}
									label={key.replaceAll('_', ' ')}
								/>
							);
						})}
					</FormGroup>
				</CardContent>
			</Card>
		</>
	);
};
export default CheckboxList;
