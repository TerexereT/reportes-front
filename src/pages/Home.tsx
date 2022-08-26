import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import TranredLogo from '../images/tranred-logo.png';

interface HomeInt {}

const useStyles = makeStyles((theme: Theme) => ({
	base: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '2rem',
	},
	title: {
		fontSize: 40,
		padding: '1rem 0',
		color: theme.palette.text.primary,
	},
	subtitle: {
		fontSize: 24,
		padding: '1rem',
		color: theme.palette.text.secondary,
	},
}));
const Home: React.FC<HomeInt> = () => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.base}>
				<img src={TranredLogo} style={{ width: '30%' }} alt='logo tranred' />
				<div className={classes.title}>Bienvenido al sistema de Reportes Dinámicos</div>
				<div className={classes.subtitle}>
					Haga click en el menu superior izquierdo para navegar entre sistema de reportes
				</div>
			</div>
		</>
	);
};

export default Home;
