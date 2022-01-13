/* eslint-disable @typescript-eslint/no-unused-vars */
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BuildIcon from '@material-ui/icons/Build';
import CreditCard from '@material-ui/icons/CreditCard';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import TranredLogo from '../../images/tranred-logo.png';
import { baseUrl, cancelarCuotas, cuotas, cuotasR, mantenimientos, movimientos } from '../../router/url';
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
}));
const MainMenu: React.FC = () => {
	const classes = useStyles();
	const [auth, setAuth] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [section, setSection] = React.useState('Inicio');
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
			default:
				return 'Inicio';
		}
	};

	let path = window.location.pathname;

	React.useEffect(() => {
		const seccion = window.location.pathname;
		setSection(handleTitleSection(seccion));
	}, [path]);

	return (
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
						})}>
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
								color='inherit'>
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
			<SwipeableDrawer
				anchor='left'
				open={open}
				onOpen={() => setOpen(true)}
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
				<div className={classes.toolbar}>
					<div className={classes.img}>
						<Link to={baseUrl} onClick={handleDrawerClose}>
							<img src={TranredLogo} alt='logo tranred' />
						</Link>
					</div>
					{/* <IconButton onClick={handleDrawerClose} style={{ padding: 8 }}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton> */}
				</div>
				<Divider />
				<List>
					<Link to={movimientos} onClick={handleDrawerClose} className={classes.link}>
						<ListItem button key={'Movimientos'}>
							<ListItemIcon>
								<ImportExportIcon />
							</ListItemIcon>
							<ListItemText primary={'Movimientos'} />
						</ListItem>
					</Link>
					<Link to={cuotas} onClick={handleDrawerClose} className={classes.link}>
						<ListItem button key={'Cuotas'}>
							<ListItemIcon>
								<AttachMoneyIcon />
							</ListItemIcon>
							<ListItemText primary={'Cuotas'} />
						</ListItem>
					</Link>
					<Link to={cuotasR} onClick={handleDrawerClose} className={classes.link}>
						<ListItem button key={'CuotasRes'}>
							<ListItemIcon>
								<AttachMoneyIcon />
							</ListItemIcon>
							<ListItemText primary={'Cuotas Resumidas'} />
						</ListItem>
					</Link>
					<Link to={mantenimientos} onClick={handleDrawerClose} className={classes.link}>
						<ListItem button key={'Mantenimiento'}>
							<ListItemIcon>
								<BuildIcon />
							</ListItemIcon>
							<ListItemText primary={'Mantenimiento'} />
						</ListItem>
					</Link>
					/* <Link to={cancelarCuotas} onClick={handleDrawerClose} className={classes.link}>
						<ListItem button key={'CancelarCuotas'}>
							<ListItemIcon>
								<CreditCard />
							</ListItemIcon>
							<ListItemText primary={'Cancelar Cuotas'} />
						</ListItem>
					</Link> */
				</List>
				<Divider />
			</SwipeableDrawer>
		</div>
	);
};

export default MainMenu;
