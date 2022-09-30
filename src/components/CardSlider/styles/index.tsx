import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
	slides: {
		display: 'grid',
		position: 'relative',
		padding: '24px 0',
		'& > .slide': {
			gridArea: '1 / -1',
		},
		'& > button': {
			appearance: 'none',
			background: 'transparent',
			border: 'none',
			color: theme.palette.text.primary,
			position: 'absolute',
			fontSize: '5rem',
			width: '5rem',
			height: '5rem',
			top: '30%',
			transition: 'opacity 0.3s',
			opacity: 1,
			zIndex: 5,

			'&:hover': {
				opacity: 0.7,
			},

			'&:focus': {
				outline: 'none',
			},

			'&:first-child': {
				left: '-50%',
			},
			'&:last-child': {
				right: '-50%',
			},
		},
	},
	slideCardBackground: {
		width: '20vw',
		height: '20vw',
		position: 'absolute',
		backgroundSize: 'cover',
		// backgroundImage: `url('${slide.image}')`,
		filter: 'blur(4px)',
	},
	cardTitle: {
		color: theme.palette.text.primary,
		fontSize: '2rem',
		fontWeight: 'normal',
		letterSpacing: '0.2ch',
		textTransform: 'uppercase',
		margin: 0,
	},
}));
