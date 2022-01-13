const Round = (num: any) => {
	let m = Number((Math.abs(num) * 100).toPrecision(15));
	return (Math.round(m) / 100) * Math.sign(num);
};

export default Round;
