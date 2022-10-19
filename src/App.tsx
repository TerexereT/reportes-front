import { unstable_createMuiStrictModeTheme as createTheme } from '@mui/material';
import { esES as coreesES } from '@mui/material/locale';
import { StyledEngineProvider, Theme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/x-data-grid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AgregadorContext from 'context/AgregadorContext';
import { useContext, useMemo } from 'react';
import { AuthContextProvider } from './context/auth/AuthContext';
import ThemeContext from './context/ThemeContext';
import Routes from './router/Routes';
import './scss/index.scss';

declare module '@mui/styles/defaultTheme' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultTheme extends Theme {}
}

function App() {
	const { mode } = useContext(ThemeContext);
	const { Agregador } = useContext(AgregadorContext);

	const theme = useMemo(
		() =>
			createTheme(
				{
					palette: {
						mode: mode,
						primary: {
							main:
								Agregador === 'GSComputer'
									? '#244289'
									: Agregador === 'Librepago'
									? '#008aeb'
									: Agregador === 'Carropago'
									? '#ea5735'
									: '#2f3775',
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
			),
		[mode, Agregador]
	);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<AuthContextProvider>
						<Routes />
					</AuthContextProvider>
				</LocalizationProvider>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
