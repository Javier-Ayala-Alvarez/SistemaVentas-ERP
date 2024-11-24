import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesSwal2Service {

 
  constructor() { }

  // Función común para manejar los errores
  handleError(e: any) {
    let errorMessage = 'Ocurrió un error inesperado.';
  
    // Verificar la conexión al servidor
    if (e.status === 0) {
      errorMessage = 'No se pudo conectar al servidor. Verifique su conexión a Internet o llame a soporte.';
    }
    // Errores de validación (400)
    else if (e.status === 400 && e.error?.errors) {
      errorMessage = (e.error.errors as string[]).join('<br>');
    }
    // Error general con mensaje
    else if (e.error?.mensaje) {
      errorMessage = e.error.mensaje;
    }
    // Errores detallados
    else if (e.error?.error) {
      errorMessage = e.error.error;
    }
  
    // Mostrar el mensaje de error usando SweetAlert
    Swal.fire({
      icon: 'error',
      title: e.status === 400 ? 'Errores de validación' : 'Error inesperado',
      html: errorMessage,
      showCloseButton: true,  // Agregar botón de cierre para una mejor experiencia
      focusConfirm: false,
      confirmButtonText: 'Aceptar'
    });
  
    return throwError(e);
  }
  
mensaje(title: string, text: string){
  Swal.fire({
    icon: 'success',
    title: title,
    text: text
  });
}
mensajeAutenticacion(title: string, text: string){
  Swal.fire({
    icon: 'warning',
    title: title,
    text: text
  });
}
}
