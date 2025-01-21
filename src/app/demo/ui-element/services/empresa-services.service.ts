import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import baserUrl from '../services/helper';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { EmpresaClass } from '../clases/empresa-class';

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
  modificar(empresa: EmpresaClass, formData: FormData): Observable<any> {
    // Crear un nuevo FormData y agregar los datos de la empresa
    const form = new FormData();
    form.append('empresa', JSON.stringify(empresa)); // Convertir el objeto empresa en un string JSON
    form.append('logo', formData.get('logo') as Blob); // Suponiendo que 'logo' es el archivo
  
    return this.httpClient.post(`${this.apiUrl}/save`, form).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso', 'La sucursal se ha modificado correctamente.');
      }),
      catchError(this.mensajeSwal2.handleError)
    );
  }
  


}
