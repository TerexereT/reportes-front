/* eslint-disable react-hooks/exhaustive-deps */
// components
import { Button, Card, CardActions, CardContent, CardHeader, CircularProgress } from '@material-ui/core';
// styles
import { makeStyles } from '@material-ui/core/styles';
import {
	DataGrid,
	GridColDef,
	// GridExportCsvOptions,
	GridRowData,
	GridToolbarContainer,
	// GridToolbarExport,
	GridToolbarFilterButton,
} from '@material-ui/data-grid';
import DownloadIcon from '@material-ui/icons/GetApp';
import { Alert } from '@material-ui/lab';
import { AxiosResponse } from 'axios';
// import * as FileSaver from 'file-saver';
import React from 'react';
import { CSVLink } from 'react-csv';
// import * as XLSX from 'xlsx';
import useAxios from '../../config';
import { opciones } from '../../pages/Mantenimiento';
import { useStylesDT } from '../DateTime';

const useStyles = makeStyles((styles) => ({
	root: {
		minWidth: 275,
		boxShadow: '7px 7px 22px -4px rgba(0,0,0,0.74)',
		WebkitBoxShadow: '7px 7px 22px -4px rgba(0,0,0,0.74)',
		MozBoxShadow: '7px 7px 22px -4px rgba(0,0,0,0.74)',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	Button: {
		background: styles.palette.primary.main,
		color: styles.palette.primary.contrastText,
		'&:hover': {
			background: styles.palette.primary.light,
			color: styles.palette.primary.contrastText,
		},
	},
	row: {
		display: 'flex',
		alignItems: 'center',
		marginRight: '1rem',
	},
	loading: {
		marginRight: '1rem',
	},
	tooltip: {
		height: '100%',
		cursor: 'pointer',
		'& span > a': {
			textDecoration: 'none',
			color: '#2f3775',
		},
		'&:hover': {
			textDecoration: 'none',
		},
	},
	icon: {
		marginRight: 8,
		fill: '#2f3775',
	},
}));

interface TableReportsProps {
	state: any;
	endDate?: Date | null;
	initDate?: Date | null;
	mantOption?: number;
	from: 'CuotasVencidas' | 'Movimientos' | 'Mantenimiento';
}

const TableReports: React.FC<TableReportsProps> = ({
	initDate = new Date(Date.now()),
	endDate,
	state,
	from,
	mantOption,
}) => {
	const classes = useStyles();
	const classesDT = useStylesDT();

	const getExportFileName = () => {
		const day = initDate!.getDate();
		const month = initDate!.getMonth() + 1;
		const year = initDate!.getFullYear();
		if (mantOption !== undefined) {
			return `RDMantenimiento - ${opciones[mantOption]}`;
		}
		if (endDate !== undefined) {
			const dayEnd = endDate!.getDate();
			const monthEnd = endDate!.getMonth() + 1;
			const yearEnd = endDate!.getFullYear();
			return `RD${from}[Desde:${day}-${month}-${year} Hasta:${dayEnd}-${monthEnd}-${yearEnd}]`;
		}
		return `RD${from}[${day}-${month}-${year}]`;
	};

	const keys: string[] = Object.entries(state)
		.filter(([key, value]) => value)
		.map(([key, value]): string => key);
	// const exportType: GridExportCsvOptions = {
	// 	fileName: getExportFileName(),
	// 	delimiter: ';',
	// 	// fileName: `RD${from} - ${keys} - ${date.toISOString().split('T')[0]}`,
	// };
	const fieldRef = React.useRef<HTMLInputElement>(null);
	const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(false);
	const [download, setDownload]: [boolean, (download: boolean) => void] = React.useState<boolean>(false);
	const [error, setError]: [boolean, (loading: boolean) => void] = React.useState<boolean>(false);
	const [data, setData]: [any[], any] = React.useState<any>([]);
	let resp: AxiosResponse<{ message: string; info: any[] }>;
	const traerme = async () => {
		// console.clear();
		setError(false);
		setDownload(false);
		try {
			setLoading(true);
			if (from === 'Movimientos') {
				resp = await useAxios.post(
					`/history?init=${initDate?.toISOString().split('T')[0]}&end=${endDate?.toISOString().split('T')[0]}`,
					{
						keys,
					}
				);
				setData(resp.data.info);
				fieldRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}
			if (from === 'CuotasVencidas') {
				resp = await useAxios.post(`/aboterminal`, {
					keys,
				});
				setData(resp.data.info);
				fieldRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}
			if (from === 'Mantenimiento') {
				switch (mantOption) {
					case 1:
						resp = await useAxios.post(`/mantenimiento/1`, {
							keys,
						});
						setData(resp.data.info);
						fieldRef.current?.scrollIntoView({
							behavior: 'smooth',
							block: 'start',
						});
						break;
					case 2:
						resp = await useAxios.post(`/mantenimiento/2`, {
							keys,
						});
						setData(resp.data.info);
						fieldRef.current?.scrollIntoView({
							behavior: 'smooth',
							block: 'start',
						});
						break;
					case 3:
						resp = await useAxios.post(`/mantenimiento/3`, {
							keys,
						});
						setData(resp.data.info);
						fieldRef.current?.scrollIntoView({
							behavior: 'smooth',
							block: 'start',
						});
						break;
					default:
						resp = await useAxios.post(`/mantenimiento/0`, {
							keys,
						});
						setData(resp.data.info);
						fieldRef.current?.scrollIntoView({
							behavior: 'smooth',
							block: 'start',
						});
				}
			}
			setDownload(true);
			setLoading(false);
		} catch (error) {
			setDownload(false);
			setLoading(false);
			setError(true);
		}
	};

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer>
				{/* <GridToolbarExport csvOptions={exportType} id='exportBtn' /> */}
				<GridToolbarFilterButton />
				{download && (
					<Button className={classes.tooltip}>
						<DownloadIcon className={classes.icon} />
						<CSVLink data={data} filename={getExportFileName()}>
							Descargar
						</CSVLink>
					</Button>
				)}
			</GridToolbarContainer>
		);
	};

	let rowData: GridRowData[] = data.map((val: any, i: number) => {
		return { id: i, ...val };
	});
	let columns: GridColDef[] = [
		{ field: 'Seleccione filtros', headerName: 'key', type: 'string', width: 240, editable: false },
	];
	if (rowData[0] !== undefined) {
		columns = Object.entries(rowData[0]).map(([key, value]: any): GridColDef => {
			if (key === 'id') {
				return {
					field: key,
					headerName: key,
					type: 'string',
					width: 25,
				};
			}
			return {
				field: key,
				headerName: key,
				type: 'string',
				width: 240,
			};
		});
	}
	React.useEffect(() => {
		rowData = data.map((val: any, i: number) => {
			return { id: i, ...val };
		});
		if (rowData[0] !== undefined) {
			columns = Object.entries(rowData[0]).map(([key, value]: any): GridColDef => {
				if (key === 'id') {
					return {
						field: key,
						headerName: key,
						type: 'string',
						width: 20,
					};
				}
				return {
					field: key,
					headerName: key,
					type: 'string',
					width: 240,
				};
			});
		}
	}, [keys]);

	return (
		<>
			<Card className={classes.root}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<CardHeader
							title='Resultados'
							subheader='Tiempo aprox de respuesta: 1min.'
							className={classesDT.title}
							style={{ paddingBottom: 0 }}
						/>
						<CardHeader
							style={{ paddingTop: 0 }}
							subheader='Puede ordenar por columna de la tabla segun los campos seleccionados'
						/>
					</div>
					<div className={classes.row}>
						{loading && <CircularProgress className={classes.loading} />}
						{error && <Alert severity='error'>Error al obtener datos</Alert>}
						<CardActions>
							<Button size='small' onClick={traerme} className={classes.Button}>
								Obtener reportes
							</Button>
						</CardActions>
					</div>
				</div>
				<CardContent>
					<div style={{ height: 400, width: '100%' }}>
						<DataGrid
							ref={fieldRef}
							components={{
								Toolbar: customToolbar,
							}}
							rows={rowData}
							columns={columns}
							rowsPerPageOptions={[25, 50, 100]}
							checkboxSelection
							disableSelectionOnClick
						/>
					</div>
					<div ref={fieldRef}></div>
				</CardContent>
			</Card>
		</>
	);
};

export default TableReports;
