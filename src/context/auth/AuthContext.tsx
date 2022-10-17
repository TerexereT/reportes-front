/* eslint-disable react-hooks/exhaustive-deps */
import AgregadorContext from 'context/AgregadorContext';
import { createContext, ReactChild, useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { swalLoading } from '../../components/swal/alerts';
import useAxios from '../../config';
import { InterfaceObject, UserInterface } from '../../interfaces/auth';
import { baseUrl, login } from '../../router/url';
import { existRoutePublic, isPrivate } from '../../router/utilis/Functions';
import { ContextAuth, Views } from './interface';

interface Props {
	children: ReactChild;
}

const AuthContext = createContext<ContextAuth>({
	user: null,
	views: [],
	permiss: {},
	handleLogin: () => {},
	handleLogout: () => {},
});

export const AuthContextProvider = ({ children }: Props) => {
	const [user, setUser] = useState<UserInterface | null>(null);
	const [views, setViews] = useState<Views[] | []>([]);
	const [permiss, setPermiss] = useState<InterfaceObject | {}>({});

	const { Agregador } = useContext(AgregadorContext);

	const resetUser = (): void => {
		setUser(null);
		setViews([]);
		setPermiss([]);
		localStorage.removeItem('token');
	};

	const getUser = async () => {
		try {
			const res = await useAxios.get('/auth/user');
			setUser(res.data.user);
			setViews(res.data.views);
			setPermiss(res.data.permiss);
			// console.log('reset', res);
		} catch (error: any) {
			console.log('expired token', error);
			Swal.fire({
				title: `Tu sesión expiró. Vuelva a iniciar sesión`,
				icon: 'info',
				showConfirmButton: false,
				timer: 1500,
			});
			resetUser();
			setTimeout(() => {
				window.location.replace(login);
			}, 1500);
		}
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			// if (!user) {
			getUser();
			// }
		} else {
			if (isPrivate() || !existRoutePublic()) {
				// console.log('redirect login 3 ', isPrivate(), !existRoutePublic());
				window.location.replace(login);
			}
			// console.log('no tengo token');
		}
	}, [Agregador]);

	const handleLogin = async (user: String, password: String, historyA?: any) => {
		swalLoading();
		try {
			// console.log('entrer');
			const res = await useAxios.post('/auth/login', { user, password });
			// console.log('ress', res.data);
			setUser(res.data.user);
			setViews(res.data.views);
			setPermiss(res.data.permiss);
			Swal.close();
			Swal.fire({
				title: 'Bienvenido',
				text: res.data.user.name,
				showConfirmButton: false,
				timer: 1500,
			});
			//window.location.replace(baseUrl);
			historyA.push(baseUrl);
			//return true;
		} catch (error: any) {
			console.log('err', error);
			Swal.close();
			Swal.fire('Error', error?.response?.data?.message || 'Error intentado ingresar', 'error');
			return false;
		}
	};
	const handleLogout = async () => {
		if (user) {
			Swal.fire({
				title: 'Hasta luego',
				text: user.name,
				showConfirmButton: false,
				timer: 1500,
			});
			resetUser();
			window.location.replace(login);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				views,
				permiss,
				handleLogin,
				handleLogout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
