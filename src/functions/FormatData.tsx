const formatData = (data: any[]) => {
	let formatedData = data;
	formatedData.forEach((val) => {
		if (val.DIRECCION) {
			let dir = val.DIRECCION;
			dir = dir.split('\r').join('').split('\n').join('');
			val.DIRECCION = dir;
		}
		return val;
	});
	return formatedData;
};

export default formatData;
