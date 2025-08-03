import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {loadConfig, baseUrl, imagenes} from '../services/helper';
import { SucursalClass } from '../clases/sucursal-class';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { CajaClass } from '../clases/caja-class';
@Injectable({
  providedIn: 'root'
})
export class CajasServicesService {
  private apiUrl = `${baseUrl}/Api/cajas`; // Cambia la URL según sea necesario

  

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

  buscar(idSucursal: number): Observable<any[]> {
    return this.httpClient.get<any>(`${this.apiUrl}/ListCombo/${idSucursal}`).pipe(
        catchError(this.mensajeSwal2.handleError) 
    );
  }


  

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

  buscarCaja(): Observable<any[]> {
    return this.httpClient.get<any>(`${this.apiUrl}/ListCombo`).pipe(
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
      }).then((resultado) => {  // Asegura que "result" tiene datos
        if (resultado.isConfirmed) {
          caja.estado = 'N'; // Marca la caja como eliminada
  
          this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, caja).pipe(
            tap(() => {
              this.mensajeSwal2.mensaje('Eliminada exitosamente', 'La caja se ha modificado correctamente.');
              observer.next(true);
            }),
            catchError((error) => {
              this.mensajeSwal2.handleError(error);
              observer.error(error);
              return throwError(error);
            })
          ).subscribe();
        } else {
          observer.next(false);
        }
      }).catch((error: any) => console.error("❌ Error en Swal.fire:", error)); // Maneja errores
    });
  }
  

// Muestra la lista de las cajas
load(selectComboSucursal: number, page: number, size: number, order: string, asc: boolean): Observable<any> {
  return this.httpClient.get(`${this.apiUrl}/List?busqueda=${selectComboSucursal}&page=${page}&size=${size}&order=${order}&asc=${asc}`).pipe(
    catchError(this.mensajeSwal2.handleError) 
  );
}




}
