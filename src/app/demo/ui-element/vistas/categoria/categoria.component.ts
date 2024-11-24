import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarCategoriaComponent } from '../agregar-categoria/agregar-categoria.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export default class CategoriaComponent {
  constructor(private modalService: NgbModal) {}

  openModalAgregar (){
    const modalRef = this.modalService.open(AgregarCategoriaComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  }
}
