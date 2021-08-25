import { esES as coreesES } from '@material-ui/core/locale';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { esES } from '@material-ui/data-grid';
import React from 'react';
// ? components
import Home from './pages/Home';
import './scss/index.scss';

const theme = createTheme(
	{
		palette: {
			primary: {
				main: '#2f3775',
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

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<Home />
			</div>
		</ThemeProvider>
	);
}

export default App;
