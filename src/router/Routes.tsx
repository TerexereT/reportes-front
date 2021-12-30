import * as React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import AppBar from '../components/AppBar';
import { Lock } from './guards';
import RutasNav from './routes/Rutas';

export const Routes: React.FC = () => {
	return (
		<Router>
			<GuardProvider guards={[Lock]}>
				<AppBar />
				<Switch>
					{RutasNav.map(({ path, component, meta }, i) => {
						return <GuardedRoute key={i} exact path={path} component={component} meta={meta} />;
					})}
				</Switch>
			</GuardProvider>
		</Router>
	);
};

export default Routes;
