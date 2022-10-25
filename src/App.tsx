import { unstable_createMuiStrictModeTheme as createTheme } from '@mui/material';
import { esES as coreesES } from '@mui/material/locale';
import { StyledEngineProvider, Theme, ThemeProvider } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { esES } from '@mui/x-data-grid';
import Routes from './router/Routes';
import './scss/index.scss';

declare module '@mui/styles/defaultTheme' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultTheme extends Theme {}
}

const theme = createTheme(
	{
		palette: {
			primary: {
				main: '#2f3775',
				contrastText: '#ffffff',
			},
			secondary: {
				main: '#dff2ff',
			},
			// error: {},
			// warning: {},
			// info:{},
			// success:{},
			// text: {},
		},
	},
	esES,
	coreesES
);

const useStyles = makeStyles((styles) => ({
	app: {
		// background: styles.palette.info.light,
	},
}));

function App() {
	const classes = useStyles();
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<div className={classes.app}>
					<Routes />
				</div>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
