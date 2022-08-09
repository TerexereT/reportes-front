/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import CloseIcon from '@mui/icons-material/Close';
//import { Autocomplete, Avatar, Button, Grid, Paper, TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import axios from '../../../../config';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useStyles } from '../../styles';
import { handleError } from '../../../../components/swal/alerts';
import { columnsGestionUsuario } from './columnsGrid';
import { Department, Roles } from '../../interfaces';

interface Props {
	listDepartment: Department[];
	listRoles: Roles[];
	allUser: any[];
}

const GestionUsuarios: React.FC<Props> = ({ listDepartment, listRoles, allUser }) => {
	const classes = useStyles();

	const [userBlocked, setUserBlocked] = useState<boolean>(false);
	const [openUserView, setUserView] = useState<boolean>();
	//
	const [userRol, setUserRol] = useState<any>(null);
	const [userDep, setUserDep] = useState<any>(null);

	const [userID, setUserID] = useState<number>(0);
	const [name, setName] = useState<string>('');
	const [lname, setLName] = useState<string>('');

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className='m-main-justify m-px-2'>
				<div className={classes.tableTitle}>Usuarios</div>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

	const handleCloseRow = (event: any) => {
		setUserView(false);
	};

	const resetUser = () => {
		setUserBlocked(false);
		setLName('');
		setName('');
		setUserDep(null);
		setUserRol(null);
		setUserID(0);
		setName('');
	};

	const handleRow = (event: any) => {
		resetUser();
		/*
		if (!permiss['Ver Usuarios']) {
			handleNotAccess();
			return;
		}
		*/
		getuserRol(event.row.id);
		setUserView(true);
	};

	const getuserRol = async (id: number) => {
		try {
			const resp = await axios.get(`seguridad/worker/${id}`);
			const data = resp.data.info;
			setUserBlocked(data.active === 0 ? false : true);
			setLName(data.last_name);
			setName(data.name);
			setUserDep(data.id_department);
			setUserRol(data.id_rol);
			setUserID(data.id);
		} catch (error) {
			console.log('error getuserRol', error);
		}
	};

	const handleSelect = (event: any, value: any, item: string) => {
		switch (item) {
			case 'department':
				setUserDep(value);
				break;
			case 'rol':
				setUserRol(value);
				break;
			default:
				break;
		}
	};

	const handleSaveData = () => {
		Swal.fire({
			title: '¿Estas seguro de realizar estos cambios?',
			showDenyButton: true,
			confirmButtonText: 'Si',
			denyButtonText: 'No',
			customClass: {
				actions: 'my-actions',
				confirmButton: 'order-2',
				denyButton: 'order-3',
			},
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await axios.put(`/worker/${userID}`, {
						//update
						id_rol: userRol.id,
						id_department: userDep.id,
						block: userBlocked ? 1 : 0,
					});
					Swal.fire('Cambios Guardados', '', 'success');
				} catch (error) {
					handleError(error);
				}
			} else if (result.isDenied) {
				// Swal.fire('Changes are not saved', '', 'info');
			}
		});
	};
	return (
		<>
			<Grid container spacing={4}>
				<Grid item xs={5}>
					<div style={{ height: '80vh', width: '100%' }}>
						{
							// loading &&
							<DataGrid
								components={{
									Toolbar: customToolbar,
								}}
								rows={allUser}
								columns={columnsGestionUsuario}
								rowsPerPageOptions={[25, 100]}
								onCellClick={handleRow}
							/>
						}
					</div>
				</Grid>
				{/*
				<Grid item xs={7}>
					{openUserView && name && name ? (
						<Paper variant='outlined'>
							<div className={classes.card}>
								<Button sx={sxStyled.closeBtn} onClick={handleCloseRow}>
									<CloseIcon />
								</Button>
								<form className={classes.form}>
									<div className={classes.grid}>
										<div className={classes.img}>
											<Avatar sx={sxStyled.avatarLetter}>{`${name.slice(0, 1)}${lname.slice(0, 1)}`}</Avatar>
										</div>
										<div>
											<div className={classes.textFields}>
												<TextField
													disabled
													key={1}
													id='name'
													name='name'
													label='Nombre Completo'
													variant='outlined'
													type='text'
													value={name + ' ' + lname}
												/>
												{userDep && userRol ? (
													<>
														<Autocomplete
															className={classes.inputText}
															onChange={(event, value) =>
																value ? handleSelect(event, value, 'department') : null
															}
															value={userDep}
															getOptionLabel={(option: any) => (option.name ? option.name : '')}
															isOptionEqualToValue={(option: any) => option.id === userDep.id}
															options={listDepartment}
															renderInput={(params: any) => (
																<TextField {...params} name='department' label='Departamento' variant='outlined' />
															)}
														/>
														<Autocomplete
															className={classes.inputText}
															onChange={(event, value) => (value ? handleSelect(event, value, 'rol') : null)}
															value={userRol}
															getOptionLabel={(option: any) => option.name}
															isOptionEqualToValue={(option, value) => option.id === value.id}
															options={listRoles}
															renderInput={(params: any) => (
																<TextField {...params} name='rol' label='Cargo' variant='outlined' />
															)}
														/>
													</>
												) : null}
												<Button
													onClick={() => setUserBlocked(!userBlocked)}
													sx={!userBlocked ? sxStyled.blockedButtonOff : sxStyled.blockedButtonOn}>
													{userBlocked ? `Desbloquear` : `Bloquear`}
												</Button>
											</div>
											<div className={classnames(classes.row, classes.column)}>
												<div className={classes.cardTitles}>Permisos</div>
											</div>
										</div>
										<div className=''></div>
										<Button sx={sxStyled.buttonSaveData} onClick={handleSaveData}>
											Guardar
										</Button>
									</div>
								</form>
							</div>
						</Paper>
					) : openUserView ? (
						<LoaderLine />
					) : null}
				</Grid>
					*/}
			</Grid>
		</>
	);
};

export default GestionUsuarios;
