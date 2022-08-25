/* eslint-disable @typescript-eslint/no-unused-vars */
import AccountCircle from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import TranredLogo from '../../images/tranred-logo.png';
import { baseUrl } from '../../router/url';
import { drawerWidth, useStyles } from './styles';
import { auxLink, handleTitleSection } from './tabs';

const MainMenu = () => {
	const classes = useStyles();
	const [auth, setAuth] = useState(false);
	const [open, setOpen] = useState(false);
	const [section, setSection] = useState('Inicio');
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openM = Boolean(anchorEl);

	const [links, setLink] = useState<any[]>([]);

	const { user, views, handleLogout } = useContext(AuthContext);

	useEffect(() => {
		//console.log('views', views);
		if (user && views.length) {
			const listLink = auxLink.filter((link) => views.find((view) => view === link.name));
			console.log('listx', listLink);
			console.log('listd', auxLink);
			setLink(listLink);
		}
	}, [user, views]);

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
						{user ? (
							<div>
								<IconButton
									aria-label='account of current user'
									aria-controls='menu-appbar'
									aria-haspopup='true'
									onClick={handleMenu}
									color='inherit'
									size='large'>
									<span style={{ fontSize: '1rem' }}>{user.name}</span>
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
									{/*
									<MenuItem onClick={handleClose}>Perfil</MenuItem>
										*/}
									<MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
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
