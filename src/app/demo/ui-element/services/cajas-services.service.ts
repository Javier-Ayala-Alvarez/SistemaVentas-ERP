import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import baserUrl from '../services/helper';
import { SucursalClass } from '../clases/sucursal-class';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { CajaClass } from '../clases/caja-class';
@Injectable({
  providedIn: 'root'
})
export class CajasServicesService {
  private apiUrl = `${baserUrl}/Api/cajas`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

  // Agrega una nueva caja 
  agregar(caja: CajaClass): Observable<any> {
    caja.estado = 'A';
    return this.httpClient.post(`${this.apiUrl}/Guardar`, caja).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','La caja se ha guardado correctamente.')

      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }

  // Modifica Caja
  modificar(id: number, caja: CajaClass): Observable<any> {
    caja.estado = 'A';
    return this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, caja).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','La caja se ha modificado correctamente.')
      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }

   // Eliminar caja
          eliminar(id: number, caja: CajaClass): Observable<any> {
           return new Observable(observer => {
             Swal.fire({
               title: 'Eliminar Caja',
               text: '¿Estás seguro de que deseas eliminar esta caja?',
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Eliminar',
               cancelButtonText: 'Cancelar'
             }).then((resultado) => {
               if (resultado.isConfirmed) {
                 caja.estado = 'N'; // Marca la caja como eliminado
                 this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, caja).pipe(
                   tap(() => {
                     this.mensajeSwal2.mensaje('Eliminada exitoso', 'La caja se ha modificado correctamente.');
                     observer.next(true);  // Emite true indicando que la operación fue exitosa
                   }),
                   catchError((error) => {
                     this.mensajeSwal2.handleError(error);
                     observer.error(error);  // En caso de error, emite el error
                     return throwError(error);
                   })
                 ).subscribe();
               } else {
                 observer.next(false);  // Si el usuario cancela, emite false
               }
             });
           });
         }


// Muestra la lista de las cajas
load(search: string, page: number, size: number, order: string, asc: boolean): Observable<any> {
  return this.httpClient.get(`${this.apiUrl}/List?busqueda=${search}&page=${page}&size=${size}&order=${order}&asc=${asc}`).pipe(
    catchError(this.mensajeSwal2.handleError) 
  );
}




}
