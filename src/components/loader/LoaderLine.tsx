/* eslint-disable @typescript-eslint/no-unused-vars */
import { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';

interface ILoader {
	component?: boolean;
}

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

const LoaderLine: FC<ILoader> = ({ component = false }) => {
	const classes = useStyles();
	return component ? (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				width: '100%',
			}}>
			<Box sx={{ width: '100%' }}>
				<LinearProgress className={classes.loader} />
			</Box>
		</div>
	) : (
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
