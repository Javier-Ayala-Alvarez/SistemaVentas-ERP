import { Component } from '@angular/core';
import { AgregarRemesaComponent } from '../agregar-remesa/agregar-remesa.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remesas',
  standalone: true,
  imports: [],
  templateUrl: './remesas.component.html',
  styleUrl: './remesas.component.scss'
})
export default class RemesasComponent {
  constructor(private modalService: NgbModal) {}

  openModalAgregar (){
    const modalRef = this.modalService.open(AgregarRemesaComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  }
}
