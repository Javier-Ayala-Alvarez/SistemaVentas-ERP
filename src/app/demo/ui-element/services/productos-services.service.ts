import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {loadConfig, baseUrl, imagenes} from '../services/helper';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ProductoClass } from '../clases/producto-class'; 
import { UnidadMedidaClass } from '../clases/unidad-medida-class';
import { UnidadMedidaProductoClass } from '../clases/unidadMedidaProducto';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductosServicesService {

  private apiUrl = `${baseUrl}/Api/producto`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }
 
  unidadMedidaProducto: UnidadMedidaProductoClass[] = [];

  agregarUnidadMedida(unidadMedidaProducto: UnidadMedidaProductoClass): void {
    this.unidadMedidaProducto.push({ ...unidadMedidaProducto });
  }
  
  // Agrega un nuevo producto
  agregar(producto: ProductoClass, formData: FormData): Observable<any> {
    producto.estado = "A";
    const form =  new FormData();
    form.append('producto', JSON.stringify(producto));
    form.append('imagen', formData.get('imagen') as Blob) ;
    form.append('unidades',JSON.stringify(this.unidadMedidaProducto));
      // Verificar si 'imagen' está en formData
  if (formData.has('imagen')) {
    form.append('imagen', formData.get('imagen') as Blob);
  } else {
    console.error('No se ha añadido imagen');
  }
    producto.estado = 'A';
    return this.httpClient.post(`${this.apiUrl}/Guardar`, form).pipe(
      tap((respuesta: any) => {
        if (respuesta?.producto?.id) {
          //this.AgregarUnidadMedida(respuesta.producto.id).subscribe(); // Llamada para agregar unidad de medida
          this.mensajeSwal2.mensaje('Guardado exitoso', 'El producto se ha guardado correctamente.');
        } else {
          this.mensajeSwal2.mensaje('Error', 'No se pudo obtener el ID del producto.');
        }
      }),
      catchError(this.mensajeSwal2.handleError)
    );
  }
  

  
  

  // Modifica Producto
  modificar(id: number, producto: ProductoClass, formData: FormData): Observable<any> {
    const form =  new FormData();
    form.append('producto', JSON.stringify(producto));
    form.append('imagen', formData.get('imagen') as Blob) ;
    form.append('unidades',JSON.stringify(this.unidadMedidaProducto));
    producto.estado = 'A';
    return this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, form).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','El producto se ha modificado correctamente.')
      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }

 // Eliminar el producto
        eliminar(id: number, producto: ProductoClass): Observable<any> {
          const form =  new FormData();
          form.append('producto', JSON.stringify(producto));
          form.append('unidades',JSON.stringify(this.unidadMedidaProducto));
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
               this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, form).pipe(
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
