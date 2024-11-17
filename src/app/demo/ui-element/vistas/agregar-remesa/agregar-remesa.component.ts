import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-agregar-remesa',
  standalone: true,
  imports: [],
  templateUrl: './agregar-remesa.component.html',
  styleUrl: './agregar-remesa.component.scss'
})
export  class AgregarRemesaComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
