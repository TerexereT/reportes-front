import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Fragment } from 'react';
import TranredLogo from '../images/tranred-logo.png';

interface HomeInt {}

const useStyles = makeStyles((theme: Theme) => ({
	base: {
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '2rem',
	},
	title: {
		fontSize: 40,
		padding: '1rem 0',
	},
	subtitle: {
		fontSize: 24,
		padding: '1rem',
	},
}));
const Home: React.FC<HomeInt> = () => {
	const classes = useStyles();
	return (
		<Fragment>
			<div className='ed-container'>
				<div className={classes.base}>
					<img src={TranredLogo} style={{ width: '50%' }} alt='logo tranred' />
					<div className={classes.title}>Bienvenido al sistema de Reportes Dinámicos</div>
					<div className={classes.subtitle}>
						Haga click en el menu superior izquierdo para navegar entre sistema de reportes
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
