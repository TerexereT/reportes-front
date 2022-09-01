/* eslint-disable @typescript-eslint/no-unused-vars */
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const useStyles = makeStyles((styles: Theme) => ({
	loader: {
		color: styles.palette.primary.light,
	},
}));

const LoaderLine: React.FC = () => {
	const classes = useStyles();
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				position: 'relative',
				padding: 0,
				margin: 0,
			}}>
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
