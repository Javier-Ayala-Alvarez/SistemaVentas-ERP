import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import baserUrl from '../services/helper';
import { SucursalClass } from '../clases/sucursal-class';
import { MensajesSwal2Service } from './mensajes-swal2.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { CategoriaClass } from '../clases/categoria-class';

@Injectable({
  providedIn: 'root'
})
export class CategoriasServicesService {
  private apiUrl = `${baserUrl}/Api/categorias`; // Cambia la URL según sea necesario

  constructor(private httpClient: HttpClient, private mensajeSwal2: MensajesSwal2Service) { }

  // Agrega una nueva categoria
  agregar(categoria: CategoriaClass): Observable<any> {
    categoria.estado = 'A';
    return this.httpClient.post(`${this.apiUrl}/Guardar`, categoria).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','la categoria se ha guardado correctamente.')

      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  
  }

  // Modifica Categoria
  modificar(id: number, categoria: CategoriaClass): Observable<any> {
    categoria.estado = 'A';
    return this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, categoria).pipe(
      tap(() => {
        this.mensajeSwal2.mensaje('Guardado exitoso','La categoria se ha modificado correctamente.')
      }),
      catchError(this.mensajeSwal2.handleError) 
    );
  }

  // Eliminar categoria
eliminar(id: number, categoria: CategoriaClass): void {
  Swal.fire({
    title: 'Eliminar Categoria',
    text: '¿Estás seguro de que deseas eliminar esta Categoria?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      
      categoria.estado = 'N';
      this.httpClient.put(`${this.apiUrl}/Actualizar/${id}`, categoria).pipe(
        tap(() => {
          this.mensajeSwal2.mensaje('Eliminada exitoso', 'La Categoria se ha modificado correctamente.');
        }),
        catchError((error) => {
          this.mensajeSwal2.handleError(error);
          return throwError(error); 
        })
      ).subscribe(); 
    }
  });
}

// Muestra la lista de categorias
load(search: string, page: number, size: number, order: string, asc: boolean): Observable<any> {
  return this.httpClient.get(`${this.apiUrl}/List?busqueda=${search}&page=${page}&size=${size}&order=${order}&asc=${asc}`).pipe(
    catchError(this.mensajeSwal2.handleError) 
  );
}




}