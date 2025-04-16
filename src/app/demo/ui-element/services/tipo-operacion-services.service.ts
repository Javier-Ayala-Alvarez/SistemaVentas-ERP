import { Injectable } from '@angular/core';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import Swal from 'sweetalert2';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {loadConfig, baseUrl, imagenes} from '../services/helper';






@Injectable({
  providedIn: 'root'
})
export class TipoOperacionServicesService {
  private apiUrl = `${baseUrl}/Api/TipoOperacion`; // Cambia la URL según sea necesario


  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

  buscarTipoOperacion(movimiento: string): Observable<any[]> {
    return this.httpClient.get<any>(`${this.apiUrl}/ListCombo?movimiento=${movimiento}`).pipe(
        catchError(this.mensajeSwal2.handleError) 
    );
  }

  // Muestra la lista de las cajas
load(selectComboTipoOperacion: number, page: number, size: number, order: string, asc: boolean): Observable<any> {
  return this.httpClient.get(`${this.apiUrl}/List?busqueda=${selectComboTipoOperacion}&page=${page}&size=${size}&order=${order}&asc=${asc}`).pipe(
    catchError(this.mensajeSwal2.handleError) 
  );
}



}
