/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent } from '@mui/material';
import React, { useLayoutEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../../images/tranred-logo.png';
//import { urlNewPassword, urlRestorePassword } from 'routers/url';
import { useStylesModalUser } from './styles';

const sxStyles = {
	// minWidth: '100%',
	// maxWidth: '40rem',
	// marginTop: '2rem',
	borderRadius: '2rem',
	boxShadow: '10px 10px 15px 0px rgba(0,0,0,0.4)',
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	alignItems: 'center',
	justifyItems: 'center',
	padding: 0,
	position: 'absolute',
	top: '25vh',
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
		<div className={classes.loginPage}>
			<Card sx={sxStyles}>
				<img
					src={Logo}
					alt='Logo'
					style={{
						width: '400px',
						height: '100x',
						objectFit: 'cover',
					}}
				/>

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
