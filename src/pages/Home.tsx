import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface HomeInt {}

const useStyles = makeStyles((styles) => ({
	base: {
		display: 'flex',
		width: '100%',
	},
}));
const Home: React.FC<HomeInt> = () => {
	const classes = useStyles();
	return <div className={classes.base}>Estoy en home</div>;
};

export default Home;
