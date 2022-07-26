import { Meta } from 'react-router-guards/dist/types';
import Private from './Private';
import Public from './Public';

export interface meta extends Meta {
	auth: boolean;
}
export interface Route {
	path: string;
	component: any;
	meta: meta;
}

const Routes: Route[] = [...Private, ...Public];

export default Routes;
