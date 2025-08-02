import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { baseUrl } from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {
  

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //generar token
  public generateToken(loginData: any) {
    console.log(loginData);
    const respuesta = this.http.post(`${baseUrl}/generate-token`, loginData);
    console.log(respuesta);
    return respuesta;
  }
  

   public getCurrentUser(){
    return this.http.get(`${baseUrl}/actual-usuario`);
  }

  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //cerrar sesion elimnar token
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    // Eliminar el token de acceso del localStorage o la cookie
    localStorage.removeItem('accessToken');
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

 public getUserRole(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.role || null;
  } catch (e) {
    console.error("Error al decodificar el token", e);
    return null;
  }
}

  

}
