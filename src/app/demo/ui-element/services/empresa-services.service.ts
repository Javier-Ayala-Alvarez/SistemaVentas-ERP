import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import {baseUrl, imagenes} from 'src/app/config/config';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { EmpresaClass } from '../clases/empresa-class';

@Injectable({
  providedIn: 'root'
})
export class EmpresaServicesService {

  private apiUrl = `${baseUrl}/Api/Empresa`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

  buscar(): Observable<any[]> {
    return this.httpClient.get<any>(`${this.apiUrl}/List`).pipe(
        catchError(this.mensajeSwal2.handleError) 
    );
  }
  modificar(empresa: EmpresaClass, formData: FormData): Observable<any> {
    const form = new FormData();
    // Enviar el JSON como un String en lugar de un Blob
    form.append('empresa', JSON.stringify(empresa));  // Cambié de Blob a String
    // Enviar el logo como está
    form.append('logo', formData.get('logo') as Blob);  
    return this.httpClient.post(`${this.apiUrl}/save`, form).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso', 'La sucursal se ha modificado correctamente.');
      }),
      catchError(this.mensajeSwal2.handleError)
    );
  }
  
  
  


}
