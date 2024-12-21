import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import baserUrl from '../services/helper';
import { SucursalClass } from '../clases/sucursal-class';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { UnidadMedidaClass } from '../clases/unidad-medida-class'; 
@Injectable({
  providedIn: 'root'
})
export class UnidadesServicesService {
  private apiUrl = `${baserUrl}/Api/unidades`; // Cambia la URL según sea necesario
  
  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }


  // Agrega una nueva unidad
  agregar(unidad: UnidadMedidaClass): Observable<any> {
    unidad.estado = 'A';
    return this.httpClient.post(`${this.apiUrl}/Guardar`, unidad).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','La unidad se ha guardado correctamente.')

      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }

  // Modifica Unidad
  modificar(id: number, unidad: UnidadMedidaClass): Observable<any> {
    unidad.estado = 'A'
    return this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, unidad).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','La unidad se ha modificado correctamente.')
      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }


  // Eliminar Unidad
eliminar(id: number, unidad: UnidadMedidaClass): void {
  Swal.fire({
    title: 'Eliminar Unidad',
    text: '¿Estás seguro de que deseas eliminar esta Unidad?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      
      unidad.estado = 'N';
      this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, unidad).pipe(
        tap(() => {
          this.mensajeSwal2.mensaje('Eliminada exitoso', 'La Unidad se ha modificado correctamente.');
        }),
        catchError((error) => {
          this.mensajeSwal2.handleError(error);
          return throwError(error); 
        })
      ).subscribe(); 
    }
  });
}

// Muestra la lista de gastos
load(search: string, page: number, size: number, order: string, asc: boolean): Observable<any> {
  return this.httpClient.get(`${this.apiUrl}/List?busqueda=${search}&page=${page}&size=${size}&order=${order}&asc=${asc}`).pipe(
    catchError(this.mensajeSwal2.handleError) 
  );
}



}
