import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agregar-unidad-medida',
  templateUrl: './agregar-unidad-medida.component.html',
  styleUrl: './agregar-unidad-medida.component.scss'
})
export class AgregarUnidadMedidaComponent {
  constructor(public activeModal: NgbActiveModal) {}

}
