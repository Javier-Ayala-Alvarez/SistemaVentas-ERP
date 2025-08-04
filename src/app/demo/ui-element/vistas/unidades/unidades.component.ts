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
  unidades: UnidadMedidaClass[] = [];

  // Filtros individuales
  filtroCodigo: string = '';
  filtroNombre: string = '';
  filtroFactor: string = '';
  filtroAbreviatura: string = '';

  // Paginación y orden
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  totalPages: any[] = [];

  constructor(
    private modalService: NgbModal,
    private unidadesServices: UnidadesServicesService
  ) {}

  ngOnInit(): void {
    this.loadunidades();
  }

  openModal(unidad?: UnidadMedidaClass): void {
    const modalRef = this.modalService.open(AgregarUnidadMedidaComponent, {
      size: 'lg',
      centered: true,
    });

    if (unidad) {
      modalRef.componentInstance.unidad = unidad;
    }

    modalRef.closed.subscribe(() => this.loadunidades());
  }

  editar(unidad: UnidadMedidaClass): void {
    this.openModal(unidad);
  }

  eliminar(unidad: UnidadMedidaClass): void {
    this.unidadesServices.eliminar(unidad.id ?? 0, unidad).subscribe(() => {
      this.loadunidades();
    });
  }

  get busqueda(): string {
    const partes = [];
    if (this.filtroCodigo) partes.push(`codigo:${this.filtroCodigo}`);
    if (this.filtroNombre) partes.push(`nombre:${this.filtroNombre}`);
    if (this.filtroFactor) partes.push(`factor:${this.filtroFactor}`);
 if (this.filtroAbreviatura) partes.push(`abreviatura:${this.filtroAbreviatura}`);
    return partes.join(',');
  }

  loadunidades(): void {
    this.unidadesServices
      .load(this.busqueda, this.page, this.size, this.order, this.asc)
      .subscribe((dato: any) => {
        this.unidades = dato.content;
        this.isFirst = dato.first;
        this.isLast = dato.last;
        this.totalPages = new Array(dato.totalPages);
      });
  }

  ordenarPor(campo: string): void {
    if (this.order === campo) {
      this.asc = !this.asc;
    } else {
      this.order = campo;
      this.asc = true;
    }
    this.loadunidades();
  }

  paginaSiguiente(): void {
    if (!this.isLast) {
      this.page++;
      this.loadunidades();
    }
  }

  paginaAnterior(): void {
    if (!this.isFirst) {
      this.page--;
      this.loadunidades();
    }
  }
}
