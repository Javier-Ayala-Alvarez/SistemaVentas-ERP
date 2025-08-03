
// angular import
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


// project import
import { LoginServicesService } from '../../ui-element/services/login-services.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  loginData = {
    "username": '',
    "password": '',
  }
  constructor(private snack: MatSnackBar, private loginService: LoginServicesService, private router: Router) { }

  ngOnInit(): void {
  }
  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.password.trim() == null) {
      this.snack.open('El nombre de usuario es requerido ', 'Aceptar', { duration: 3000 })
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      this.snack.open('La contraseña es requerida ', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        localStorage.setItem('accessToken', data.token);

        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
            this.router.navigate(['/component/dashboard']);

          //}
        })
      }, (error) => {
        this.snack.open('Detalles inválidos, vuelva a intentar ', 'Aceptar', {
          duration: 3000
        })
      }
    )
  }
}

