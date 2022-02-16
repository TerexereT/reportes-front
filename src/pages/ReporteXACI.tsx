/* eslint-disable react-hooks/exhaustive-deps */
import { Card, LinearProgress, makeStyles, Theme } from '@material-ui/core';
import {
	DataGrid,
	GridColDef,
	GridExportCsvOptions,
	GridRowData,
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@material-ui/data-grid';
import classNames from 'classnames';
import { FC, Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { useStyles as useStylesT } from '../components/table';
import useAxios from '../config';
import formatData from '../functions/FormatData';

const useStyles = makeStyles((theme: Theme) => ({
	base: {
		display: 'flex',
		width: '100%',
		height: '100vh',
		padding: '2rem',
	},
	loading: {
		position: 'absolute',
		top: '40%',
		left: 0,
		right: 0,
		textAlign: 'center',
		fontSize: 48,
		color: theme.palette.primary.main,
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

const ReporteXACI: FC = () => {
	const [state, setState] = useState({});
	const [loading, setLoading] = useState(true);
	const [errorLoading, setError] = useState(false);
	const [data, setData] = useState<GridRowData[]>([]);
	const [rowData, setRowData] = useState<GridRowData[]>([]);
	const [columnData, setColumnData] = useState<GridColDef[]>([]);

	const classes = useStyles();
	const classesT = useStylesT();

	// let columns: GridColDef[] = Object.entries(state).map(([key, value]: any): GridColDef => {
	// 	if (key === 'MONTO') {
	// 		return {
	// 			field: key,
	// 			headerName: 'MONTO($)',
	// 			type: 'string',
	// 			width: 150,
	// 		};
	// 	}
	// 	if (key === 'MONTOTOTAL') {
	// 		return {
	// 			field: key,
	// 			headerName: 'MONTOTOTAL($)',
	// 			type: 'string',
	// 			width: 200,
	// 		};
	// 	}
	// 	if (key === 'MONTOTOTAL_BS') {
	// 		return {
	// 			field: key,
	// 			headerName: 'MONTOTOTAL(BS)',
	// 			type: 'string',
	// 			width: 205,
	// 		};
	// 	}
	// 	if (key === 'IVA') {
	// 		return {
	// 			field: key,
	// 			headerName: 'IVA($)',
	// 			type: 'string',
	// 			width: 120,
	// 		};
	// 	}
	// 	if (key === 'id') {
	// 		return {
	// 			field: key,
	// 			headerName: 'Nro',
	// 			type: 'string',
	// 			width: 60,
	// 		};
	// 	}
	// 	return {
	// 		field: key,
	// 		headerName: key,
	// 		type: 'string',
	// 		width: 220,
	// 	};
	// });

	// let rowData: GridRowData[] = [];
	//     = data.map((val: any, i: number) => {
	// 	return { id: i, ...val };
	// });

	const getExportFileName = () => {
		const initDate = new Date(Date.now());
		const day = initDate.getDate();
		const month = initDate.getMonth() + 1;
		const year = initDate.getFullYear();
		// const ext = `.csv`;
		const ext = ``;
		return `RDMantXACI [${day}-${month}-${year}]${ext}`;
	};

	const exportType: GridExportCsvOptions = {
		fileName: getExportFileName(),
		delimiter: ';',
	};

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer style={{ marginLeft: '1rem' }}>
				<GridToolbarFilterButton />
				<GridToolbarExport csvOptions={exportType} />
			</GridToolbarContainer>
		);
	};

	const updateColumns = () => {
		return Object.entries(state).map(([key, value]: any): GridColDef => {
			if (key === 'TERMINAL') {
				return {
					field: key,
					headerName: 'TERMINAL',
					type: 'string',
					width: 150,
				};
			}
			if (key === 'AFILIADO') {
				return {
					field: key,
					headerName: 'AFILIADO',
					type: 'string',
					width: 150,
				};
			}
			if (key === 'MONTO') {
				return {
					field: key,
					headerName: 'MONTO($)',
					type: 'string',
					width: 150,
				};
			}
			if (key === 'MONTOTOTAL') {
				return {
					field: key,
					headerName: 'MONTOTOTAL($)',
					type: 'string',
					width: 200,
				};
			}
			if (key === 'MONTOTOTAL_BS') {
				return {
					field: key,
					headerName: 'MONTOTOTAL(BS)',
					type: 'string',
					width: 205,
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
			if (key === 'id') {
				return {
					field: key,
					headerName: 'Nro',
					type: 'string',
					width: 60,
				};
			}
			return {
				field: key,
				headerName: key,
				type: 'string',
				width: 220,
			};
		});
	};

	useEffect(() => {
		let auxData = data.map((val: any, i: number) => {
			return { id: i, ...val };
		});
		setRowData(auxData);
		if (state) {
			setColumnData(updateColumns());
		}
	}, [data, state]);

	useLayoutEffect(() => {
		const getData = async () => {
			try {
				await useAxios.get(`/reporte_aci/keys`).then((resp) => {
					setState(resp.data.info);
				});
				await useAxios.get(`/reporte_aci`).then((resp) => {
					setData(formatData(resp.data.info));
				});
			} catch (error) {
				console.log(error);
				setError(true);
			}
			setLoading(false);
		};
		getData();
	}, []);

	return (
		<>
			<Fragment>
				<div className={classNames('ed-container', classes.base)}>
					<Card className={classesT.root} style={{ width: '100%', position: 'relative' }}>
						{loading ? (
							<>
								<LinearProgress />
								<div className={classes.loading}>Cargando...</div>
							</>
						) : errorLoading ? (
							<div className={classes.loading}>Error al cargar la información, actualice la página</div>
						) : (
							<DataGrid
								components={{
									Toolbar: customToolbar,
								}}
								rows={rowData}
								columns={columnData}
								rowsPerPageOptions={[25, 50, 100]}
								columnBuffer={1}
								disableSelectionOnClick
							/>
						)}
					</Card>
				</div>
			</Fragment>
		</>
	);
};

export default ReporteXACI;
