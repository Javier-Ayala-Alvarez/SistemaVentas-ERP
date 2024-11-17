import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarCajaComponent } from '../agregar-caja/agregar-caja.component';



@Component({
  selector: 'app-cajas',
  standalone: true,
  imports: [],
  templateUrl: './cajas.component.html',
  styleUrl: './cajas.component.scss'
})
export default class CajasComponent {
  constructor(private modalService: NgbModal) {}

  openModalAgregar (){
    const modalRef = this.modalService.open(AgregarCajaComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  }

}
