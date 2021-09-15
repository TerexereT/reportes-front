import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppBar from '../components/AppBar';
import Cuotas from '../pages/Cuotas';
// templates
import Home from '../pages/Home';
import Mantenimiento from '../pages/Mantenimiento';
import RepDinamicos from '../pages/RepDinamicos';
import { baseUrl, cuotas, mantenimientos, movimientos } from './url';

export const Routes: React.FC = () => {
	return (
		<Router>
			<AppBar />
			<Switch>
				<Route path={cuotas} component={Cuotas} />
				<Route path={mantenimientos} component={Mantenimiento} />
				<Route path={movimientos} component={RepDinamicos} />
				<Route path={baseUrl} component={Home} />
			</Switch>
		</Router>
	);
};

export default Routes;
