import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
	headerTitle: {
		color: '#37256b',
		fontWeight: 600,
		fontSize: 40,
		padding: 0,
	},
	card: {
		minWidth: 275,
		boxShadow: '7px 7px 22px -4px rgba(0,0,0,0.74)',
		WebkitBoxShadow: '7px 7px 22px -4px rgba(0,0,0,0.74)',
		MozBoxShadow: '7px 7px 22px -4px rgba(0,0,0,0.74)',
	},
}));

const Cuotas: React.FC = () => {
	const classes = useStyles();
	return (
		<div className='ed-container'>
			<div className='ed-item m-cross-end m-main-justify s-py-2'>
				<div className={classes.headerTitle}>Reportes Dinámicos de Cuotas Vencidas</div>
			</div>
		</div>
	);
};

export default Cuotas;
