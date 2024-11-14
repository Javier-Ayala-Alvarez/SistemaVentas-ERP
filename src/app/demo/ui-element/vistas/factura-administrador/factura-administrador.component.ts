import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-factura-administrador',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './factura-administrador.component.html',
  styleUrl: './factura-administrador.component.scss'
})
export default class FacturaAdministradorComponent {

}
