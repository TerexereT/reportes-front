import { createContext, Dispatch, ReactChild, SetStateAction, useLayoutEffect, useState } from 'react';

interface Props {
	children: ReactChild;
}

export type TAgregador = 'Milpagos' | 'Librepago' | 'Carropago';

interface IAgregadorContext {
	Agregador: TAgregador | undefined;
	setAgregador: Dispatch<SetStateAction<TAgregador>>;
}

const AgregadorContext = createContext<IAgregadorContext>({ Agregador: undefined, setAgregador: () => {} });

export const AgregadorContextProvider = ({ children }: Props) => {
	const [Agregador, setAgregador] = useState<TAgregador>('Milpagos');

	// useMemo(() => {
	// }, [Agregador]);

	useLayoutEffect(() => {
		const agr = window.localStorage.getItem('agregador') as TAgregador;
		if (agr) setAgregador(agr);
	}, []);

	return (
		<AgregadorContext.Provider
			value={{
				Agregador,
				setAgregador,
			}}>
			{children}
		</AgregadorContext.Provider>
	);
};

export default AgregadorContext;
