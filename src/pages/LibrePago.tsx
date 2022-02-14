/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CircularProgress, InputAdornment, makeStyles, TextField, Theme } from '@material-ui/core';
import {
	DataGrid,
	GridColDef,
	GridExportCsvOptions,
	GridRowData,
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@material-ui/data-grid';
import SearchIcon from '@material-ui/icons/Search';
import { CardActions, Typography } from '@mui/material';
import { FC, Fragment, useEffect, useLayoutEffect, useState } from 'react';
import SelectList from '../components/DateTime';
import { useStyles as useStylesT } from '../components/table';
import useAxios from '../config';

const useStyles = makeStyles((theme: Theme) => ({
	base: {
		display: 'flex',
		flexDirection: 'column',
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
		justifyContent: 'center',
	},
	totalRow: {
		display: 'flex',
		flexDirection: 'column',
		margin: '8px 0',
		'& > p': {
			margin: '8px 0',
		},
	},
	loadingAbsolute: {
		position: 'fixed',
		bottom: '1rem',
		right: '1rem',
	},
	Button: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		textTransform: 'none',
		'&:hover': {
			background: theme.palette.primary.light,
			color: theme.palette.primary.contrastText,
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

const LibrePago: FC = () => {
	const classes = useStyles();
	const classesT = useStylesT();

	const today = new Date();
	const lastMonth = new Date(today);
	const [data, setData] = useState<GridRowData[]>([]);
	const [state, setState] = useState({});
	const [Cantidad, setCantidad] = useState(0);
	const [loading, setLoading] = useState(false);
	const [endDate, setEndDate] = useState<Date | null>(today);
	const [terminal, setTerminal] = useState('');
	const [initDate, setInitDate] = useState<Date | null>(lastMonth);
	const [download, setDownload]: [boolean, (download: boolean) => void] = useState<boolean>(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const re = /^\d+(\,*(\d*)+)*$/;
		const value: string = event.target.value;
		if (re.test(value) || value === '') setTerminal(value);
	};

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

	const getExportFileName = () => {
		const initDate = new Date(Date.now());
		const day = initDate.getDate();
		const month = initDate.getMonth() + 1;
		const year = initDate.getFullYear();
		// const ext = `.csv`;
		const ext = ``;
		return `RDLibrePago [${day}-${month}-${year}]${ext}`;
	};

	const exportType: GridExportCsvOptions = {
		fileName: getExportFileName(),
		delimiter: ';',
		// fileName: `RD${from} - ${keys} - ${date.toISOString().split('T')[0]}`,
	};

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer style={{ marginLeft: '1rem' }}>
				<GridToolbarFilterButton />
				{download && <GridToolbarExport csvOptions={exportType} />}
			</GridToolbarContainer>
		);
	};

	const Search = async (e: any) => {
		if (e.key === 'Enter') {
			let terminalArray = terminal
				.split(',')
				.filter((val) => val !== ',')
				.filter((val) => val !== '')
				.join(',');
			try {
				setLoading(true);
				await useAxios
					.post(
						`/libre-pago?init=${initDate?.toISOString().split('T')[0]}&end=${
							endDate?.toISOString().split('T')[0]
						}`,
						{
							terminales: terminalArray,
						}
					)
					.then((resp) => {
						setData(resp.data.info);
						setLoading(false);
						setDownload(true);
					});
			} catch (error) {
				setDownload(false);
				setLoading(false);
			}
		}
	};

	useLayoutEffect(() => {
		const getData = async () => {
			await useAxios.get(`/libre-pago/keys`).then((resp) => {
				setState(resp.data.info);
			});
		};
		getData();
	}, []);

	useEffect(() => {
		if (Object.keys(data).length > 0) {
			const last = data.length - 1;
			if (data[last].Fecha === 'TotalMonto') {
				setCantidad(data[last].Cantidad);
			}
		}
	}, [data]);

	return (
		<>
			<Fragment>
				<div className='ed-container'>
					<div className={classes.base}>
						<Card
							className={classesT.root}
							style={{ width: '100%', height: '100%', paddingBottom: '2rem', overflow: 'auto' }}>
							<SelectList
								initDate={initDate}
								endDate={endDate}
								setInitDate={setInitDate}
								setEndDate={setEndDate}
							/>
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
								<CardActions>
									<Button size='small' onClick={() => Search({ key: 'Enter' })} className={classes.Button}>
										Obtener reportes
									</Button>
								</CardActions>
								{loading && <CircularProgress className={classesT.loading} />}
								<Typography className={classesT.title} color='textSecondary' gutterBottom>
									Cantidad Total: {Cantidad}
								</Typography>
							</div>
							<DataGrid
								components={{
									Toolbar: customToolbar,
								}}
								rows={rowData}
								columns={columns}
								rowsPerPageOptions={[25, 50, 100]}
								columnBuffer={1}
							/>
						</Card>
					</div>
				</div>
			</Fragment>
		</>
	);
};

export default LibrePago;
