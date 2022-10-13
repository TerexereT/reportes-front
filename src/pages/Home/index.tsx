import CardSlider from 'components/CardSlider';
// import TranredLogo from 'images/tranred-logo.png';
import { FC } from 'react';
import { useStyles } from './styles';

interface HomeInt {}

const Home: FC<HomeInt> = () => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.base}>
				<div className={classes.title}>Bienvenido al Sistema Interno de Tranred</div>
				<div className={classes.subtitle}>Haga click en el agregador que desea consultar sus reportes</div>
				<CardSlider />
			</div>
		</>
	);
};

export default Home;
