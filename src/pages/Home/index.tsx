import { FC } from 'react';
import TranredLogo from '../images/tranred-logo.png';
import { useStyles } from './styles';

interface HomeInt {}

const Home: FC<HomeInt> = () => {
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
