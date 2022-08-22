export const baseUrl = '/';
export const contraCargo = `${baseUrl}contracargo-up/`;
export const login = `${baseUrl}auth/login`;
export const movimientos = `${baseUrl}movimientos/`;
export const cuotas = `${baseUrl}cuotas/`;
export const cuotasR = `${baseUrl}cuotas-resumen/`;
export const mantenimientos = `${baseUrl}mantenimiento/`;
export const cancelarCuotas = `${baseUrl}cancelacion-cuotas/`;
export const reportexaci = `${baseUrl}mantenimiento-aci/`;
export const librePago = `${baseUrl}libre-pago/`;
export const pagoCuota = `${baseUrl}pago-cuota/`;
export const transaccional = `${baseUrl}transaccional/`;
export const seguridad = `${baseUrl}seguridad/`;

export const urlPrivate = [
	contraCargo,
	movimientos,
	cuotas,
	cuotasR,
	mantenimientos,
	cancelarCuotas,
	reportexaci,
	librePago,
	pagoCuota,
	transaccional,
	seguridad,
];

export const urlPublic = [login];
