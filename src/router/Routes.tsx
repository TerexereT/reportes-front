import * as React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import AppBar from '../components/AppBar';
import LoaderLine from '../components/loader/LoaderLine';
import AuthContext from '../context/auth/AuthContext';
import { Lock, PrivGuard } from './guards';
import Public from './routes/Public';
import Private from './routes/Private';
import { login } from './url';
import { existRoutePublic, isPrivate } from './utilis/Functions';

export const Routes: React.FC = () => {
	const { user, views } = React.useContext(AuthContext);

	const [checking, setChecking] = React.useState<boolean>(true);
	//const [menu, setMenu] = React.useState<Views>({});

	React.useLayoutEffect(() => {
		//dispatch(FinishLoading());
		let token = localStorage.getItem('token');
		if (token !== null) {
			console.log('refrest login');
		}
		setChecking(false);
	}, []);

	React.useEffect(() => {
		if (localStorage.getItem('token') === null && isPrivate()) {
			window.location.replace(login);
		}
		if (localStorage.getItem('token') === null && !existRoutePublic()) {
			window.location.replace(login);
		}
	}, []);

	if (checking) {
		return <LoaderLine />;
	}

	return (
		<Router>
			<GuardProvider guards={[Lock]}>
				<Switch>
					{!user ? (
						<>
							{Public.map(({ path, component, meta }, i) => {
								return <GuardedRoute key={i} exact path={path} component={component} meta={meta} />;
							})}
						</>
					) : (
						<>
							<AppBar />
							<GuardProvider guards={[(to, from, next): void => PrivGuard(to, from, next, views)]}>
								{console.log(window.location.pathname)}
								{Private.map(({ path, component, meta }, i) => {
									return <GuardedRoute key={i} exact path={path} component={component} meta={meta} />;
								})}
							</GuardProvider>
						</>
					)}
				</Switch>
				{/* <Redirect to={login} /> */}
			</GuardProvider>
		</Router>
	);
};

export default Routes;
