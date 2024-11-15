import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buscar-producto',
  standalone: true,
  imports: [],
  templateUrl: './buscar-producto.component.html',
  styleUrl: './buscar-producto.component.scss'
})
export class BuscarProductoComponent {
  constructor(public activeModal: NgbActiveModal) {}

}
