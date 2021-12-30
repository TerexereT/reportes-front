import { makeStyles, Theme } from '@material-ui/core';
import { FC, Fragment } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
	base: {
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '2rem',
	},
}));

const CancelarCuotas: FC = () => {
	const classes = useStyles();
	return (
		<Fragment>
			<div className='ed-container'>
				<div className={classes.base}>Esto es Cancelar Cuotas</div>
			</div>
		</Fragment>
	);
};

export default CancelarCuotas;
