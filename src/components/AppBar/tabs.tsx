import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BuildIcon from '@mui/icons-material/Build';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HandshakeIcon from '@mui/icons-material/Handshake';
import HardwareIcon from '@mui/icons-material/Hardware';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import {
	cancelarCuotas,
	contracargo,
	contraCargoUp,
	cuotas,
	cuotasR,
	librePago,
	// login,
	mantenimientos,
	movimientos,
	pagoCuota,
	reportexaci,
	seguridad,
	transaccional,
} from '../../router/url';

export const auxLink = [
	{
		name: 'Movimientos',
		link: movimientos,
		icon: <ImportExportIcon />,
	},
	{
		name: 'Cuotas Vencidas',
		link: cuotas,
		icon: <AttachMoneyIcon />,
	},
	{
		name: 'Cuotas Resumidas',
		link: cuotasR,
		icon: <AttachMoneyIcon />,
	},
	{
		name: 'Mantenimiento',
		link: mantenimientos,
		icon: <BuildIcon />,
	},
	{
		name: 'Mantenimiento por ACI',
		link: reportexaci,
		icon: <HardwareIcon />,
	},
	{
		name: 'Libre Pago',
		link: librePago,
		icon: <ReceiptIcon />,
	},
	{
		name: 'Pago Cuota',
		link: pagoCuota,
		icon: <ReceiptLongIcon />,
	},
	{
		name: 'Transaccional',
		link: transaccional,
		icon: <HandshakeIcon />,
	},
	{
		name: 'Archivo ContraCargo',
		link: contraCargoUp,
		icon: <CloudUploadIcon />,
	},
	{
		name: 'Gestion de Seguridad',
		link: seguridad,
		icon: <BuildIcon />,
	},
	{
		name: 'Contracargos',
		link: contracargo,
		icon: <CurrencyExchangeIcon />,
	},
];

export const handleTitleSection = (seccion: string) => {
	switch (seccion) {
		case contracargo:
			return 'Contracargos';
		case cuotas:
			return 'Cuotas Vencidas';
		case movimientos:
			return 'Movimientos';
		case mantenimientos:
			return 'Mantenimiento';
		case cuotasR:
			return 'Cuotas Resumidas';
		case cancelarCuotas:
			return 'Cancelar Cuotas';
		case reportexaci:
			return 'Mantenimiento por ACI';
		case librePago:
			return 'Libre Pago';
		case pagoCuota:
			return 'Pago Cuota';
		case transaccional:
			return 'Transaccional';
		case seguridad:
			return 'Gestion de Seguridad';
		default:
			return 'Inicio';
	}
};
