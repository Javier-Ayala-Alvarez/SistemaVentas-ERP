import { Component } from '@angular/core';
import { AgregarGastosComponent} from '../agregar-gastos/agregar-gastos.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.scss'
})
export default class GastosComponent {
  constructor(private modalService: NgbModal) {}

  openModalAgregar (){
    const modalRef = this.modalService.open(AgregarGastosComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  }

}
