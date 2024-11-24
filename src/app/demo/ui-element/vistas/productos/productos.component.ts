import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export default class ProductosComponent {
  constructor(private router: Router) { }

  AgregarNuevo(){
   this.router.navigate(['/component/AgregarProducto']);
  }
}
