/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@mui/material';
import { FC, useState } from 'react';
import Swal from 'sweetalert2';
import { handleError, handleLoading } from '../components/swal/alerts';
import useAxios from '../config';

const ExecContraCargo: FC = () => {
	//const classes = useStyles();

	//const [state, setState] = .useState({});
	const [load, setLoad] = useState(false);

	const handleExecContraCargo = async () => {
		Swal.fire({
			title: '¿Contracargo?',
			showDenyButton: true,
			confirmButtonText: 'Ejecutar',
			denyButtonText: 'Cancelar',
			customClass: {
				actions: 'my-actions',
				confirmButton: 'order-2',
				denyButton: 'order-3',
			},
		}).then(async (result) => {
			setLoad(true);
			if (result.isConfirmed) {
				try {
					handleLoading();
					const res = await useAxios.get(`/contracargo/exec`);
					if (res.data.info.ok)
						//Swal.fire('Listo', `Contracargo finalizado Total de registros: ${res.data.info.line}`, 'success');
						Swal.fire('Listo', `Contracargo finalizado`, 'success');
					setLoad(false);
				} catch (error) {
					handleError(error);
					setLoad(false);
				}
			}
		});
	};

	return (
		<>
			<div className='ed-container'>
				<div
					className='ed-item s-py-2'
					style={{
						marginTop: '5rem',
						display: 'flex',
						justifyContent: 'center',
					}}>
					<Button
						style={{ fontSize: '2rem', padding: '2rem', borderRadius: '1rem' }}
						color='success'
						variant='contained'
						onClick={handleExecContraCargo}
						disabled={load}>
						Ejecutar ContraCargo
					</Button>
				</div>
			</div>
		</>
	);
};

export default ExecContraCargo;
