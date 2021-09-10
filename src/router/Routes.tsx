import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppBar from '../components/AppBar';
// templates
import Home from '../pages/Home';
import RepDinamicos from '../pages/RepDinamicos';
import { baseUrl, repDin } from './url';

export const Routes: React.FC = () => {
	return (
		<Router>
			<AppBar />
			<Switch>
				<Route path={repDin} exact component={RepDinamicos} />
				<Route path={baseUrl} component={Home} />
			</Switch>
		</Router>
	);
};

export default Routes;
