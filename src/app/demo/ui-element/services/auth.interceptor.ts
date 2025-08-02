// auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginServicesService } from './login-services.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private loginService: LoginServicesService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Si tienes un token, lo agregas al header (opcional aquí)
    const token = this.loginService.getToken();
    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el error es 401 (token vencido o inválido)
        if (error.status === 401) {
          // Puedes limpiar el token y redirigir al login
          this.loginService.logout();
          this.router.navigate(['/sign-in']); // Ajusta a tu ruta de login
        }
        return throwError(() => error);
      })
    );
  }
}
