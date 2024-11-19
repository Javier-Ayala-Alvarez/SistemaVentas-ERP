import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agregar-gastos',
  standalone: true,
  imports: [],
  templateUrl: './agregar-gastos.component.html',
  styleUrl: './agregar-gastos.component.scss'
})
export class AgregarGastosComponent {
  constructor(public activeModal: NgbActiveModal) {}

}
