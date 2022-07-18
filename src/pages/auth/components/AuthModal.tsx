/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent } from '@mui/material';
import React, { useLayoutEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../../images/tranred-logo.png';
//import { urlNewPassword, urlRestorePassword } from 'routers/url';
import { useStylesModalUser } from './styles';

const sxStyles = {
	borderRadius: '2rem',
	maxWidth: '80rem',
	marginTop: '2rem',
} as const;

const AuthModal: React.FC<any> = ({ children }) => {
	const classes = useStylesModalUser();

	const history = useHistory();

	const [newpass, setNewPass] = useState<boolean>(false);
	const [url, setUrl] = useState('');

	useLayoutEffect(() => {
		const urlUser = history.location.pathname;
		/*
		urlUser === urlNewPassword
			? setNewPass(true)
			: urlUser === urlRestorePassword
			? setNewPass(true)
			: setNewPass(false);
		setUrl(history.location.pathname);
		*/

		// setUrl(history);
	}, [history.location.pathname, url]);

	return (
		<div className='ed-container'>
			<img
				src={Logo}
				alt='Logo'
				style={{
					position: 'absolute',
					top: '10rem',
					padding: 0,
					margin: 0,
					width: '400px',
					height: '100x',
					objectFit: 'cover',
				}}
			/>
			<Card sx={sxStyles}>
				<CardContent>
					<div className={classes.containerAuthModal}>
						<div>{children}</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default AuthModal;
