// components
import { Button, Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
// styles
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import React from 'react';
import useAxios from '../../config';

const rowsStatic = [
	{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
	{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
	{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
	{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
	{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
	{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
	{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
	{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
	{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const useStyles = makeStyles({
	root: {
		minWidth: 275,
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
});

interface TableReportsProps {
	state: any;
	endDate: Date | null;
	initDate: Date | null;
}

const TableReports: React.FC<TableReportsProps> = ({ initDate, endDate, state }) => {
	const classes = useStyles();

	const colsID: GridColDef[] = Object.entries(state)
		.filter(([key, value]) => value)
		.map(([key, value]: any): GridColDef => {
			return {
				field: key,
				headerName: key,
				type: 'string',
				width: 240,
				editable: false,
			};
		});

	let keys: GridColDef[] = Object.entries(state)
		.filter(([key, value]) => value)
		.map(([key, value]: any): GridColDef => {
			return {
				field: key,
				headerName: key,
				type: 'string',
				width: 240,
				editable: false,
			};
		});

	const traerme = async () => {
		try {
			const resp = await useAxios.post(
				`/query?init=${initDate?.toISOString().split('T')[0]}&end=${endDate?.toISOString().split('T')[0]}`,
				{
					keys,
				}
			);
		} catch (error) {}
	};

	return (
		<>
			<Card className={classes.root}>
				<CardHeader
					title='Resultados'
					subheader='Puede ordenar por columna de la tabla segun los campos seleccionados'
				/>
				<CardActions>
					<Button size='small' onClick={traerme}>
						Obtener reportes
					</Button>
				</CardActions>
				<CardContent>
					<div style={{ height: 400, width: '100%' }}>
						<DataGrid rows={rowsStatic} columns={keys} pageSize={5} checkboxSelection disableSelectionOnClick />
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default TableReports;
