/* eslint-disable @typescript-eslint/no-unused-vars */
import { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((styles: Theme) => ({
	loader: {
		color: styles.palette.primary.light,
	},
	background: {
		position: 'fixed',
		top: 0,
		background: styles.palette.background.paper,
		width: '100vw',
		height: '100vh',
		zIndex: -2,
	},
}));

const LoaderLine: React.FC = () => {
	const classes = useStyles();
	return (
		<div className={classes.background}>
			<div
				style={{
					position: 'absolute',
					top: '45%',
					left: '30%',
					right: '30%',
				}}>
				<Box sx={{ width: '100%' }}>
					<LinearProgress className={classes.loader} />
				</Box>
			</div>
		</div>
	);
};

export default LoaderLine;
