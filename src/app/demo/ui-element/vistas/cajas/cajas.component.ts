import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarCajaComponent } from '../agregar-caja/agregar-caja.component';
import { CajasServicesService } from '../../services/cajas-services.service';
import { CajaClass } from '../../clases/caja-class';



@Component({
  selector: 'app-cajas',
  templateUrl: './cajas.component.html',
  styleUrl: './cajas.component.scss'
})
export default class CajasComponent {
  cajas: CajaClass[] | undefined;
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  terminoBusqueda: string = '';
  totalPages: any[] = [];
  constructor(private modalService: NgbModal, private cajasServices: CajasServicesService) { }


  ngOnInit(): void {
    this.loadcajas();
  }

  agregar(): void {
    this.openModal();
  }

  openModal(caja?: CajaClass): void {
    const modalRef = this.modalService.open(AgregarCajaComponent, {
      size: 'lg',
      centered: true
    });
    
  }
  
  editar(gasto: CajaClass): void {
    this.openModal(gasto);
  }
  eliminar(gasto: CajaClass): void {
    this.cajasServices.eliminar(gasto.id ?? 0, gasto);
    this.loadcajas();
  }


  //mostrar datos en la tabla
  loadcajas() {
    this.cajasServices.load(this.terminoBusqueda, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.cajas = dato.content;
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
