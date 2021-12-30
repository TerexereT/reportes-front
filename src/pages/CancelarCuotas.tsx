/* eslint-disable react-hooks/exhaustive-deps */
import {
	Backdrop,
	Box,
	Button,
	Card,
	CircularProgress,
	Fade,
	InputAdornment,
	makeStyles,
	Modal,
	TextField,
	Theme,
} from '@material-ui/core';
import {
	DataGrid,
	GridColDef,
	GridRowData,
	GridToolbarContainer,
	GridToolbarFilterButton,
} from '@material-ui/data-grid';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FC, Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { useStyles as useStylesT } from '../components/table';
import useAxios from '../config';
import Round from '../functions/Round';

const useStyles = makeStyles((theme: Theme) => ({
	base: {
		display: 'flex',
		width: '100%',
		height: '100vh',
		padding: '2rem',
	},
	closeBtn: {
		width: 40,
		height: 40,
		position: 'absolute',
		top: 8,
		right: 8,
		padding: 0,
		minWidth: 'unset',
		borderRadius: 20,
	},
	textField: {
		margin: '1rem',
	},
	searchBtn: {
		width: '40px',
		height: 30,
		padding: 0,
		minWidth: 'unset',
		marginRight: 8,
		'& span > div': {
			marginLeft: 0,
		},
	},
	modalContainer: {
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
	},
	pagarCuota: {
		width: '50%',
		height: 50,
		margin: '1rem 0',
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		'&:hover': {
			background: theme.palette.primary.light,
		},
	},
	autocomplete: {
		width: '80%',
	},
	row: {
		display: 'flex',
		alignItems: 'center',
	},
	totalRow: {
		display: 'flex',
		flexDirection: 'column',
		margin: '8px 0',
		'& > p': {
			margin: '8px 0',
		},
	},
}));

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50%',
	height: 'max-content',
	bgcolor: 'background.paper',
	borderRadius: 4,
	// border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface SelectedRowInt {
	AFILIADO: string;
	ESTATUS: string;
	FECHPROCESO: string;
	IVA: number;
	MONTOTOTAL: number;
}
interface DicomSelectedInt {
	id: number;
	valorVenta: number;
}

const CancelarCuotas: FC = () => {
	const classes = useStyles();
	const classesT = useStylesT();

	const [data, setData] = useState<GridRowData[]>([]);
	const [open, setOpen] = useState(false);
	const [state, setState] = useState({});
	const [dicom, setDicom] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fecha, setFecha] = useState<string>();
	const [cuotaIva, setCuotaIva] = useState(0);
	const [cuotaNeto, setCuotaNeto] = useState(0);
	const [cuotaTotal, setCuotaTotal] = useState(0);
	const [terminal, setTerminal] = useState('');
	const [dicomSelected, setDicomSelected] = useState<DicomSelectedInt>({
		id: 0,
		valorVenta: 0,
	});
	const [selectedRow, setSelectedRow] = useState<SelectedRowInt>({
		AFILIADO: '',
		ESTATUS: '',
		FECHPROCESO: '',
		IVA: 0,
		MONTOTOTAL: 0,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTerminal(event.target.value);
	};

	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);

	let columns: GridColDef[] = Object.entries(state).map(([key, value]: any): GridColDef => {
		if (key === 'MONTOTOTAL') {
			return {
				field: key,
				headerName: 'MONTOTOTAL($)',
				type: 'string',
				width: 200,
			};
		}
		if (key === 'IVA') {
			return {
				field: key,
				headerName: 'IVA($)',
				type: 'string',
				width: 120,
			};
		}
		return {
			field: key,
			headerName: key,
			type: 'string',
			width: 240,
		};
	});

	let rowData: GridRowData[] = data.map((val: any, i: number) => {
		return { id: i, ...val };
	});

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer style={{ marginLeft: '1rem' }}>
				<GridToolbarFilterButton />
			</GridToolbarContainer>
		);
	};

	const DoubleClick = (event: any) => {
		handleOpen();
		setSelectedRow(event.row);
	};

	const handleCancelar = async () => {
		try {
			await useAxios.put(`/cancelar_cuotas/cuota`, {
				terminal,
				...selectedRow,
				dicomSelected,
			});
		} catch (error) {}
	};

	const Search = async (e: any) => {
		if (e.key === 'Enter') {
			try {
				setLoading(true);
				await useAxios
					.post(`/cancelar_cuotas`, {
						terminal,
					})
					.then((resp) => {
						setData(resp.data.info);
						setLoading(false);
					});
			} catch (error) {
				setLoading(false);
			}
		}
	};

	useLayoutEffect(() => {
		const getData = async () => {
			await useAxios.get(`/cancelar_cuotas/keys`).then((resp) => {
				setState(resp.data.info);
			});
			await useAxios.get(`/dicom`).then((resp) => {
				setDicom(resp.data.info);
				setDicomSelected(resp.data.info[0]);
			});
		};
		getData();
	}, []);

	useEffect(() => {
		rowData = data.map((val: any, i: number) => {
			return { id: i, ...val };
		});
		if (Object.keys(selectedRow).length > 0) {
			const fechaFormateada = new Date(selectedRow.FECHPROCESO).toLocaleDateString();
			const cuota = selectedRow.MONTOTOTAL * dicomSelected.valorVenta;
			const iva = selectedRow.IVA * dicomSelected.valorVenta;
			setFecha(fechaFormateada);
			setCuotaNeto(Round(cuota));
			setCuotaIva(Round(iva));
			setCuotaTotal(Round(cuota + iva));
		}
	}, [data, dicomSelected, selectedRow]);

	return (
		<>
			<Fragment>
				<div className='ed-container'>
					<div className={classes.base}>
						<Card className={classesT.root} style={{ width: '100%' }}>
							<div className={classes.row}>
								<TextField
									className={classes.textField}
									variant={'outlined'}
									label='Ingrese Terminal'
									value={terminal}
									onKeyPress={Search}
									InputProps={{
										startAdornment: (
											<Button onClick={Search} className={classes.searchBtn}>
												<InputAdornment position={'end'}>
													<SearchIcon />
												</InputAdornment>
											</Button>
										),
									}}
									onChange={handleChange}
								/>
								{loading && <CircularProgress className={classesT.loading} />}
							</div>
							<DataGrid
								components={{
									Toolbar: customToolbar,
								}}
								rows={rowData}
								columns={columns}
								rowsPerPageOptions={[25, 50, 100]}
								checkboxSelection
								columnBuffer={1}
								onCellDoubleClick={DoubleClick}
								disableSelectionOnClick
							/>
						</Card>
					</div>
				</div>
			</Fragment>
			<Modal
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<Box sx={style}>
						<Button className={classes.closeBtn} onClick={handleClose}>
							<CloseIcon />
						</Button>
						<div className={classes.modalContainer}>
							<Autocomplete
								className={classes.autocomplete}
								options={dicom}
								value={dicomSelected}
								getOptionLabel={(option: any) => (option.valorVenta ? `${option.valorVenta}` : '')}
								getOptionSelected={(option: any, value: any) => option.id === value.id}
								onChange={(event, value: any) => {
									setDicomSelected(value);
								}}
								renderInput={(params: any) => (
									<TextField {...params} name='dicom' label='Tasa Dicom' variant='outlined' />
								)}
							/>
							<div className={classes.totalRow}>
								<p>
									<b>Fecha:</b> {fecha}
								</p>
								<p>
									<b>Monto:</b> {cuotaNeto}
								</p>
								<p>
									<b>IVA: </b>
									{cuotaIva}
								</p>
								<p>
									<b>Total de cuota: </b>
									{cuotaTotal}
								</p>
							</div>
							<Button className={classes.pagarCuota} onClick={handleCancelar}>
								Cancelar Cuota
							</Button>
						</div>
					</Box>
				</Fade>
			</Modal>
		</>
	);
};

export default CancelarCuotas;
