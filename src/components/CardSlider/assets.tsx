import { TAgregador } from 'context/AgregadorContext';
import entradaMilpagos from 'images/entrada1000Pagos.jpeg';
import entradaCarropago from 'images/fondoCarropago.jpeg';
import entradaGSComputer from 'images/fondoGSComputer.png';
import entradaLibrepago from 'images/fondoLibrepago.jpeg';
import logo1000pagos from 'images/Logo-1000Pagos-Horizontal.png';
import logoCarropago from 'images/logo-carropago.png';
import logoGSComputer from 'images/logo_GSComputer.png';
import logoLibrepago from 'images/logo_librePago.png';

interface ISlide {
	description: JSX.Element;
	image: string;
	value: TAgregador;
	key: number;
}

export const AgregadorSlides: ISlide[] = [
	{
		description: <img src={logoCarropago} alt='' style={{ width: '65%' }} />,
		image: entradaCarropago,
		value: 'Carropago',
		key: 1,
	},
	{
		description: <img src={logo1000pagos} alt='' style={{ width: '65%' }} />,
		image: entradaMilpagos,
		value: 'Milpagos',
		key: 2,
	},
	{
		description: <img src={logoLibrepago} alt='' style={{ width: '65%' }} />,
		image: entradaLibrepago,
		value: 'Librepago',
		key: 3,
	},
	{
		description: <img src={logoGSComputer} alt='' style={{ width: '65%' }} />,
		image: entradaGSComputer,
		value: 'GSComputer',
		key: 4,
	},
];
