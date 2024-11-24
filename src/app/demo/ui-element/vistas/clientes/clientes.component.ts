import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export default class ClientesComponent {
  constructor(private modalService: NgbModal) {}

  openModalAgregar (){
    const modalRef = this.modalService.open(AgregarClienteComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  }
}
