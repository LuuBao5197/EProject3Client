import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
export function SweetAlert(message, type) {
    Swal.fire({
        icon: type,
        title: type.charAt(0).toUpperCase() + type.slice(1),
        text: message,
    });
}

// showAlert('Operation completed successfully', 'success');
// showAlert('There was an error processing your request', 'error');
// showAlert('This is a warning', 'warning');
// showAlert('Here is some information', 'info');
