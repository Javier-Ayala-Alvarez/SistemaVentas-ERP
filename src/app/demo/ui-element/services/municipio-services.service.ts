import { Injectable } from '@angular/core';
import { baseUrl } from 'src/app/config/config';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipioServicesService {

  private apiUrl = `${baseUrl}/Api/municipios`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

  buscar(): Observable<any[]> {
    return this.httpClient.get<any>(`${this.apiUrl}/List`).pipe(
        catchError(this.mensajeSwal2.handleError) 
    );
  }
}
