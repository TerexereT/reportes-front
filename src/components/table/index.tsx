// components
import { Button, Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
// styles
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import React from 'react';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{
		field: 'firstName',
		headerName: 'First name',
		width: 150,
		editable: true,
	},
	{
		field: 'lastName',
		headerName: 'Last name',
		width: 150,
		editable: true,
	},
	{
		field: 'age',
		headerName: 'Age',
		type: 'number',
		width: 110,
		editable: true,
	},
	{
		field: 'fullName',
		headerName: 'Full name',
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 160,
		valueGetter: (params: GridValueGetterParams) =>
			`${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''}`,
	},
];

const rows = [
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
}

const TableReports: React.FC<TableReportsProps> = ({ state }) => {
	const classes = useStyles();

	const cols: any[] = Object.entries(state)
		.filter(([key, value]: any) => value)
		.map(([key, value]: any): any => {
			return {
				field: key,
				headerName: key,
				type: 'string',
				width: 240,
				editable: false,
				resizable: true,
			};
		});

	return (
		<>
			<Card className={classes.root}>
				<CardHeader
					title='Resultados'
					subheader='Puede ordenar por columna de la tabla segun los campos seleccionados'
				/>
				<CardContent>
					<div style={{ height: 400, width: '100%' }}>
						<DataGrid rows={rows} columns={cols} pageSize={5} checkboxSelection disableSelectionOnClick />
					</div>
				</CardContent>
				<CardActions>
					<Button size='small'>Learn More</Button>
				</CardActions>
			</Card>
		</>
	);
};

export default TableReports;
