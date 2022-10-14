/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Avatar, Button, Grid, MenuItem, Paper, Select, TextField } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useState } from 'react';
import Swal from 'sweetalert2';
import LoaderLine from '../../../../components/loader/LoaderLine';
import { handleError } from '../../../../components/swal/alerts';
import { default as axios, default as useAxios } from '../../../../config';
import { Department, Roles } from '../../interfaces';
import { sxStyled, useStyles } from '../../styles';
import { columnsGestionUsuario } from './columnsGrid';

interface Props {
	listDepartment: Department[];
	listRoles: Roles[];
	allUser: any[];
	listStatus: any[];
}

export const listIdentType = [
	{
		name: 'V',
	},
	{
		name: 'E',
	},
	{
		name: 'J',
	},
	{
		name: 'R',
	},
	{
		name: 'P',
	},
];

const GestionUsuarios: React.FC<Props> = ({ listDepartment, listRoles, allUser, listStatus }) => {
	const classes = useStyles();

	const [userBlocked, setUserBlocked] = useState<boolean>(false);
	const [createUser, setCreateUser] = useState<boolean>(false);
	const [openUserView, setUserView] = useState<boolean>();
	//
	const [userRol, setUserRol] = useState<any>(null);
	const [userDep, setUserDep] = useState<any>(null);
	const [userStatus, setUserStatus] = useState<any>(null);
	// NewUser
	const [newUserRol, setnewUserRol] = useState<any>(null);
	const [newUserDep, setnewUserDep] = useState<any>(null);
	const [newName, setnewName] = useState('');
	const [newLogin, setnewLogin] = useState('');
	const [newNroDocument, setnewNroDocument] = useState('');
	const [newTypeDoc, setnewTypeDoc] = useState(listIdentType[0].name);
	const [newEmail, setnewEmail] = useState('');
	// const [newPassword, setnewPassword] = useState('');
	//
	const [userID, setUserID] = useState<number>(0);
	const [name, setName] = useState<string>('');
	const [login, setLogin] = useState<string>('');
	//
	const [disabledSelect, setDisabledSelect] = useState<boolean>(false);

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className={classes.tableHeader}>
				<div className={classes.tableTitle}>Usuarios</div>
				<GridToolbarFilterButton />
				<Button
					variant='contained'
					onClick={handleCreateUser}
					className={classes.createButton}
					startIcon={<AddIcon />}>
					Crear
				</Button>
			</GridToolbarContainer>
		);
	};

	const handleCloseRow = (event: any) => {
		setUserView(false);
	};

	const resetUser = () => {
		setUserBlocked(false);
		setLogin('');
		setName('');
		setUserDep(null);
		setUserRol(null);
		setUserStatus(null);
		setUserID(0);
		setName('');
	};

	const handleRow = (event: any) => {
		resetUser();
		if (disabledSelect) return;
		/*
		if (!permiss['Ver Usuarios']) {
			handleNotAccess();
			return;
		}
		*/
		getUserData(event.row);
		setUserView(true);
		setCreateUser(false);
	};

	const getUserData = async (user: any) => {
		setDisabledSelect(true);
		try {
			// console.log(user);
			const resp = await axios.get(`seguridad/workerSecurity/${user.id}`);
			// console.log(resp.data.info);
			const data = resp.data.info;
			setUserBlocked(data.active === 0 ? true : false);
			setLogin(user.login);
			setName(user.name);
			setUserDep(data.id_department);
			setUserRol(data.id_rol);
			setUserStatus(data.id_status);
			setUserID(user.id);
		} catch (error) {
			console.log('error getUserData', error);
		}
		setDisabledSelect(false);
	};

	const handleSelect = (event: any, value: any, item: string) => {
		switch (item) {
			case 'department':
				setUserDep(value);
				break;
			case 'rol':
				setUserRol(value);
				break;
			case 'status':
				setUserStatus(value);
				break;
			default:
				break;
		}
	};

	const handleNewSelect = (event: any, value: any, item: string) => {
		switch (item) {
			case 'department':
				setnewUserDep(value);
				break;
			case 'rol':
				setnewUserRol(value);
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
					await axios.put(`/seguridad/workerSecurity/${userID}`, {
						//update
						id_rol: userRol.id,
						id_department: userDep.id,
						id_status: userStatus.id,
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

	const handleCreateUser = () => {
		setCreateUser(true);
		setUserView(false);
	};

	const closeCreateUser = () => {
		setCreateUser(false);
	};

	const handleSaveCreatedUser = async () => {
		const data = {
			name: newName,
			login: newLogin,
			email: newEmail,
			rol: newUserRol,
			dep: newUserDep,
			type_doc: newTypeDoc,
			doc: newNroDocument,
		};

		Swal.fire({
			title: `¿Estas seguro de crear el usuario ${newName}?`,
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
					await useAxios.post(`/seguridad/create/user`, data).then((resp) => console.log(resp.data.info));
					Swal.fire('Usuario creado con éxito.', '', 'success');
				} catch (error) {
					// handleError(error);
				}
			} else if (result.isDenied) {
				// Swal.fire('Changes are not saved', '', 'info');
			}
		});
	};

	const validEmail = (value: string): boolean => {
		let validatedEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value);
		if (!validatedEmail) {
			return true;
		} else {
			return false;
		}
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
				<Grid item xs={6}>
					{openUserView && name && login ? (
						<Paper variant='outlined'>
							<div className={classes.card}>
								<Button sx={sxStyled.closeBtn} onClick={handleCloseRow}>
									<CloseIcon />
								</Button>
								<form className={classes.form}>
									<div className={classes.grid}>
										<div className={classes.img}>
											<Avatar /*sx={sxStyled.avatarLetter}*/>{`${name.slice(0, 1)}`}</Avatar>
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
													value={name}
												/>
												<>
													<Autocomplete
														className={classes.inputText}
														onChange={(event, value) => (value ? handleSelect(event, value, 'department') : null)}
														value={userDep}
														getOptionLabel={(option: any) => (option.name ? option.name : '')}
														isOptionEqualToValue={(option: any) => option.id === userDep.id}
														options={listDepartment}
														renderInput={(params: any) => (
															<TextField
																{...params}
																name='department'
																label='Seleciona un Departmento'
																variant='outlined'
															/>
														)}
													/>
													<Autocomplete
														className={classes.inputText}
														onChange={(event, value) => (value ? handleSelect(event, value, 'rol') : null)}
														value={userRol}
														getOptionLabel={(option: any) => (option.name ? option.name : '')}
														isOptionEqualToValue={(option, value) => option.id === value.id}
														options={listRoles}
														renderInput={(params: any) => (
															<TextField {...params} name='rol' label='Selecciona un Cargo' variant='outlined' />
														)}
													/>
													<Autocomplete
														className={classes.inputText}
														onChange={(event, value) => (value ? handleSelect(event, value, 'status') : null)}
														value={userStatus}
														getOptionLabel={(option: any) => (option.name ? option.name : '')}
														isOptionEqualToValue={(option, value) => option.id === value.id}
														options={listStatus}
														renderInput={(params: any) => (
															<TextField
																{...params}
																name='Estatus'
																label='Seleccione el estatus'
																variant='outlined'
															/>
														)}
													/>
												</>
											</div>
											{/* <div>
												<div className={classes.cardTitles}>Permisos</div>
											</div> */}
										</div>
										<div className=''></div>
										<Button /*sx={sxStyled.buttonSaveData}*/ variant='contained' onClick={handleSaveData}>
											Guardar
										</Button>
									</div>
								</form>
							</div>
						</Paper>
					) : createUser ? (
						<Paper variant='outlined'>
							<div className={classes.card}>
								<Button sx={sxStyled.closeBtn} onClick={closeCreateUser}>
									<CloseIcon />
								</Button>
								<form className={classes.form}>
									<div className={classes.gridNewUser}>
										<div>
											<div className={classes.textFields}>
												<TextField
													key={1}
													id='name'
													name='name'
													label='Nombre Completo'
													variant='outlined'
													type='text'
													value={newName}
													onChange={(e) => {
														setnewName(e.target.value);
													}}
													error={newName === ''}
												/>
												<TextField
													key={1}
													id='login'
													name='login'
													label='Usuario'
													variant='outlined'
													type='text'
													value={newLogin}
													onChange={(e) => {
														setnewLogin(e.target.value);
													}}
													error={newLogin === ''}
												/>
												<div>
													{/* <FormControl> */}
													<Select
														style={{ width: '25%', marginRight: '5%' }}
														label='Tipo'
														variant='outlined'
														name='id_ident_type'
														value={newTypeDoc}
														onChange={(e: any) => {
															setnewTypeDoc(e.target.value as any);
														}}
														// error={fm.errorClient}
													>
														{listIdentType.map((item: any) => {
															if (item.name === 'J') return null;
															return (
																<MenuItem key={item.name} value={item.name}>
																	{item.name}
																</MenuItem>
															);
														})}
													</Select>
													{/* </FormControl> */}
													<TextField
														style={{ width: '70%' }}
														key={2}
														id='name'
														name='name'
														label='Nro. Documento'
														variant='outlined'
														type='number'
														value={newNroDocument}
														onChange={(e: any) => {
															setnewNroDocument(e.target.value as string);
														}}
														error={newNroDocument === null || newNroDocument === ''}
													/>
												</div>
												<TextField
													key={3}
													id='email'
													name='email'
													label='Correo'
													variant='outlined'
													type='email'
													value={newEmail}
													onChange={(e: any) => {
														setnewEmail(e.target.value as any);
													}}
													error={validEmail(newEmail)}
												/>
												{/* <TextField
													key={4}
													id='name'
													name='name'
													label='Contraseña'
													variant='outlined'
													type='password'
													value={newPassword}
												/> */}
												<Autocomplete
													className={classes.inputText}
													onChange={(event, value) => (value ? handleNewSelect(event, value, 'department') : null)}
													value={newUserDep}
													getOptionLabel={(option: any) => (option.name ? option.name : '')}
													isOptionEqualToValue={(option: any) => option.id === newUserDep.id}
													options={listDepartment}
													renderInput={(params: any) => (
														<TextField
															{...params}
															name='department'
															label='Seleciona un Departmento'
															variant='outlined'
														/>
													)}
												/>
												<Autocomplete
													className={classes.inputText}
													onChange={(event, value) => (value ? handleNewSelect(event, value, 'rol') : null)}
													value={newUserRol}
													getOptionLabel={(option: any) => (option.name ? option.name : '')}
													isOptionEqualToValue={(option, value) => option.id === value.id}
													options={listRoles}
													renderInput={(params: any) => (
														<TextField {...params} name='rol' label='Selecciona un Cargo' variant='outlined' />
													)}
												/>
											</div>
										</div>
										<Button
											className={classes.saveButton}
											variant='contained'
											color='success'
											onClick={handleSaveCreatedUser}>
											Guardar Nuevo Usuario
										</Button>
									</div>
								</form>
							</div>
						</Paper>
					) : openUserView ? (
						<div style={{ position: 'relative', height: '100%' }}>
							<LoaderLine component />
						</div>
					) : null}
				</Grid>
			</Grid>
		</>
	);
};

export default GestionUsuarios;
