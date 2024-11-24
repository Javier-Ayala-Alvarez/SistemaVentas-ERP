import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuscarUnidadMedidaComponent } from '../buscar-unidad-medida/buscar-unidad-medida.component';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.scss'
})
export default class AgregarProductoComponent {
  constructor(private modalService: NgbModal) {}

  openModalAgregar (){
    const modalRef = this.modalService.open(BuscarUnidadMedidaComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  }
}
