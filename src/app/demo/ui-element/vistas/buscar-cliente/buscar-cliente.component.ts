import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrl: './buscar-cliente.component.scss'
})
export class BuscarClienteComponent {
  constructor(public activeModal: NgbActiveModal) {}

}
