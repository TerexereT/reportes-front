import CardSlider from 'components/CardSlider';
import TranredLogo from 'images/tranred-logo.png';
import { FC } from 'react';
import { useStyles } from './styles';

interface HomeInt {}

const Home: FC<HomeInt> = () => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.base}>
				<img src={TranredLogo} style={{ width: '25%', marginBottom: '1rem' }} alt='logo tranred' />
				<CardSlider />
				<div className={classes.title}>Bienvenido al Sistema Interno de Tranred</div>
				<div className={classes.subtitle}>Haga click en el agregador que desea consultar sus reportes</div>
			</div>
		</>
	);
};

export default Home;
