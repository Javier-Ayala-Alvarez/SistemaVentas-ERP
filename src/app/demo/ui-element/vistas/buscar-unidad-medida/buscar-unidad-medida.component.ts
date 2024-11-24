import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buscar-unidad-medida',
  templateUrl: './buscar-unidad-medida.component.html',
  styleUrl: './buscar-unidad-medida.component.scss'
})
export class BuscarUnidadMedidaComponent {
  constructor(public activeModal: NgbActiveModal) {}

}
