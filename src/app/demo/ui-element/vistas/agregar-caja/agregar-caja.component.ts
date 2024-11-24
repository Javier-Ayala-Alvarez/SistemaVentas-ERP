import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agregar-caja',
  templateUrl: './agregar-caja.component.html',
  styleUrl: './agregar-caja.component.scss'
})
export class AgregarCajaComponent {
  constructor(public activeModal: NgbActiveModal) {}

}
