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
		key: 2,
		name: 'Movimientos',
		link: movimientos,
		icon: <ImportExportIcon />,
	},
	{
		key: 3,
		name: 'Cuotas',
		link: cuotas,
		icon: <AttachMoneyIcon />,
	},
	{
		key: 4,
		name: 'Cuotas Resumidas',
		link: cuotasR,
		icon: <AttachMoneyIcon />,
	},
	{
		key: 5,
		name: 'Mantenimiento',
		link: mantenimientos,
		icon: <BuildIcon />,
	},
	{
		key: 6,
		name: 'Mantenimiento por ACI',
		link: reportexaci,
		icon: <HardwareIcon />,
	},
	{
		key: 7,
		name: 'Libre Pago',
		link: librePago,
		icon: <ReceiptIcon />,
	},
	{
		key: 8,
		name: 'Pago Cuota',
		link: pagoCuota,
		icon: <ReceiptLongIcon />,
	},
	{
		key: 9,
		name: 'Transaccional',
		link: transaccional,
		icon: <HandshakeIcon />,
	},
	{
		key: 10,
		name: 'Archivo ContraCargo',
		link: contraCargoUp,
		icon: <CloudUploadIcon />,
	},
	{
		key: 11,
		name: 'Gestion de Seguridad',
		link: seguridad,
		icon: <BuildIcon />,
	},
	{
		key: 12,
		name: 'Contracargo Descontado',
		link: contracargo,
		icon: <CurrencyExchangeIcon />,
	},
	{
		key: 13,
		name: 'Ejecutar Contracargos',
		link: execContracargo,
		icon: <CurrencyExchangeIcon />,
	},
];

export const handleTitleSection = (seccion: string, views: any[]) => {
	const section = auxLink.filter((val) => val.link === seccion);
	if (section.length === 0) return 'Inicio';
	const name_views = views.filter((val) => val.key === section[0].key);
	return name_views.length > 0 ? name_views[0].name : 'Inicio';
};
