import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import baserUrl from '../services/helper';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ProductoClass } from '../clases/producto-class'; 

@Injectable({
  providedIn: 'root'
})
export class ProductosServicesService {

  private apiUrl = `${baserUrl}/Api/productos`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

  // Agrega una nuevo producto
  agregar(producto : ProductoClass): Observable<any> {
    producto.estado = 'A';
    return this.httpClient.post(`${this.apiUrl}/Guardar`, producto).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','el producto se ha guardado correctamente.')

      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }


  // Modifica Producto
  modificar(id: number, producto: ProductoClass): Observable<any> {
    producto.estado = 'A';
    return this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, producto).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','El producto se ha modificado correctamente.')
      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }

 // Eliminar Gasto
eliminar(id: number, producto: ProductoClass): void {
  Swal.fire({
    title: 'Eliminar producto',
    text: '¿Estás seguro de que deseas eliminar este Producto?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      
      producto.estado = 'N';
      this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, producto).pipe(
        tap(() => {
          this.mensajeSwal2.mensaje('Eliminada exitoso', 'El producto se ha modificado correctamente.');
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