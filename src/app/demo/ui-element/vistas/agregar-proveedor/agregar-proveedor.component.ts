import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrl: './agregar-proveedor.component.scss'
})
export class AgregarProveedorComponent {
  constructor(public activeModal: NgbActiveModal) {}

}
