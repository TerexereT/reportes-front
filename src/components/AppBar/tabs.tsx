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
	contracargo,
	contraCargoUp,
	cuotas,
	cuotasR,
	execContracargo,
	librePago,
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
	{
		name: 'Ejecutar Contracargos',
		link: execContracargo,
		icon: <CurrencyExchangeIcon />,
	},
];

export const handleTitleSection = (seccion: string) => {
	const section = auxLink.filter((val) => val.link === seccion);
	return section.length > 0 ? section[0].name : 'Inicio';
};
