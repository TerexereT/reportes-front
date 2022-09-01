import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
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
								<div className={classes.background} />
								{Public.map(({ path, component, meta }, i) => {
									return <GuardedRoute key={i} exact path={path} component={component} meta={meta} />;
								})}
							</div>
						</>
					) : (
						<>
							<div className={classes.app}>
								<div className={classes.background} />
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
