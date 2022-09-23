import useAxios from '../../../config';

export const contabilidad = {
	getDetallesXACIKeys,
	getGeneralKeys,
};

export async function getDetallesXACIKeys() {
	try {
		const resp = await useAxios.get('/contabilidad/detallexaci/keys');
		return resp.data.info;
	} catch (error) {
		console.log('error obteniendo los keys:', error);
	}
}

export async function getGeneralKeys() {
	try {
		const resp = await useAxios.get('/contabilidad/General/keys');
		return resp.data.info;
	} catch (error) {
		console.log('error obteniendo los keys:', error);
	}
}
