import { makeStyles } from '@material-ui/styles';
import React, { Fragment } from 'react';
import TranredLogo from '../images/tranred-logo.png';

interface HomeInt {}

const useStyles = makeStyles((styles) => ({
	base: {
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));
const Home: React.FC<HomeInt> = () => {
	const classes = useStyles();
	return (
		<Fragment>
			<div className='ed-container'>
				<div className={classes.base}>
					<img src={TranredLogo} style={{ width: '50%' }} alt='logo tranred' />
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
