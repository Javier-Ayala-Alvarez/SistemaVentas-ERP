import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forma-de-pago',
  standalone: true,
  imports: [],
  templateUrl: './forma-de-pago.component.html',
  styleUrl: './forma-de-pago.component.scss'
})
export class FormaDePagoComponent {
  constructor(public activeModal: NgbActiveModal) {}

}
