import { Button } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import LoaderLine from '../components/loader/LoaderLine';
import useAxios from '../config';
//import { useStyles } from './RepDinamicos';
// import SelectList from '../components/DateTime';

const LoadExcel: FC = () => {
	//const classes = useStyles();

	//const [state, setState] = .useState({});
	const [load, setLoad] = useState(false);
	const [data, setData] = useState<any>(null);
	const [file, setFile] = useState<File | null>(null);

	/*
	useEffect(() => {
		if (data) {
			console.log(data);
		}
	}, [data]);
	*/

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

	const handleUpFile = async () => {
		setLoad(true);
		if (!file || !data) return;
		const formData: FormData = new FormData();
		try {
			formData.append('lote', JSON.stringify(data));
			console.log('datax', data);
			//
			const resp = await useAxios.post('/1000pagos/up/leto', formData);
			//
			Swal.fire({
				icon: 'success',
				title: 'Documento Guardado',
				text: 'lote cargado!',
			});
			console.log(resp);
			setLoad(false);
			setFile(null);
			setData(null);
		} catch (error: any) {
			setFile(null);
			console.log('err', error);
			Swal.fire('Error', error?.response?.data?.message || 'error', 'error');
			setLoad(false);
		}
	};

	return (
		<>
			<div className='ed-container'>
				<div
					className='ed-item s-py-2'
					style={{
						marginTop: '2rem',
						display: 'flex',
						justifyContent: 'center',
					}}>
					{!load ? (
						<>
							<div
								style={{
									margin: '2px',
									width: '20rem',
								}}>
								<Button size='small' variant='outlined' component='label'>
									Seleccionar Archivo
									<input type='file' accept='.xlsx, .xls, .csv' hidden onChange={handleFile} />
								</Button>
								<p style={{ margin: '2px' }}>{file ? file.name : ''}</p>
							</div>
							<Button size='small' variant='contained' onClick={handleUpFile} disabled={file ? false : true}>
								Cargar
							</Button>
						</>
					) : (
						<div style={{ width: '50%', marginLeft: '5rem' }}>
							<LoaderLine />
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default LoadExcel;
