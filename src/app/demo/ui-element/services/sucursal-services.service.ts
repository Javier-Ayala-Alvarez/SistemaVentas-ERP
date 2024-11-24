import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import baserUrl from '../services/helper';
import { SucursalClass } from '../clases/sucursal-class';
import { MensajesSwal2Service } from './mensajes-swal2.service';

@Injectable({
  providedIn: 'root'
})
export class SucursalServicesService {

  private apiUrl = `${baserUrl}/Api/Sucursal`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

  

  // Agrega una nueva sucursal
  agregar(sucursal: SucursalClass): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/Guardar`, sucursal).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','La sucursal se ha guardado correctamente.')

      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }

  // Modifica la sucursal
  modificar(id: number, sucursal: SucursalClass): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, sucursal).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','La sucursal se ha modificado correctamente.')
      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }

  // Muestra la lista de sucursales
  load(search: string, page: number, size: number, order: string, asc: boolean): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/List?busqueda=${search}&page=${page}&size=${size}&order=${order}&asc=${asc}`).pipe(
      catchError(this.mensajeSwal2.handleError) 
    );
  }

}
