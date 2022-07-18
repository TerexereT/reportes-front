/* eslint-disable @typescript-eslint/no-unused-vars */
import useAxios from '../../config';
//
import { createContext, ReactChild, useEffect, useState } from 'react';
//
import { existRoutePublic, isPrivate } from '../../router/utilis/Functions';
import { ContextAuth, User } from './interface';

interface Props {
	children: ReactChild;
}

const AuthContext = createContext<ContextAuth>({
	user: null,
});

export const AuthContextProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null);

	const resetUser = (): void => {
		setUser(null);
	};

	const getUser = async () => {
		try {
			const res = await useAxios.get('/auth/user');
			setUser(res.data.user);
			console.log('reset', res);
		} catch (error) {
			console.log(error);
			setUser(null);
			//localStorage.removeItem('token');
		}
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			console.log('token');
			if (!user) {
				getUser();
				console.log('get user');
			} else {
				console.log('user', user);
			}
		} else {
			if (isPrivate() || !existRoutePublic()) {
				console.log('redirect login');
				//window.location.replace(login);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<AuthContext.Provider
			value={{
				user,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
