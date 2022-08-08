/* eslint-disable @typescript-eslint/no-unused-vars */
import useAxios from '../../config';
//
import { createContext, ReactChild, useEffect, useState } from 'react';
//
import { existRoutePublic, isPrivate } from '../../router/utilis/Functions';
import { ContextAuth } from './interface';
import { InterfaceObject, UserInterface } from '../../interfaces/auth';
import { baseUrl, login } from '../../router/url';
import Swal from 'sweetalert2';
import { swalLoading } from '../../components/swal/alerts';

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
	const [views, setViews] = useState<String[] | []>([]);
	const [permiss, setPermiss] = useState<InterfaceObject | {}>({});

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
			console.log('reset', res);
		} catch (error: any) {
			console.log(error);
			Swal.fire({
				title: error.response.data.code === 401 ? `Tu sesión expiró.` : `Vuelva a Iniciar Session`,
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
			console.log('yaa tengo token');
			if (!user) {
				console.log('get user');
				getUser();
			}
		} else {
			if (isPrivate() || !existRoutePublic()) {
				console.log('redirect login 3 ', isPrivate(), !existRoutePublic());
				window.location.replace(login);
			}
			console.log('no tengo token');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleLogin = async (user: String, password: String, historyA?: any) => {
		swalLoading();
		try {
			console.log('entrer');
			const res = await useAxios.post('/auth/login', { user, password });
			console.log('ress', res.data);
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
