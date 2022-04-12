/* eslint-disable react-hooks/exhaustive-deps */
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { TextField, TextFieldProps, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import classnames from 'classnames';
import 'date-fns';
import { FC } from 'react';

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
		marginTop: '10px',
	},
	datePicker: {
		margin: '16px 10px 8px',
	},
}));

interface MaterialUIPickersProps {
	initDate: Date | undefined;
	endDate: Date | undefined;
	setInitDate: any;
	setEndDate: any;
}

const MaterialUIPickers: FC<MaterialUIPickersProps> = ({ initDate, endDate, setInitDate, setEndDate }) => {
	const classes = useStylesDT();

	const handleInitDateChange = (date: Date | null | undefined) => {
		setInitDate(date);
	};
	const handleEndDateChange = (date: Date | null | undefined) => {
		setEndDate(date);
	};

	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<div className={classes.row}>
					<Typography className={classes.title} color='textSecondary' gutterBottom>
						Fecha de inicio
					</Typography>
					<DatePicker
						renderInput={(props: TextFieldProps) => (
							<TextField label='Date' value={initDate?.toLocaleString()} {...props} />
						)}
						className={classes.datePicker}
						inputFormat='dd/MM/yyyy'
						label='Ingrese la fecha de inicio'
						value={initDate}
						onChange={handleInitDateChange}
						disableFuture={true}
						maxDate={endDate}
					/>
					<Typography className={classnames(classes.title)} color='textSecondary' gutterBottom>
						Fecha Final
					</Typography>
					<DatePicker
						renderInput={(props) => <TextField label='Date' value={endDate?.toLocaleString()} {...props} />}
						className={classes.datePicker}
						inputFormat='dd/MM/yyyy'
						label='Ingrese la fecha de fin'
						value={endDate}
						onChange={handleEndDateChange}
						disableFuture={true}
					/>
				</div>
			</LocalizationProvider>
		</>
	);
};

export default MaterialUIPickers;
