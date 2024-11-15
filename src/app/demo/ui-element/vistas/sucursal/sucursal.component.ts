import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarSucursalComponent } from '../agregar-sucursal/agregar-sucursal.component';

@Component({
  selector: 'app-sucursal',
  standalone: true,
  imports: [],
  templateUrl: './sucursal.component.html',
  styleUrl: './sucursal.component.scss'
})
export default class SucursalComponent {
  constructor(private modalService: NgbModal) {}

  openModalAgregar (){
    const modalRef = this.modalService.open(AgregarSucursalComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  }
}
