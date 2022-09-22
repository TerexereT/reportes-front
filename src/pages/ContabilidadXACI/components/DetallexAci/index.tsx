/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from '@mui/material';
import { FC, useLayoutEffect, useState } from 'react';
import SelectList from '../../../../components/DateTime';
import TableReports from '../../../../components/table';
import { useStyles as useStylesRD } from '../../../RepDinamicos';
import { getDetallesXACIKeys } from '../../services/contabilidad';

interface Props {}

const DetalleXACI: FC<Props> = () => {
	// const classes = useStyles();
	const classesRD = useStylesRD();
	const [state, setState] = useState({});
	const today = new Date();
	const lastMonth = new Date(today);
	const [initDate, setInitDate] = useState<Date | undefined>(lastMonth);
	const [endDate, setEndDate] = useState<Date | undefined>(today);

	useLayoutEffect(() => {
		const init = async () => {
			setState(await getDetallesXACIKeys());
		};
		init();
	}, []);

	return (
		<>
			{/* <div className={classesRD.base}> */}
			<div className={classesRD.cards}>
				<Card className={classesRD.card}>
					<SelectList initDate={initDate} endDate={endDate} setInitDate={setInitDate} setEndDate={setEndDate} />
				</Card>
			</div>
			<div className={classesRD.cards}>
				<TableReports initDate={initDate} endDate={endDate} state={state} from='DetallexACI' />
			</div>
			{/* </div> */}
		</>
	);
};

export default DetalleXACI;
