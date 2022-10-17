import { Button } from '@mui/material';
import classNames from 'classnames';
import { ChangeEvent, FC, useState } from 'react';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import LoaderLine from '../components/loader/LoaderLine';
import { handleLoading } from '../components/swal/alerts';
import useAxios from '../config';
import { useStyles } from './RepDinamicos';
// import SelectList from '../components/DateTime';

const sxStylesCarga = {
	width: '120px',
	height: '40px',
	marginTop: '1rem',
} as const;
const sxStylesPick = {
	maxWidth: '240px',
	height: '40px',
	marginTop: '1rem',
} as const;

const ContraCargoUpFile: FC = () => {
	const classes = useStyles();

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
			// console.log('dd', d);
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
			formData.append('nameFile', file.name);
			// console.log('datax', data);
			//
			handleLoading();
			await useAxios.post('/1000pagos/contracargo/up/lote', formData);
			//
			Swal.fire({
				icon: 'success',
				title: 'Documento Guardado',
				text: 'lote cargado!',
			});
			//console.log(resp);
			setLoad(false);
			setFile(null);
			setData(null);
		} catch (error: any) {
			setFile(null);
			// console.log('err', error);
			Swal.fire('Error', error?.response?.data?.message || 'error', 'error');
			setLoad(false);
		}
	};

	return (
		<div className={classes.base}>
			<div
				className={classes.cards}
				style={{
					marginTop: '2rem',
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				{!load ? (
					<>
						<div className={classNames(classes.title, classes.rowItem)}>
							A continuación elija el archivo Excel para el contra cargo
						</div>
						{file ? <div className={classNames(classes.rowItem, classes.inputText)}>{file.name}</div> : null}
						<Button size='small' sx={sxStylesPick} variant={'contained'} component='label'>
							Seleccionar Archivo
							<input type='file' accept='.xlsx, .xls, .csv' hidden onChange={handleFile} />
						</Button>
						<Button
							sx={sxStylesCarga}
							size='small'
							variant='contained'
							onClick={handleUpFile}
							disabled={file ? false : true}>
							Cargar
						</Button>
					</>
				) : (
					<div style={{ width: '50%', marginLeft: '5rem', marginTop: '5rem' }}>
						<LoaderLine />
					</div>
				)}
			</div>
		</div>
	);
};

export default ContraCargoUpFile;
