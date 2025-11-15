import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {baseUrl, imagenes} from 'src/app/config/config';
import { ProveedorClass } from '../clases/proveedor-class';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresServicesService {

  private apiUrl = `${baseUrl}/Api/proveedores`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }


  // Agrega un nuevo proveedor 
    agregar(proveedor: ProveedorClass): Observable<any> {
      proveedor.estado = 'A';
      return this.httpClient.post(`${this.apiUrl}/Guardar`, proveedor).pipe(
        tap(() => {
          this.mensajeSwal2.mensaje('Guardado exitoso','El proveedor se ha guardado correctamente.')
  
        }),
        catchError(this.mensajeSwal2.handleError) 
      );
    }

    // Modifica el proveedor
      modificar(id: number, proveedor: ProveedorClass): Observable<any> {
        proveedor.estado = 'A';
        return this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, proveedor).pipe(
          tap(() => {
            this.mensajeSwal2.mensaje('Guardado exitoso','El proveedor se ha modificado correctamente.')
          }),
          catchError(this.mensajeSwal2.handleError) 
        );
      }
    

      // Eliminar el proveedor 
       eliminar(id: number, proveedor: ProveedorClass): Observable<any> {
        return new Observable(observer => {
          Swal.fire({
            title: 'Eliminar Proveedor',
            text: '¿Estás seguro de que deseas eliminar este proveedor?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          }).then((resultado) => {
            if (resultado.isConfirmed) {
              proveedor.estado = 'N'; // Marca el proveedor como eliminado
              this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, proveedor).pipe(
                tap(() => {
                  this.mensajeSwal2.mensaje('Eliminada exitoso', 'El proveedor se ha modificado correctamente.');
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
