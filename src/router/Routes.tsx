import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppBar from '../components/AppBar';
import Cuotas from '../pages/Cuotas';
import CuotasResumido from '../pages/CuotasResumido';
// templates
import Home from '../pages/Home';
import Mantenimiento from '../pages/Mantenimiento';
import RepDinamicos from '../pages/RepDinamicos';
import { baseUrl, cuotas, cuotasR, mantenimientos, movimientos } from './url';

export const Routes: React.FC = () => {
	return (
		<Router>
			<AppBar />
			<Switch>
				<Route path={cuotas} component={Cuotas} />
				<Route path={cuotasR} component={CuotasResumido} />
				<Route path={mantenimientos} component={Mantenimiento} />
				<Route path={movimientos} component={RepDinamicos} />
				<Route path={baseUrl} component={Home} />
			</Switch>
		</Router>
	);
};

export default Routes;
