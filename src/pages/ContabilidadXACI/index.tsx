/* eslint-disable @typescript-eslint/no-unused-vars */
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import { FC, useContext, useLayoutEffect, useState } from 'react';
import { sxStyled, useStyles } from './styles';

//redux
import AuthContext from '../../context/auth/AuthContext';
import EditarDepartments from './components/editarDepartments';
import GestionUsuarios from './components/editarUsuarios';
import EditarViews from './components/editarViews';
import { Department, Roles } from './interfaces';
import { seguridad } from './services/seguridad';

const ContabilidadXACI: FC = () => {
	const { permiss } = useContext(AuthContext);
	const classes = useStyles();
	const [tab, setTab] = useState('gestionUsuarios');
	const [listDepartment, setListDepartment] = useState<Department[] | []>([]);
	const [listRoles, setListRoles] = useState<Roles[] | []>([]);
	const [allUser, setUsers] = useState<any[]>([]);

	const getData = async () => {
		const res: any = await seguridad.getAllUser();
		if (res.ok) {
			setUsers(res.users);
		}
	};

	const getList = async () => {
		const res: any = await seguridad.getAllListSeguridad();
		//console.log(res);
		if (res.departments.length) {
			setListDepartment(res.departments);
		}
		if (res.roles.length) {
			setListRoles(res.roles);
		}
	};

	useLayoutEffect(() => {
		const init = async () => {
			await getList();
			await getData();
		};
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (event: any, newValue: any) => {
		setTab(newValue);
	};

	return (
		<div className={classes.wrapper}>
			{
				<TabContext value={tab}>
					<TabList
						onChange={handleChange}
						aria-label='lab API tabs example'
						indicatorColor='primary'
						textColor='primary'>
						<Tab
							sx={sxStyled.tabName}
							label='Detalle por ACI'
							value={'gestionUsuarios'}
							wrapped
							classes={{ root: classes.tabLabel }}
						/>
						<Tab
							sx={sxStyled.tabName}
							label='Modulos'
							value={'gestionViews'}
							wrapped
							classes={{ root: classes.tabLabel }}
						/>
					</TabList>
					<TabPanel value={'gestionUsuarios'} classes={{ root: classes.tabPanel }}>
						<GestionUsuarios listDepartment={listDepartment} listRoles={listRoles} allUser={allUser} />
					</TabPanel>
					{/* 
					<TabPanel value={'gestionPermisos'} classes={{ root: classes.tabPanel }}>
						<EditarPermisos listDepartment={listDepartment} listRoles={listRoles} />
					</TabPanel>
					*/}
					<TabPanel value={'gestionViews'} classes={{ root: classes.tabPanel }}>
						<EditarViews listDepartment={listDepartment} />
					</TabPanel>
					<TabPanel value={'gestionDepartments'} classes={{ root: classes.tabPanel }}>
						<EditarDepartments listDepartment={listDepartment} setListDepartment={setListDepartment} />
					</TabPanel>
				</TabContext>
			}
		</div>
	);
};

export default ContabilidadXACI;
