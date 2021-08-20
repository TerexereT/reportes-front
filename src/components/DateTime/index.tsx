import DateFnsUtils from '@date-io/date-fns';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import classnames from 'classnames';
import 'date-fns';
import React from 'react';

export const useStylesDT = makeStyles({
	title: {
		fontSize: 25,
	},
});

export default function MaterialUIPickers() {
	// The first commit of Material-UI
	const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date('2014-08-18T21:11:54'));

	const classes = useStylesDT();

	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<div className='ed-grid m-grid-4'>
				<Typography className={classnames(classes.title, 'm-cross-end')} color='textSecondary' gutterBottom>
					Fecha de inicio{' '}
				</Typography>
				<KeyboardDatePicker
					disableToolbar
					variant='inline'
					format='MM/dd/yyyy'
					margin='normal'
					id='date-picker-inline'
					label='Date picker inline'
					value={selectedDate}
					onChange={handleDateChange}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
				<Typography className={classnames(classes.title, 'm-cross-end')} color='textSecondary' gutterBottom>
					Fecha Final{' '}
				</Typography>
				<KeyboardDatePicker
					disableToolbar
					variant='inline'
					format='MM/dd/yyyy'
					margin='normal'
					id='date-picker-inline'
					label='Date picker inline'
					value={selectedDate}
					onChange={handleDateChange}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
			</div>
		</MuiPickersUtilsProvider>
	);
}
