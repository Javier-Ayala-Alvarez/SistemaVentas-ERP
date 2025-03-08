import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {loadConfig, baseUrl, imagenes} from '../services/helper';
import { SucursalClass } from '../clases/sucursal-class';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SucursalServicesService {

  private apiUrl = `${baseUrl}/Api/Sucursal`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

  buscar(): Observable<any[]> {
    return this.httpClient.get<any>(`${this.apiUrl}/ListCombo`).pipe(
        catchError(this.mensajeSwal2.handleError) 
    );
  }

  

  

  // Agrega una nueva sucursal
  agregar(sucursal: SucursalClass): Observable<any> {
    sucursal.estado = 'A';
    return this.httpClient.post(`${this.apiUrl}/Guardar`, sucursal).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','La sucursal se ha guardado correctamente.')

      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }

  // Modifica la sucursal
  modificar(id: number, sucursal: SucursalClass): Observable<any> {
    console.log ("sucursal " +sucursal  );
    sucursal.estado = 'A';
    
    return this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, sucursal).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','La sucursal se ha modificado correctamente.')
      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }

 // Eliminar la sucursal
 eliminar(id: number, sucursal: SucursalClass): Observable<any> {
  return new Observable(observer => {
    Swal.fire({
      title: 'Eliminar Sucursal',
      text: '¿Estás seguro de que deseas eliminar esta sucursal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        sucursal.estado = 'N'; // Marca la sucursal como eliminada
        this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, sucursal).pipe(
          tap(() => {
            this.mensajeSwal2.mensaje('Eliminada exitoso', 'La sucursal se ha modificado correctamente.');
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




  // Muestra la lista de sucursales
  load(search: string, page: number, size: number, order: string, asc: boolean): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/List?busqueda=${search}&page=${page}&size=${size}&order=${order}&asc=${asc}`).pipe(
      catchError(this.mensajeSwal2.handleError) 
    );
  }

}
