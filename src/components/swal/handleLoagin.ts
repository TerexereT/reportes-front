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
