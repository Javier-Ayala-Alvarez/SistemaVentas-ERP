import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import baserUrl from '../services/helper';
import { SucursalClass } from '../clases/sucursal-class';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { GastoClass } from '../clases/gasto-class';

@Injectable({
  providedIn: 'root'
})
export class GastosServicesService {
  private apiUrl = `${baserUrl}/Api/gastos`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

   // Agrega una nuevo gasto
   agregar(gasto: GastoClass): Observable<any> {
    gasto.estado = 'A';
    return this.httpClient.post(`${this.apiUrl}/Guardar`, gasto).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','el gasto se ha guardado correctamente.')

      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }

  // Modifica Gasto
  modificar(id: number, gasto: GastoClass): Observable<any> {
    gasto.estado = 'A';
    return this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, gasto).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','El gasto se ha modificado correctamente.')
      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }

 // Eliminar el gasto
        eliminar(id: number, gasto: GastoClass): Observable<any> {
         return new Observable(observer => {
           Swal.fire({
             title: 'Eliminar Gasto',
             text: '¿Estás seguro de que deseas eliminar este gasto?',
             icon: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: 'Eliminar',
             cancelButtonText: 'Cancelar'
           }).then((resultado) => {
             if (resultado.isConfirmed) {
               gasto.estado = 'N'; // Marca el gasto como eliminado
               this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, gasto).pipe(
                 tap(() => {
                   this.mensajeSwal2.mensaje('Eliminada exitoso', 'El gasto se ha modificado correctamente.');
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


// Muestra la lista de gastos
load(search: string, page: number, size: number, order: string, asc: boolean): Observable<any> {
  return this.httpClient.get(`${this.apiUrl}/List?busqueda=${search}&page=${page}&size=${size}&order=${order}&asc=${asc}`).pipe(
    catchError(this.mensajeSwal2.handleError) 
  );
}


}
