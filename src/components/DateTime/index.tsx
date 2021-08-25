import DateFnsUtils from '@date-io/date-fns';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import classnames from 'classnames';
import 'date-fns';
import React from 'react';

export const useStylesDT = makeStyles((styles) => ({
	title: {
		fontSize: 24,
		color: styles.palette.primary.main,
	},
}));

interface MaterialUIPickersProps {
	initDate: Date | null;
	endDate: Date | null;
	setInitDate: React.Dispatch<React.SetStateAction<Date | null>>;
	setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const MaterialUIPickers: React.FC<MaterialUIPickersProps> = ({ initDate, endDate, setInitDate, setEndDate }) => {
	const classes = useStylesDT();

	const handleInitDateChange = (date: Date | null) => {
		setInitDate(date);
	};
	const handleEndDateChange = (date: Date | null) => {
		setEndDate(date);
	};

	return (
		<>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<div className='ed-grid m-cross-baseline m-grid-5 s-px-2 s-pt-2'>
					<Typography className={classnames(classes.title, 'm-cross-end')} color='textSecondary' gutterBottom>
						Fecha de inicio
					</Typography>
					<KeyboardDatePicker
						disableToolbar
						variant='inline'
						format='MM/dd/yyyy'
						margin='normal'
						// id='date-picker-inline'
						label='Seleccione la fecha'
						value={initDate}
						onChange={handleInitDateChange}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
						disableFuture={true}
						maxDate={endDate}
						maxDateMessage='Seleccione una fecha menor a la fecha fin'
					/>
					<Typography className={classnames(classes.title, 'm-cross-end')} color='textSecondary' gutterBottom>
						Fecha Final
					</Typography>
					<KeyboardDatePicker
						disableToolbar
						variant='inline'
						format='MM/dd/yyyy'
						margin='normal'
						// id='date-picker-inline'
						label='Seleccione la fecha'
						value={endDate}
						onChange={handleEndDateChange}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
						disableFuture={true}
					/>
				</div>
			</MuiPickersUtilsProvider>
		</>
	);
};

export default MaterialUIPickers;
