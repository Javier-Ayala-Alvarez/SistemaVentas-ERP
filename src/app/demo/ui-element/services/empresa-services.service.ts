import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import baserUrl from '../services/helper';
import { MensajesSwal2Service } from './mensajes-swal2.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaServicesService {

  private apiUrl = `${baserUrl}/Api/Empresa`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

  buscar(): Observable<any[]> {
    return this.httpClient.get<any>(`${this.apiUrl}/List`).pipe(
        catchError(this.mensajeSwal2.handleError) 
    );
  }
}
