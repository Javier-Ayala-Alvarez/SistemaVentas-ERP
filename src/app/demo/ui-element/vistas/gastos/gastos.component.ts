import { Component } from '@angular/core';
import { AgregarGastosComponent } from '../agregar-gastos/agregar-gastos.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GastoClass } from '../../clases/gasto-class';
import { GastosServicesService } from '../../services/gastos-services.service';
import { CajasServicesService } from '../../services/cajas-services.service';
import { SucursalServicesService } from '../../services/sucursal-services.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.scss'
})
export default class GastosComponent {

  filtroCodigo: string = '';
  filtroNombre: string = '';
  filtroCantidad: string = '';
  filtroTotal: string = '';
  filtroIdSucursal: string = '';
  filtroIdCaja: string = '';

  cajaSelect: any;
  cajas: any[] = [];
  sucursales: any[] = [];
  sucursalSelect: any;

  gastos: GastoClass[] | undefined;
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  terminoBusqueda: string = '';
  totalPages: any[] = [];

  constructor(private modalService: NgbModal, private gastoServices: GastosServicesService, private cajasServices: CajasServicesService, private sucursalServices: SucursalServicesService) { }
  ngOnInit(): void {
    this.loadgastos();
    this.loadSucursal();
    this.loadCajas();
  }



  agregar(): void {
    this.openModal();
  }

  openModal(gasto?: GastoClass): void {
    const modalRef = this.modalService.open(AgregarGastosComponent, {
      size: 'lg',
      centered: true
    });

    //Pasar datos al modal
    if (gasto) {
      modalRef.componentInstance.gasto = gasto;
    }

  }

  editar(gasto: GastoClass): void {
    this.openModal(gasto);
  }
  eliminar(gasto: GastoClass): void {
    this.gastoServices.eliminar(gasto.id ?? 0, gasto).subscribe(

      () => {
        this.loadgastos();
      }
    );
  }



  //mostrar datos en la tabla
  loadgastos() {
    this.gastoServices.load(this.busqueda, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.gastos = dato.content;
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
    if (this.filtroIdSucursal) partes.push(`idSucursal:${this.filtroIdSucursal}`);
    if (this.filtroIdCaja) partes.push(`idCaja:${this.filtroIdCaja}`);
    if (this.filtroNombre) partes.push(`nombre:${this.filtroNombre}`);
    if (this.filtroTotal) partes.push(`total:${this.filtroTotal}`);
    if (this.filtroCantidad) partes.push(`cantidad:${this.filtroCantidad}`);
    return partes.join(',');
  }
  ordenarPor(campo: string): void {
    if (this.order === campo) {
      this.asc = !this.asc;
    } else {
      this.order = campo;
      this.asc = true;
    }
    this.loadgastos();
  }
  loadCajas() {
      this.cajasServices.buscar01().subscribe(
        (dato: any) => {
          this.cajas = dato;
        }

      );
    
  }
  loadSucursal() {
    this.sucursalServices.buscar().subscribe(
      (dato: any) => {
        this.sucursales = dato;
      }
    );
  }
}
