// components
import { Button, Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
// styles
import { makeStyles } from '@material-ui/core/styles';
import {
	DataGrid,
	GridColDef,
	GridExportCsvOptions,
	GridRowData,
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@material-ui/data-grid';
import { AxiosResponse } from 'axios';
import React from 'react';
import useAxios from '../../config';
import { useStylesDT } from '../DateTime';

// const rowsStatic = [
// 	{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
// 	{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
// 	{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
// 	{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
// 	{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
// 	{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
// 	{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
// 	{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
// 	{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

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
}));

interface TableReportsProps {
	state: any;
	endDate: Date | null;
	initDate: Date | null;
	from?: string;
}

const TableReports: React.FC<TableReportsProps> = ({ initDate, endDate, state, from = '' }) => {
	const classes = useStyles();
	const classesDT = useStylesDT();

	const getExportFileName = () => {
		const day = initDate!.getDate();
		const month = initDate!.getMonth() + 1;
		const year = initDate!.getFullYear();
		const dayEnd = endDate!.getDate();
		const monthEnd = endDate!.getMonth() + 1;
		const yearEnd = endDate!.getFullYear();
		return `RD${from} ${keys} Desde:${day}-${month}-${year} Hasta:${dayEnd}-${monthEnd}-${yearEnd}`;
	};

	const keys: string[] = Object.entries(state)
		.filter(([key, value]) => value)
		.map(([key, value]): string => key);

	const exportType: GridExportCsvOptions = {
		fileName: getExportFileName(),
		// fileName: `RD${from} - ${keys} - ${date.toISOString().split('T')[0]}`,
	};
	const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(false);
	const [data, setData]: [any[], any] = React.useState<any>([]);
	const traerme = async () => {
		console.clear();
		try {
			setLoading(true);
			const resp: AxiosResponse<{ message: string; info: any[] }> = await useAxios.post(
				`/query?init=${initDate?.toISOString().split('T')[0]}&end=${endDate?.toISOString().split('T')[0]}`,
				{
					keys,
				}
			);

			setData(resp.data.info);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
		rowData = data.map((val: any, i: number) => {
			return { id: i, ...val };
		});
		if (rowData[0] !== undefined) {
			// eslint-disable-next-line react-hooks/exhaustive-deps
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keys]);

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer>
				<GridToolbarExport csvOptions={exportType} />
				<GridToolbarFilterButton />
			</GridToolbarContainer>
		);
	};
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

					<CardActions>
						<Button size='small' onClick={traerme} className={classes.Button}>
							Obtener reportes
						</Button>
					</CardActions>
				</div>
				<CardContent>
					{data !== undefined && !loading && (
						<div style={{ height: 400, width: '100%' }}>
							<DataGrid
								components={{
									Toolbar: customToolbar,
								}}
								rows={rowData}
								columns={columns}
								pageSize={25}
								checkboxSelection
								disableSelectionOnClick
							/>
						</div>
					)}
				</CardContent>
			</Card>
		</>
	);
};

export default TableReports;
