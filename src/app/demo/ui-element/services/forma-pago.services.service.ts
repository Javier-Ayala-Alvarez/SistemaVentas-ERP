import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { baseUrl } from './helper';
import { MensajesSwal2Service } from './mensajes-swal2.service';

@Injectable({
  providedIn: 'root'
})
export class FormaPagoServicesService {

  private apiUrl = `${baseUrl}/Api/formaPagos`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

  
      // Muestra la lista de sucursales
      listaFormaPago(): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/ListFormaPago`).pipe(
          catchError(this.mensajeSwal2.handleError) 
        );
      }
}
