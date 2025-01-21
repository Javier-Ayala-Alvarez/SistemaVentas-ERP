import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarUnidadMedidaComponent } from '../agregar-unidad-medida/agregar-unidad-medida.component';
import { UnidadesServicesService } from '../../services/unidades-services.service';
import { UnidadMedidaClass } from '../../clases/unidad-medida-class';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrl: './unidades.component.scss'
})
export default class UnidadesComponent {
  unidades: UnidadMedidaClass[] | undefined;
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  terminoBusqueda: string = '';
  totalPages: any[] = [];
  constructor(private modalService: NgbModal, private unidadesServices: UnidadesServicesService) { }


  ngOnInit(): void {
    this.loadunidades();
  
  }

  agregar(): void {
    this.openModal();
  }


  openModal(unidad? : UnidadMedidaClass): void {
    const modalRef = this.modalService.open(AgregarUnidadMedidaComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  }

  editar(unidad: UnidadMedidaClass): void {
    this.openModal(unidad);
  }
  eliminar(unidad: UnidadMedidaClass): void {
    this.unidadesServices.eliminar(unidad.id ?? 0, unidad);
    this.loadunidades();
  }

   //mostrar datos en la tabla
   loadunidades() {
    this.unidadesServices.load(this.terminoBusqueda, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.unidades = dato.content;
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
