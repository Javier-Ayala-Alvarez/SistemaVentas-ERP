import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServicesService } from './login-services.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private loginService: LoginServicesService, private router: Router) {}
canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean {

  const allowedRoles: string[] = route.data['roles'];  // Usa 'roles' aquí
  const userRole = this.loginService.getUserRole();


  if (!allowedRoles || !userRole) {
    this.router.navigate(['/unauthorized']);
    return false;
  }

  if (allowedRoles.includes(userRole)) {
    return true;
  }

  this.router.navigate(['/unauthorized']);
  return false;
}

}
