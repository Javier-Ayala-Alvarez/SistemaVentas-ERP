import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agregar-sucursal',
  standalone: true,
  imports: [],
  templateUrl: './agregar-sucursal.component.html',
  styleUrl: './agregar-sucursal.component.scss'
})
export class AgregarSucursalComponent {
  constructor(public activeModal: NgbActiveModal) {}

}
