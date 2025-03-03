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
  console.log("entre");
  remesa.estado = 'A';
  return this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, remesa).pipe(
    tap(() => {
      this.mensajeSwal2.mensaje('Guardado exitoso','La remesa se ha modificado correctamente.')
    }),
    catchError(this.mensajeSwal2.handleError) 
  );
}

// Eliminar la remesa
       eliminar(id: number, remesa: RemesaClass): Observable<any> {
        return new Observable(observer => {
          Swal.fire({
            title: 'Eliminar Remesa',
            text: '¿Estás seguro de que deseas eliminar esta remesa?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          }).then((resultado) => {
            if (resultado.isConfirmed) {
              remesa.estado = 'N'; // Marca la remesa como eliminado
              this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, remesa).pipe(
                tap(() => {
                  this.mensajeSwal2.mensaje('Eliminada exitoso', 'La remesa se ha modificado correctamente.');
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

// Muestra la lista de remesas
load(idSucursal: number, page: number, size: number, order: string, asc: boolean): Observable<any> {
console.log("Id "+idSucursal);
if(idSucursal == undefined){
  idSucursal = 0;
}
  return this.httpClient.get(`${this.apiUrl}/List?busqueda=${idSucursal}&page=${page}&size=${size}&order=${order}&asc=${asc}`).pipe(
    catchError(this.mensajeSwal2.handleError) 
  );
}

}
