import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { baseUrl, imagenes } from 'src/app/config/config';
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
  eliminarUnidadMedida(unidadMedidaProducto: UnidadMedidaProductoClass): Observable<any> {
    return new Observable((observer) => {
      Swal.fire({
        title: 'Eliminar la Unidad de medida',
        text: '¿Estás seguro de que deseas eliminar la unidad de medida?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          // Eliminamos la unidad de medida de la lista
          this.unidadMedidaProducto = this.unidadMedidaProducto.filter(item =>
            JSON.stringify(item) !== JSON.stringify(unidadMedidaProducto)
          );
          // Mostramos el mensaje de éxito
          this.mensajeSwal2.mensaje('Eliminada exitosamente', 'La unidad de medida se ha eliminado correctamente.');
  
          // Emitimos el valor verdadero indicando que la operación fue exitosa
          observer.next(true);
        } else {
          // Si el usuario no confirma, no se hace nada, pero emitimos false
          observer.next(false);
        }
  
        // Completamos el Observable
        observer.complete();
      });
    });
  }
  


  // Agrega un nuevo producto
  agregar(producto: ProductoClass, formData: FormData): Observable<any> {
    producto.estado = "A";
    const form = new FormData();
    form.append('producto', JSON.stringify(producto));
    form.append('imagen', formData.get('imagen') as Blob);
    form.append('unidades', JSON.stringify(this.unidadMedidaProducto));

    producto.estado = 'A';
    return this.httpClient.post(`${this.apiUrl}/Guardar`, form).pipe(
      tap((respuesta: any) => {
        if (respuesta?.producto?.id) {
          this.mensajeSwal2.mensaje('Guardado exitoso', 'El producto se ha guardado correctamente.');
        } else {
          this.mensajeSwal2.mensaje('Error', 'No se pudo obtener el ID del producto.');
        }
      }),
      catchError(this.mensajeSwal2.handleError)
    );
  }

  listaUnidadProducto(idProducto: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/ListUnidadProducto/${idProducto}`).pipe(
      tap(dato => {
        this.unidadMedidaProducto = dato; // Ahora se asigna correctamente
      }),
      catchError(error => {
        this.mensajeSwal2.handleError(error);
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }


     // Muestra la lista de sucursales
     listaUnidadProductoList(idProducto: number): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}/ListUnidadProducto/${idProducto}`).pipe(
        catchError(this.mensajeSwal2.handleError) 
      );
    }





  // Modifica Producto
  modificar(id: number, producto: ProductoClass, formData: FormData): Observable<any> {
    const form = new FormData();
    form.append('producto', JSON.stringify(producto));
    form.append('imagen', formData.get('imagen') as Blob);
    form.append('unidades', JSON.stringify(this.unidadMedidaProducto));
    producto.estado = 'A';
    return this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, form).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso', 'El producto se ha modificado correctamente.')
      }),
      catchError(this.mensajeSwal2.handleError)
    );
  }

  // Eliminar el producto
  eliminar(id: number, producto: ProductoClass): Observable<any> {
    const form = new FormData();
    producto.estado = 'N'; // Marca el productp como eliminado
    form.append('producto', JSON.stringify(producto));
    form.append('unidades', JSON.stringify(this.unidadMedidaProducto));
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

  productoLoad(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/producto/${id}`).pipe(
      catchError(this.mensajeSwal2.handleError)
    );
  }



}
