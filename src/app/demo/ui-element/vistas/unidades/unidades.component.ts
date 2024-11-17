import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarUnidadMedidaComponent } from '../agregar-unidad-medida/agregar-unidad-medida.component';

@Component({
  selector: 'app-unidades',
  standalone: true,
  imports: [],
  templateUrl: './unidades.component.html',
  styleUrl: './unidades.component.scss'
})
export default class UnidadesComponent {
  constructor(private modalService: NgbModal) {}

  openModalAgregar (){
    const modalRef = this.modalService.open(AgregarUnidadMedidaComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  }
}
