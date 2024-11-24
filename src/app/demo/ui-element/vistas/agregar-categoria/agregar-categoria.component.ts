import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrl: './agregar-categoria.component.scss'
})
export class AgregarCategoriaComponent {
  constructor(public activeModal: NgbActiveModal) {}

}
