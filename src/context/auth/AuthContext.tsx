/* eslint-disable @typescript-eslint/no-unused-vars */
import useAxios from '../../config';
//
import { createContext, ReactChild, useEffect, useState } from 'react';
//
import { existRoutePublic, isPrivate } from '../../router/utilis/Functions';
import { ContextAuth, User } from './interface';
import { Permissions, UserInterface, Views } from '../../interfaces/auth';

interface Props {
	children: ReactChild;
}

const AuthContext = createContext<ContextAuth>({
	user: null,
	views: {},
	permiss: [],
});

export const AuthContextProvider = ({ children }: Props) => {
	const [user, setUser] = useState<UserInterface | null>(null);
	const [views, setViews] = useState<Views | {}>({});
	const [permiss, setPermiss] = useState<Permissions[] | []>([]);

	const resetUser = (): void => {
		setUser(null);
	};

	const getUser = async () => {
		try {
			const res = await useAxios.get('/auth/user');
			setUser(res.data.user);
			setUser(res.data.views);
			setUser(res.data.permiss);
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
				console.log('redirect login 3 ', isPrivate(), !existRoutePublic());
				//window.location.replace(login);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<AuthContext.Provider
			value={{
				user,
				views,
				permiss,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
