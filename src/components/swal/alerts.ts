import Swal from 'sweetalert2';

export const swalLoading = () => {
	Swal.fire({
		icon: 'info',
		title: 'Verificando...',
		showCancelButton: false,
		allowOutsideClick: false,
		allowEscapeKey: false,
		didOpen: () => {
			Swal.showLoading();
		},
	});
};

export const handleInfoText = (title: string, text: string) => {
	Swal.fire({
		icon: 'info',
		title: title,
		text: text || 'Error Access',
		customClass: { container: 'swal2-validated' },
		showConfirmButton: true,
		//timer: 2500,
	});
};

export const handleLoadingSave = () => {
	Swal.fire({
		icon: 'info',
		title: 'Guardando...',
		showConfirmButton: false,
		customClass: { container: 'swal2-validated' },
		allowOutsideClick: false,
		allowEscapeKey: false,
		didOpen: () => {
			Swal.showLoading();
		},
	});
};

export const handleNotAccess = () => {
	Swal.fire({
		icon: 'info',
		title: 'No tienes acceso',
		text: 'Necesitas permisos',
		customClass: { container: 'swal2-validated' },
		showConfirmButton: true,
		//timer: 2500,
	});
};

export const handleError = (error: any) => {
	Swal.fire({
		icon: 'error',
		title: 'Error',
		text: error.response?.data?.message || 'Error Access',
		showConfirmButton: true,
	});
};

export const handleLoading = () => {
	Swal.fire({
		icon: 'info',
		title: 'Cargando...',
		text: 'Por favor, espere',
		showConfirmButton: false,
		customClass: { container: 'swal2-validated' },
		allowOutsideClick: false,
		allowEscapeKey: false,
		didOpen: () => {
			Swal.showLoading();
		},
	});
};
