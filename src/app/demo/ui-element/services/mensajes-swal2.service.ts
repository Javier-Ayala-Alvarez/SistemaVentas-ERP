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
    const errorMessage = e.status === 0
      ? 'No se pudo conectar al servidor. Verifique su conexión al servidor o llame a soporte.'
      : e.status === 400 && e.error?.errors
      ? (e.error.errors as string[]).join('<br>')
      : e.error?.mensaje || 'Ocurrió un error inesperado';

    Swal.fire({
      icon: 'error',
      title: e.status === 400 ? 'Errores de validación' : 'Error !!',
      html: errorMessage
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
