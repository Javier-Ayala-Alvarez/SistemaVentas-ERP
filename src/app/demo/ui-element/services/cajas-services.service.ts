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

   // Eliminar Caja
eliminar(id: number, caja: CajaClass): void {
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
      
      caja.estado = 'N';
      this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, caja).pipe(
        tap(() => {
          this.mensajeSwal2.mensaje('Eliminada exitoso', 'La caja se ha modificado correctamente.');
        }),
        catchError((error) => {
          this.mensajeSwal2.handleError(error);
          return throwError(error); 
        })
      ).subscribe(); 
    }
  });
}


// Muestra la lista de las cajas
load(search: string, page: number, size: number, order: string, asc: boolean): Observable<any> {
  return this.httpClient.get(`${this.apiUrl}/List?busqueda=${search}&page=${page}&size=${size}&order=${order}&asc=${asc}`).pipe(
    catchError(this.mensajeSwal2.handleError) 
  );
}




}
