import Swal from 'sweetalert2';

export const showAlert = {
  success: (text, title = 'Success') =>
    Swal.fire({
      icon: 'success',
      title,
      text,
    }),

  error: (text, title = 'Error') =>
    Swal.fire({
      icon: 'error',
      title,
      text,
    }),

  warning: (text, title = 'Warning') =>
    Swal.fire({
      icon: 'warning',
      title,
      text,
    }),

  info: (text, title = 'Info') =>
    Swal.fire({
      icon: 'info',
      title,
      text,
    }),

  confirm: (text, title = 'Are you sure?') =>
    Swal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }),
};