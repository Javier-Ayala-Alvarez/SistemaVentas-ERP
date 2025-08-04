import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarProveedorComponent } from '../agregar-proveedor/agregar-proveedor.component';
import { ProveedorClass } from '../../clases/proveedor-class';
import { ProveedoresServicesService } from '../../services/proveedores-services.service';


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export default class ProveedoresComponent {
  filtroCodigo: string = '';
  filtroNombre: string = '';
  filtroDui: string = '';
  filtroNit: string = '';
  filtroTelefono: string = '';
  proveedores: ProveedorClass[] | undefined;
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  terminoBusqueda: string = '';
  totalPages: any[] = [];
  constructor(private modalService: NgbModal, private proveedoresServices: ProveedoresServicesService) { }

  ngOnInit(): void {
    this.loadProveedores();
  }

  openModal(proveedor?: ProveedorClass): void {
    const modalRef = this.modalService.open(AgregarProveedorComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.proveedor = proveedor; // Pasar datos al modal (opcional)
  }

  agregar(): void {
    this.openModal();
  }

  editar(proveedor: ProveedorClass): void {
    this.openModal(proveedor);
  }
  eliminar(proveedor: ProveedorClass): void {
    this.proveedoresServices.eliminar(proveedor.id ?? 0, proveedor).subscribe(
      () => {
        this.loadProveedores();
      },
    );

  }

  //mostrar datos en la tabla
  loadProveedores() {
    this.proveedoresServices.load(this.busqueda, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.proveedores = dato.content;
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

  get busqueda(): string {
    const partes = [];
    if (this.filtroCodigo) partes.push(`codigo:${this.filtroCodigo}`);
    if (this.filtroNombre) partes.push(`nombre:${this.filtroNombre}`);
    if (this.filtroDui) partes.push(`dui:${this.filtroDui}`);
    if (this.filtroNit) partes.push(`nit:${this.filtroNit}`);
    if (this.filtroTelefono) partes.push(`telefono:${this.filtroTelefono}`);
    return partes.join(',');
  }
ordenarPor(campo: string): void {
    if (this.order === campo) {
      this.asc = !this.asc;
    } else {
      this.order = campo;
      this.asc = true;
    }
    this.loadProveedores();
  }


}
