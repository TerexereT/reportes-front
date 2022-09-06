/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextField, TextFieldProps, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import makeStyles from '@mui/styles/makeStyles';
import { FC, useState } from 'react';
import Swal from 'sweetalert2';
import { handleError, handleLoading } from '../components/swal/alerts';
import useAxios from '../config';
import { useStyles } from './RepDinamicos';

export const useStylesDT = makeStyles((styles) => ({
	title: {
		fontSize: 24,
		color: styles.palette.text.secondary,
		marginBottom: 0,
		padding: 16,
	},
	Button: {
		background: styles.palette.primary.main,
		color: styles.palette.common.white,
		marginRight: '1rem',
		'&:hover': {
			background: styles.palette.primary.light,
			color: styles.palette.common.white,
		},
	},
	container: {
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column',
		width: '30%',
	},
	datePicker: {
		margin: '16px 10px 8px',
	},
}));

const ExecContraCargo: FC = () => {
	const classes = useStyles();

	const classes2 = useStylesDT();

	//const [state, setState] = .useState({});
	const [load, setLoad] = useState(false);
	const [fecha, setFecha] = useState<Date | null>(new Date());

	const handleExecContraCargo = async () => {
		Swal.fire({
			title: '¿Esta seguro que quiere ejecutar contracargo?',
			icon: 'info',
			showDenyButton: true,
			confirmButtonText: 'Si, estoy seguro',
			denyButtonText: 'Cancelar',
			allowOutsideClick: false,
			allowEscapeKey: false,
			customClass: {
				actions: 'my-actions',
				confirmButton: 'order-2',
				denyButton: 'order-3',
			},
		}).then(async (result) => {
			setLoad(true);
			if (result.isConfirmed) {
				try {
					handleLoading();
					const res = await useAxios.post(`/contracargo/exec`, { fecha: fecha });
					if (res.data.info.ok) {
						setLoad(false);
						if (res.data.info.fecha) {
							const date = res.data.info.fecha.split('-');
							//console.log('aqui', date);
							Swal.fire('Listo Contracargo', `${date[1]}/${date[2]}/${date[0]}`, 'success');
						} else Swal.fire('Listo', 'Contracargo ejecutado', 'success');
					}
				} catch (error) {
					handleError(error);
					setLoad(false);
				}
			}
		});
	};

	return (
		<>
			<div className={classes.base}>
				<div
					className={classes.cards}
					style={{
						marginTop: '5rem',
						display: 'flex',
						justifyContent: 'center',
					}}>
					<div className={classes2.container}>
						<Typography className={classes2.title} color='textSecondary' gutterBottom>
							Fecha
						</Typography>
						<DatePicker
							renderInput={(props: TextFieldProps) => (
								<TextField label='Date' value={fecha?.toLocaleString()} {...props} />
							)}
							className={classes2.datePicker}
							inputFormat='dd/MM/yyyy'
							label='Ingrese la fecha'
							value={fecha}
							onChange={(newValue: Date | null) => {
								setFecha(newValue!);
							}}
							disableFuture={true}
							maxDate={new Date()}
							//maxDate={endDate}
						/>
						<Button
							style={{ fontSize: '1rem', padding: '1rem', borderRadius: '1rem', marginTop: '1rem' }}
							variant='contained'
							onClick={handleExecContraCargo}
							disabled={load}>
							Ejecutar ContraCargo
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ExecContraCargo;
