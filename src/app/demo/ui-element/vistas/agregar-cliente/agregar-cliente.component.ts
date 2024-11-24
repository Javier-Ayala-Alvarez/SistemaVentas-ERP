import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrl: './agregar-cliente.component.scss'
})
export class AgregarClienteComponent {
  constructor(public activeModal: NgbActiveModal) {}

}
