import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TranredLogo from 'images/tranred-logo.png';
import { FC, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import AppBar from '../components/AppBar';
import LoaderLine from '../components/loader/LoaderLine';
import AuthContext from '../context/auth/AuthContext';
import { Lock, PrivGuard } from './guards';
import Private from './routes/Private';
import Public from './routes/Public';

const useStyles = makeStyles((theme: Theme) => ({
	app: {},
	background: {
		position: 'fixed',
		top: 0,
		background: theme.palette.background.paper,
		width: '100vw',
		height: '100vh',
		zIndex: -2,
	},
	TranredLogo: {
		width: '25%',
		position: 'fixed',
		left: 0,
		bottom: 16,
		opacity: 0.3,
	},
}));

export const Routes: FC = () => {
	const classes = useStyles();
	const { user, views } = useContext(AuthContext);

	const [checking, setChecking] = useState<boolean>(true);

	useEffect(() => {
		if (user || localStorage.getItem('token') === null) {
			setChecking(false);
		}
	}, [user]);

	if (checking) {
		return <LoaderLine />;
	}

	return (
		<Router>
			<GuardProvider guards={[Lock]}>
				<Switch>
					{!user || !views.length ? (
						<>
							<div className={classes.app}>
								<div className={classes.background}>
									<img src={TranredLogo} className={classes.TranredLogo} alt='logo tranred' />
								</div>
								{Public.map(({ path, component, meta }, i) => {
									return <GuardedRoute key={i} exact path={path} component={component} meta={meta} />;
								})}
							</div>
						</>
					) : (
						<>
							<div className={classes.app}>
								<div className={classes.background}>
									<img src={TranredLogo} className={classes.TranredLogo} alt='logo tranred' />
								</div>
								<AppBar />
								<GuardProvider guards={[(to, from, next): void => PrivGuard(to, from, next, views)]}>
									{Private.map(({ path, component, meta }, i) => {
										return <GuardedRoute key={i} exact path={path} component={component} meta={meta} />;
									})}
								</GuardProvider>
							</div>
						</>
					)}
				</Switch>
				{/* <Redirect to={login} /> */}
			</GuardProvider>
		</Router>
	);
};

export default Routes;
