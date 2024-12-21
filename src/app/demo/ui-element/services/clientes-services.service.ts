import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import baserUrl from '../services/helper';
import { SucursalClass } from '../clases/sucursal-class';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ClienteClass } from '../clases/cliente-class';

@Injectable({
  providedIn: 'root'
})
export class ClientesServicesService {
  private apiUrl = `${baserUrl}/Api/clientes`; // Cambia la URL según sea necesario
  
  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }


  // Agrega una nuevo cliente
  agregar(cliente: ClienteClass): Observable<any> {
    cliente.estado = 'A';
    return this.httpClient.post(`${this.apiUrl}/Guardar`, cliente).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','el cliente se ha guardado correctamente.')

      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }


  
  // Modifica Cliente
  modificar(id: number, cliente: ClienteClass): Observable<any> {
    cliente.estado = 'A';
    return this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, cliente).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','El cliente se ha modificado correctamente.')
      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }



  // Eliminar Cliente
eliminar(id: number, cliente: ClienteClass): void {
  Swal.fire({
    title: 'Eliminar Cliente',
    text: '¿Estás seguro de que deseas eliminar este Cliente?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      
      cliente.estado = 'N';
      this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, cliente).pipe(
        tap(() => {
          this.mensajeSwal2.mensaje('Eliminada exitoso', 'El cliente se ha modificado correctamente.');
        }),
        catchError((error) => {
          this.mensajeSwal2.handleError(error);
          return throwError(error); 
        })
      ).subscribe(); 
    }
  });
}

// Muestra la lista de clientes
load(search: string, page: number, size: number, order: string, asc: boolean): Observable<any> {
  return this.httpClient.get(`${this.apiUrl}/List?busqueda=${search}&page=${page}&size=${size}&order=${order}&asc=${asc}`).pipe(
    catchError(this.mensajeSwal2.handleError) 
  );
}



}
