import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarProveedorComponent } from '../agregar-proveedor/agregar-proveedor.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export default class ProveedoresComponent {
  constructor(private modalService: NgbModal) {}

  openModalAgregar (){
    const modalRef = this.modalService.open(AgregarProveedorComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  }
}
