import * as React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import AppBar from '../components/AppBar';
import AuthContext from '../context/auth/AuthContext';
import { Lock, PrivGuard } from './guards';
import PublicNav from './routes/PublicRutas';
import RutasNav from './routes/Rutas';
import { existRoutePublic, isPrivate } from './utilis/Functions';

export const Routes: React.FC = () => {
	const { user } = React.useContext(AuthContext);

	React.useEffect(() => {
		console.log('redirect login');
		if (!localStorage.getItem('token') && (isPrivate() || !existRoutePublic())) {
			//console.log('redirect login');
			//window.location.replace(login);
		}
	}, []);

	return (
		<Router>
			<GuardProvider guards={[Lock]}>
				<Switch>
					{!user ? (
						<>
							{PublicNav.map(({ path, component, meta }, i) => {
								return <GuardedRoute key={i} exact path={path} component={component} meta={meta} />;
							})}
						</>
					) : (
						<>
							<AppBar />
							<GuardProvider guards={[(to, from, next): void => PrivGuard(to, from, next, user)]}>
								{RutasNav.map(({ path, component, meta }, i) => {
									console.log(path, 'dd');
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
