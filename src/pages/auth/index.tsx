import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//Material
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxios from '../../config';
//import { startLogin } from 'store/actions/auth/auth';
import AuthModal from './components/AuthModal';
import { styledMui, useStylesModalUser } from './components/styles';

const Login: React.FC = () => {
	const classes = useStylesModalUser();
	const history = useHistory();

	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const [password, setPass] = useState<string>('');
	const [user, setUser] = useState<string>('');

	// const { user , password }: any = formValues;

	const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		setUser(e.target.value);
	};

	const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		setPass(e.target.value);
		//console.log(e.target.value);
	};

	const handleLogin = async (e: any) => {
		e.preventDefault();
		// history.push(baseUrl);
		if (user && password) {
			try {
				const resp = await useAxios.post('/auth/login', { user, password });
				localStorage.setItem('token', resp.data.access_token);
				console.log(resp);
			} catch (error: any) {
				console.log('err', error);
				Swal.fire('Error', error?.response?.data?.message || 'error', 'error');
			}
		}
	};

	return (
		<>
			<AuthModal>
				<form onSubmit={handleLogin} autoComplete='off'>
					<div className={classes.containerLogin}>
						<TextField
							sx={styledMui.inputStyle}
							className={classes.input}
							id='user '
							name='user '
							label='Usuario'
							variant='outlined'
							type='user '
							onChange={handleUsernameChange}
						/>
						<TextField
							sx={styledMui.inputStyle}
							id='password'
							className={classes.input}
							name='password'
							onChange={handlePasswordChange}
							label='Contraseña'
							type={showPassword ? 'text' : 'password'}
							autoComplete='current-password'
							variant='outlined'
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onMouseDown={() => setShowPassword(!showPassword)}
											onMouseUp={() => setShowPassword(!showPassword)}
											edge='end'>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<div className={classes.inputButton}>
							<Button className={classes.buttonLogin} type='submit' variant='contained'>
								Ingresar
							</Button>
						</div>
					</div>
				</form>
			</AuthModal>
		</>
	);
};

export default Login;
