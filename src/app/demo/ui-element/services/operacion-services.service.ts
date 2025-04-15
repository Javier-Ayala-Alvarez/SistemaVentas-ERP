import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './helper';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { OperacionDetalleClass } from '../clases/operacionDetalle';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { OperacionClass } from '../clases/operaciones-class';

@Injectable({
  providedIn: 'root'
})
export class OperacionServicesService {
  private apiUrl = `${baseUrl}/Api/operacion`; // Cambia la URL según sea necesario
  operacionDetalle: OperacionDetalleClass[] =[];
  operacion: OperacionClass = new OperacionClass();
  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

  calcularTotales(): void {
    let subTotal = 0;
    let iva = 0;
    let retencion = 0;
  
    for (let item of this.operacionDetalle) {
      const precioUnitario = item.precioUnitario || 0;
      const cantidad = item.cantidad || 0;
      const descuento = item.descuento || 0;
  
      const totalItem = (precioUnitario * cantidad) - descuento;
      const ivaItem = totalItem * 0.13; // IVA del 13%
      const retencionItem = totalItem * 0.01; // Retención del 1%
  
      subTotal += totalItem;
      iva += ivaItem;
      retencion += retencionItem;
    }
  
    this.operacion.subTotal = subTotal;
    this.operacion.iva = iva;
    this.operacion.retencion = retencion;
    this.operacion.total = subTotal + iva - retencion;
  }
  


  agregarOperacionDetalle(operacionDetalle: OperacionDetalleClass): void{
    this.operacionDetalle.push({...operacionDetalle});
    this.calcularTotales();
  }

    eliminarOperacionDetalle(operacionDetalle: OperacionDetalleClass): Observable<any> {
      return new Observable((observer) => {
        Swal.fire({
          title: 'Eliminar la Unidad de medida',
          text: '¿Estás seguro de que deseas eliminar este detalle?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar'
        }).then((resultado) => {
          if (resultado.isConfirmed) {
            // Eliminamos la unidad de medida de la lista
            this.operacionDetalle = this.operacionDetalle.filter(item =>
              JSON.stringify(item) !== JSON.stringify(operacionDetalle)
            );
            this.calcularTotales();
            // Mostramos el mensaje de éxito
            this.mensajeSwal2.mensaje('Eliminada exitosamente', 'El detalle se a eliminado con exito.');
    
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
  agregar(operacion: OperacionClass, formData: FormData): Observable<any> {
    const form = new FormData();
    form.append('producto', JSON.stringify(operacion));
    form.append('imagen', formData.get('imagen') as Blob);
    form.append('detalle', JSON.stringify(this.operacionDetalle));
    operacion.estado = 'A';
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
    return this.httpClient.get<any>(`${this.apiUrl}/ListOperacionDetalle/${idProducto}`).pipe(
      tap(dato => {
        this.operacionDetalle = dato; // Ahora se asigna correctamente
      }),
      catchError(error => {
        this.mensajeSwal2.handleError(error);
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }

   // Eliminar el producto
    eliminar(id: number, operacion: OperacionClass): Observable<any> {
      const form = new FormData();
      form.append('producto', JSON.stringify(operacion));
      form.append('detalle', JSON.stringify(this.operacionDetalle));
      return new Observable(observer => {
        Swal.fire({
          title: 'Eliminar Operacion',
          text: '¿Estás seguro de que deseas eliminar esta Operacion?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar'
        }).then((resultado) => {
          if (resultado.isConfirmed) {
            operacion.estado = 'N'; // Marca el productp como eliminado
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

}
