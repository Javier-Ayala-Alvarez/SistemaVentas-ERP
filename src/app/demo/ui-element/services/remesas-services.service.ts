import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import baserUrl from '../services/helper';
import { SucursalClass } from '../clases/sucursal-class';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { RemesaClass } from '../clases/remesa-class';
@Injectable({
  providedIn: 'root'
})
export class RemesasServicesService {
  private apiUrl = `${baserUrl}/Api/remesas`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

 // Agrega una nueva remesa 
 agregar(remesa: RemesaClass): Observable<any> {
  remesa.estado = 'A';
  return this.httpClient.post(`${this.apiUrl}/Guardar`, remesa).pipe(
    tap(() => {
      this.mensajeSwal2.mensaje('Guardado exitoso','La remesa se ha guardado correctamente.')

    }),
    catchError(this.mensajeSwal2.handleError) 
  );
}
  

// Modifica remesa
modificar(id: number, remesa: RemesaClass): Observable<any> {
  remesa.estado = 'A';
  return this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, remesa).pipe(
    tap(() => {
      this.mensajeSwal2.mensaje('Guardado exitoso','La remesa se ha modificado correctamente.')
    }),
    catchError(this.mensajeSwal2.handleError) 
  );
}

// Eliminar Gasto
eliminar(id: number, remesa: RemesaClass): void {
  Swal.fire({
    title: 'Eliminar Remesa',
    text: '¿Estás seguro de que deseas eliminar esta Remesa?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      
      remesa.estado = 'N';
      this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, remesa).pipe(
        tap(() => {
          this.mensajeSwal2.mensaje('Eliminada exitoso', 'La remesa se ha modificado correctamente.');
        }),
        catchError((error) => {
          this.mensajeSwal2.handleError(error);
          return throwError(error); 
        })
      ).subscribe(); 
    }
  });
}

// Muestra la lista de remesas
load(search: string, page: number, size: number, order: string, asc: boolean): Observable<any> {
  return this.httpClient.get(`${this.apiUrl}/List?busqueda=${search}&page=${page}&size=${size}&order=${order}&asc=${asc}`).pipe(
    catchError(this.mensajeSwal2.handleError) 
  );
}

}
