import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './helper';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { OperacionDetalleClass } from '../clases/operacionDetalle';
import { catchError, finalize, map, Observable, of, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { OperacionClass } from '../clases/operaciones-class';
import { FormaPagoOperacion } from '../clases/FormaPagoOperacion';

@Injectable({
  providedIn: 'root'
})
export class OperacionServicesService {
  private apiUrl = `${baseUrl}/Api/operacion`; // Cambia la URL según sea necesario
  operacionDetalle: OperacionDetalleClass[] = [];
  operacion: OperacionClass = new OperacionClass();
  formaPagoOperacion: FormaPagoOperacion[] = [];
  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }



  public ensureShape(op?: OperacionClass): OperacionClass {
    const o = op ?? new OperacionClass();

    (o as any).vendedor = (o as any).vendedor ?? { id: null, username: '' };
    (o as any).cliente = (o as any).cliente ?? { id: null };
    (o as any).sucursal = (o as any).sucursal ?? { id: null };
    (o as any).caja = (o as any).caja ?? { id: null };
    (o as any).total = (o as any).total ?? 0;

    (o as any).detalle = (o as any).detalle ?? [];

    return o;
  }


  calcularTotales(): void {
    let subTotal = 0;
    let iva = 0;
    let retencion = 0;
    for (let item of this.operacionDetalle) {

      const precioUnitario = item.precioUnitario || 0;
      const cantidad = item.cantidad || 0;
      const descuento = item.descuento || 0;

      const totalItem = (precioUnitario * cantidad) - descuento;

      // Precio base e IVA incluido
      const precioBase = totalItem / 1.13;
      const ivaItem = totalItem - precioBase;

      subTotal += precioBase;
      iva += ivaItem;
      //retencion += totalItem * 0.01; // sin redondeo
    }

    // Redondeamos solo al final
    this.operacion.subTotal = parseFloat(subTotal.toFixed(2));
    this.operacion.iva = parseFloat(iva.toFixed(2));
    this.operacion.retencion = parseFloat(retencion.toFixed(2));
    this.operacion.total = parseFloat((subTotal + iva - retencion).toFixed(2));

  }





  agregarOperacionDetalle(operacionDetalle: OperacionDetalleClass): void {
    this.operacionDetalle.push({ ...operacionDetalle });
    this.calcularTotales();
  }
  agregarFormaPagoOperacion(formaPago: FormaPagoOperacion): void {
    this.formaPagoOperacion.push({ ...formaPago });
    this.calcularTotalesFormaPago();
  }

  calcularTotalesFormaPago() {

  }
  eliminarFormaPagoOperacion(formaPagoOperacion: FormaPagoOperacion): Observable<any> {
    return new Observable((observer) => {
      Swal.fire({
        title: 'Eliminar la forma de pago',
        text: '¿Estás seguro de que deseas eliminar esta forma de pago?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          // Eliminamos la unidad de medida de la lista
          this.formaPagoOperacion = this.formaPagoOperacion.filter(item =>
            JSON.stringify(item) !== JSON.stringify(formaPagoOperacion)
          );
          this.calcularTotalesFormaPago();
          // Mostramos el mensaje de éxito
          this.mensajeSwal2.mensaje('Eliminada exitosamente', 'La forma de pago se a eliminado con exito.');

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
  limpiarArreglos() {
    this.operacion = new OperacionClass();
    this.operacionDetalle = [];
    this.formaPagoOperacion = [];
  }
  eliminarOperacionDetalle(operacionDetalle: OperacionDetalleClass): Observable<any> {
    return new Observable((observer) => {
      Swal.fire({
        title: 'Eliminar el detalle',
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
  guardarOperacion(): Observable<any> {
    const form = new FormData();
    this.operacion.estado = "A";
    form.append('operacion', JSON.stringify(this.operacion));
    form.append('detalle', JSON.stringify(this.operacionDetalle));
    form.append('formaPagoOperacion', JSON.stringify(this.formaPagoOperacion));
    this.operacion.estado = 'A';
    console.log(this.operacion);
    return this.httpClient.post(`${this.apiUrl}/Guardar`, form).pipe(
      tap((respuesta: any) => {
        if (respuesta?.operacion) {
          this.mensajeSwal2.mensaje('Guardado exitoso', 'La operacion se ha guardado correctamente.');
          this.limpiarArreglos();
        } else {
          this.mensajeSwal2.mensaje('Error', 'Se produjo un error.');
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
    form.append('operacion', JSON.stringify(this.operacion));
    form.append('detalle', JSON.stringify(this.operacionDetalle));
    form.append('formaPagoOperacion', JSON.stringify(this.formaPagoOperacion));

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

  loadInventario(
    terminoBusqueda: string,
    page: number,
    size: number,
    order: string,
    asc: boolean
  ): Observable<any> {



    // Construir la URL con los parámetros validados
    const url = `${this.apiUrl}/ListInventario?busqueda=${terminoBusqueda}&page=${page}&size=${size}&order=${order}&asc=${asc}`;

    return this.httpClient.get(url).pipe(
      catchError(this.mensajeSwal2.handleError)
    );
  }
  loadKardex(
    terminoBusqueda: string,
    page: number,
    size: number,
    order: string,
    asc: boolean
  ): Observable<any> {



    // Construir la URL con los parámetros validados
    const url = `${this.apiUrl}/kardex?busqueda=${terminoBusqueda}&page=${page}&size=${size}&order=${order}&asc=${asc}`;

    return this.httpClient.get(url).pipe(
      catchError(this.mensajeSwal2.handleError)
    );
  }
  loadFac(
    terminoBusqueda: string,
    page: number,
    size: number,
    order: string,
    asc: boolean
  ): Observable<any> {
    // Construir la URL con los parámetros validados
    const url = `${this.apiUrl}/List?busqueda=${terminoBusqueda}&page=${page}&size=${size}&order=${order}&asc=${asc}`;

    return this.httpClient.get(url).pipe(
      catchError(this.mensajeSwal2.handleError)
    );
  }

  loadDetalleFac(idOperacion: number): Observable<any> {
    const url = `${baseUrl}/Api/operacionDetalle/operaciondetalle/${idOperacion}`;
    return this.httpClient.get(url).pipe(

      catchError(this.mensajeSwal2.handleError)
    );
  }

  generarReportePDF(inicio: string, fin: string, caja: string, idSucursal: String) {
    // Solo agregamos parámetros si tienen valor
    let url = `${this.apiUrl}/reporte/pdf?`;

    if (inicio) url += `inicio=${inicio}&`;
    if (fin) url += `fin=${fin}&`;
    if (caja) url += `caja=${caja}&`;
    if (idSucursal) url += `idSucursal=${idSucursal}&`;
    // Quitamos el último &
    url = url.slice(0, -1);

    return this.httpClient.get(url, { responseType: 'blob' }).pipe(
      catchError((error) => {
        catchError(this.mensajeSwal2.handleError)
        // Para que el observable siga siendo consistente
        return throwError(() => error);
      })
    );
  }


}
