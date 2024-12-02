import { Component } from '@angular/core';
import { AgregarRemesaComponent } from '../agregar-remesa/agregar-remesa.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RemesasServicesService } from '../../services/remesas-services.service';
import { RemesaClass } from '../../clases/remesa-class';

@Component({
  selector: 'app-remesas',
  templateUrl: './remesas.component.html',
  styleUrl: './remesas.component.scss'
})
export default class RemesasComponent {
 

  remesas: RemesaClass[] | undefined;
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  terminoBusqueda: string = '';
  totalPages: any[] = [];

  constructor(private modalService: NgbModal, private remesasServices: RemesasServicesService) { }

  ngOnInit(): void {
    this.loadremesas();
  }

  agregar(): void {
    this.openModal();
  }

  openModal(remesa?: RemesaClass): void {
    const modalRef = this.modalService.open(AgregarRemesaComponent, {
      size: 'lg',
      centered: true
    });
    
  }
  
  editar(remesa: RemesaClass): void {
    this.openModal(remesa);
  }
  eliminar(remesa: RemesaClass): void {
    this.remesasServices.eliminar(remesa.id ?? 0, remesa);
    this.loadremesas();
  }

  //mostrar datos en la tabla
  loadremesas() {
    this.remesasServices.load(this.terminoBusqueda, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.remesas = dato.content;
        this.isFirst = dato.first;
        this.isLast = dato.last;
        this.totalPages = new Array(dato.totalPages);
      }
    );
  }


  //Ir a la siguiente pagina
  paginaSiguiente(): void {
    if (!this.isLast) {
      this.page++;
      this.ngOnInit();
    }
  }
  //ir a la pagina anterior
  paginaAnterior(): void {
    if (!this.isFirst) {
      this.page--;
      this.ngOnInit();
    }
  }

}
