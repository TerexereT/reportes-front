import { PaletteMode } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createContext, ReactChild, useLayoutEffect, useState } from 'react';

interface Props {
	children: ReactChild;
}

interface IThemeContext {
	mode: PaletteMode | undefined;
	toggleDarkMode: () => void;
}

const ThemeContext = createContext<IThemeContext>({
	mode: undefined,
	toggleDarkMode: () => {},
});

export const ThemeContextProvider = ({ children }: Props) => {
	const prefersDarkMode: boolean = useMediaQuery('(prefers-color-scheme: dark)');
	const [mode, setMode] = useState<PaletteMode | undefined>('light');

	const toggleDarkMode = () => {
		setMode((prev) => {
			if (prev === 'light') {
				localStorage.setItem('mode', 'dark');
				return 'dark';
			} else {
				localStorage.setItem('mode', 'light');
				return 'light';
			}
		});
	};

	useLayoutEffect(() => {
		const value = localStorage.getItem('mode');
		if (!value) {
			prefersDarkMode ? setMode('dark') : setMode('light');
			localStorage.setItem('mode', mode!);
		} else {
			localStorage.getItem('mode') === 'light' ? setMode('light') : setMode('dark');
		}
	}, [mode, prefersDarkMode]);

	return (
		<ThemeContext.Provider
			value={{
				mode,
				toggleDarkMode,
			}}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContext;
