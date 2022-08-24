import { Button } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import LoaderLine from '../components/loader/LoaderLine';
import { handleError, handleLoading } from '../components/swal/alerts';
import useAxios from '../config';
//import { useStyles } from './RepDinamicos';
// import SelectList from '../components/DateTime';

const ExecContraCargo: FC = () => {
	//const classes = useStyles();

	//const [state, setState] = .useState({});
	const [load, setLoad] = useState(false);
	const [data, setData] = useState<any>(null);
	const [file, setFile] = useState<File | null>(null);

	const transFile = async (filex: File) => {
		const promise = new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsArrayBuffer(filex!);
			fileReader.onload = (e: any) => {
				const bufferArray = e.target.result;
				const wb = XLSX.read(bufferArray, { type: 'buffer' });
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				const data = XLSX.utils.sheet_to_json(ws);
				resolve(data);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
		await promise.then((d) => {
			console.log('dd', d);
			setData(d);
		});
	};

	const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
		if (event?.target?.files && event.target.files[0]) {
			let file_aux: File = event.target.files[0];
			transFile(file_aux);
			setFile(file_aux);
		}
	};

	const handleExecContraCargo = async () => {
		Swal.fire({
			title: '¿Ejecutar contracargo?',
			showDenyButton: true,
			confirmButtonText: 'Si',
			denyButtonText: 'No',
			customClass: {
				actions: 'my-actions',
				confirmButton: 'order-2',
				denyButton: 'order-3',
			},
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					handleLoading();
					const res = await useAxios.get(`/contracargo/exec`);
					if (res.data.info.ok)
						Swal.fire('Listo', `Contracargo finalizado Total de registros: ${res.data.info.line}`, 'success');
				} catch (error) {
					handleError(error);
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
