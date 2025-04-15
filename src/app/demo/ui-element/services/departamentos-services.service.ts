import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { baseUrl } from './helper';
import { MensajesSwal2Service } from './mensajes-swal2.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosServicesService {

  private apiUrl = `${baseUrl}/Api/departamentos`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

  buscar(): Observable<any[]> {
    return this.httpClient.get<any>(`${this.apiUrl}/List`).pipe(
        catchError(this.mensajeSwal2.handleError) 
    );
  }
}
