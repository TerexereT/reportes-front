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
		marginBottom: 0,
		padding: 16,
	},
	Button: {
		background: styles.palette.primary.main,
		color: styles.palette.primary.contrastText,
		marginRight: '1rem',
		'&:hover': {
			background: styles.palette.primary.light,
			color: styles.palette.primary.contrastText,
		},
	},
	row: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
		alignItems: 'center',
	},
	datePicker: {
		margin: '16px 10px 8px',
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
				<div
					// className='ed-grid m-cross-baseline m-grid-5 s-px-2 s-pt-2'
					className={classes.row}>
					<Typography className={classes.title} color='textSecondary' gutterBottom>
						Fecha de inicio
					</Typography>
					<KeyboardDatePicker
						className={classes.datePicker}
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
					<Typography className={classnames(classes.title)} color='textSecondary' gutterBottom>
						Fecha Final
					</Typography>
					<KeyboardDatePicker
						className={classes.datePicker}
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
