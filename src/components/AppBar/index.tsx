/* eslint-disable @typescript-eslint/no-unused-vars */
import AccountCircle from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BuildIcon from '@mui/icons-material/Build';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HandshakeIcon from '@mui/icons-material/Handshake';
import HardwareIcon from '@mui/icons-material/Hardware';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import MenuIcon from '@mui/icons-material/Menu';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Theme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TranredLogo from '../../images/tranred-logo.png';
import {
	baseUrl,
	cancelarCuotas,
	cuotas,
	cuotasR,
	librePago,
	loadExcel,
	// login,
	mantenimientos,
	movimientos,
	pagoCuota,
	reportexaci,
	transaccional,
} from '../../router/url';
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: 'auto',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	hide: {
		display: 'none',
	},
	img: {
		'& img': {
			maxWidth: 176,
		},
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.secondary.contrastText,
	},
	icon: {
		minWidth: 40,
	},
}));

const links = [
	{
		name: 'Movimientos',
		link: movimientos,
		icon: <ImportExportIcon />,
	},
	{
		name: 'Cuotas',
		link: cuotas,
		icon: <AttachMoneyIcon />,
	},
	{
		name: 'Cuotas Resumidas',
		link: cuotasR,
		icon: <AttachMoneyIcon />,
	},
	{
		name: 'Mantenimiento',
		link: mantenimientos,
		icon: <BuildIcon />,
	},
	{
		name: 'Mantenimiento por ACI',
		link: reportexaci,
		icon: <HardwareIcon />,
	},
	{
		name: 'Libre Pago',
		link: librePago,
		icon: <ReceiptIcon />,
	},
	{
		name: 'Pago Cuota',
		link: pagoCuota,
		icon: <ReceiptLongIcon />,
	},
	{
		name: 'Transaccional',
		link: transaccional,
		icon: <HandshakeIcon />,
	},
	{
		name: 'Cargar Neto',
		link: loadExcel,
		icon: <CloudUploadIcon />,
	},
	// {
	// 	name: 'Iniciar Sesion',
	// 	link: login,
	// 	icon: <CloudUploadIcon />,
	// },
];
const MainMenu = () => {
	const classes = useStyles();
	const [auth, setAuth] = useState(false);
	const [open, setOpen] = useState(false);
	const [section, setSection] = useState('Inicio');
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openM = Boolean(anchorEl);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleTitleSection = (seccion: string) => {
		switch (seccion) {
			case cuotas:
				return 'Cuotas Vencidas';
			case movimientos:
				return 'Movimientos';
			case mantenimientos:
				return 'Mantenimiento';
			case cuotasR:
				return 'Cuotas Resumidas';
			case cancelarCuotas:
				return 'Cancelar Cuotas';
			case reportexaci:
				return 'Mantenimiento por ACI';
			case librePago:
				return 'Libre Pago';
			case pagoCuota:
				return 'Pago Cuota';
			case transaccional:
				return 'Transaccional';
			default:
				return 'Inicio';
		}
	};

	let path = window.location.pathname;

	useEffect(() => {
		const seccion = window.location.pathname;
		setSection(handleTitleSection(seccion));
	}, [path]);

	return (
		<>
			<div className={classes.root}>
				<AppBar
					position='static'
					className={classNames(classes.appBar, {
						[classes.appBarShift]: open,
					})}>
					<Toolbar>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							className={classNames(classes.menuButton, {
								[classes.hide]: open,
							})}
							size='large'>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' className={classes.title}>
							Reportes Dinámicos: {section}
						</Typography>
						{auth ? (
							<div>
								<IconButton
									aria-label='account of current user'
									aria-controls='menu-appbar'
									aria-haspopup='true'
									onClick={handleMenu}
									color='inherit'
									size='large'>
									<AccountCircle />
								</IconButton>
								<Menu
									id='menu-appbar'
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={openM}
									onClose={handleClose}>
									<MenuItem onClick={handleClose}>Perfil</MenuItem>
									<MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
								</Menu>
							</div>
						) : (
							// <>Iniciar Sesión</>
							<></>
						)}
					</Toolbar>
				</AppBar>
				<Drawer
					anchor='left'
					variant='permanent'
					onClose={handleDrawerClose}
					ModalProps={{
						keepMounted: true,
					}}
					classes={{
						paper: classNames({
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						}),
					}}
					sx={{
						flexShrink: 0,
						[`& .MuiDrawer-paper`]: {
							width: open ? drawerWidth : 0,
							boxSizing: 'content-box',
						},
					}}>
					<div className={classes.toolbar}>
						<div className={classes.img}>
							<Link to={baseUrl} onClick={handleDrawerClose}>
								<img src={TranredLogo} alt='logo tranred' />
							</Link>
						</div>
						<IconButton onClick={handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>
						{links.map(({ name, icon, link }, i) => (
							<Link to={link} key={i} onClick={handleDrawerClose} className={classes.link}>
								<ListItem button>
									<ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
									<ListItemText primary={name} />
								</ListItem>
							</Link>
						))}
					</List>
					<Divider />
				</Drawer>
				{/*
                
				<SwipeableDrawer
					anchor='left'
					open={open}
					onOpen={() => {
						setOpen(true);
						return {};
					}}
					onClose={handleDrawerClose}
					className={classNames(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					})}
					classes={{
						paper: classNames({
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						}),
					}}>
				</SwipeableDrawer>
                
                */}
			</div>
		</>
	);
};

export default MainMenu;
