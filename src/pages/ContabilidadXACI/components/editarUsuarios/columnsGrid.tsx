import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

export const columnsGestionUsuario: GridColDef[] = [
	{
		field: 'nombre',
		headerName: 'Nombre',
		width: 200,
		sortable: false,
		disableColumnMenu: true,
	},
	{
		field: 'identificacion',
		headerName: 'Document Ident.',
		sortable: false,
		width: 160,
		valueGetter: (params: GridValueGetterParams) => {
			return `${params.row.tipoIdentificacion}${params.row.identificacion}`;
		},
	},
];
