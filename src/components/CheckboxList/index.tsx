import { Checkbox, FormControlLabel, FormGroup, Typography } from '@material-ui/core';
import classnames from 'classnames';
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
			<Typography className={classnames(classes.title, 'm-cross-end')} color='textSecondary' gutterBottom>
				Seleccione los campos a consultar
			</Typography>
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
		</>
	);
};
export default CheckboxList;
