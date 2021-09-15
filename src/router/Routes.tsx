import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
			{/* <Switch> */}
			<Route path={cuotas} exact={true} component={Cuotas} />
			<Route path={mantenimientos} exact={true} component={RepDinamicos} />
			<Route path={movimientos} exact={true} component={Mantenimiento} />
			<Route path={baseUrl} exact={true} component={Home} />
			{/* </Switch> */}
		</Router>
	);
};

export default Routes;
