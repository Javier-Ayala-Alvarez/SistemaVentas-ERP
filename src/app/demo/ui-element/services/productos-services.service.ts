import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import baserUrl from '../services/helper';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ProductoClass } from '../clases/producto-class'; 
import { UnidadMedidaClass } from '../clases/unidad-medida-class';
import { UnidadMedidaProductoClass } from '../clases/unidadMedidaProducto';

@Injectable({
  providedIn: 'root'
})
export class ProductosServicesService {

  private apiUrl = `${baserUrl}/Api/producto`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }
 
  unidadMedidaProducto: UnidadMedidaProductoClass[] = [];
  agregarUnidadMedida(unidadMedidaProducto: UnidadMedidaProductoClass): void {
    this.unidadMedidaProducto.push({ ...unidadMedidaProducto });
  }
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

 // Eliminar el producto
        eliminar(id: number, producto: ProductoClass): Observable<any> {
         return new Observable(observer => {
           Swal.fire({
             title: 'Eliminar Producto',
             text: '¿Estás seguro de que deseas eliminar este producto?',
             icon: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: 'Eliminar',
             cancelButtonText: 'Cancelar'
           }).then((resultado) => {
             if (resultado.isConfirmed) {
               producto.estado = 'N'; // Marca el productp como eliminado
               this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, producto).pipe(
                 tap(() => {
                   this.mensajeSwal2.mensaje('Eliminada exitoso', 'El producto se ha modificado correctamente.');
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
