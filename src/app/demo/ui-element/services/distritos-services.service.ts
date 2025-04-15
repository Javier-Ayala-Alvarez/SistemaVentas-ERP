import { Injectable } from '@angular/core';
import { baseUrl } from './helper';
import { HttpClient } from '@angular/common/http';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistritosServicesService {

  private apiUrl = `${baseUrl}/Api/distritos`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

  buscar(): Observable<any[]> {
    return this.httpClient.get<any>(`${this.apiUrl}/List`).pipe(
        catchError(this.mensajeSwal2.handleError) 
    );
  }
}
