import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { DatePipe } from '@angular/common';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';
import { OperacionServicesService } from '../../services/operacion-services.service';
import { OperacionClass } from '../../clases/operaciones-class';




export interface Producto {
  codigo: string;
  descripcion: string;
  cantidad: number;
  descuento: number;
  valorUnitario: number;
  exento: number;
  iva: number;
  total: number;
}
const MOVIENTO_OPERACION = "null";
@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export default class cotizacionesComponent implements OnInit {

  operacion: OperacionClass = new OperacionClass();

  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  filtroSucursal: any | null = null;
  totalPages: any[] = [];
  sucursales: any[] = [];
  tipoOperaciones: any[] = [];
  selectComboTipoOperacion: any | null = null;

  filtroTerminoBusqueda: string = '';
  filtroFechaInicio: Date = new Date();
  filtroFechaFin: Date = new Date();
  filtroNFactura!: string;
  filtroTipoOperacion!: number;
  operaciones: OperacionClass[] = [];





  constructor(private modalService: NgbModal, private operacionesServices: OperacionServicesService, private sucursalServices: SucursalServicesService, private tipoOperacionServices: TipoOperacionServicesService, private router: Router, private datePipe: DatePipe, private route: ActivatedRoute, // Usamos ActivatedRoute aquí
  ) { }

  ngOnInit(): void {
    this.loadSucursal();
    this.loadCotizaciones();
    this.loadTipoOperacion();

  }

  AgregarNuevo() {
    this.router.navigate(['/component/Nuevacotizacion']);
  }



  //mostrar datos de la sucursal
  loadSucursal() {
    this.sucursalServices.buscar().subscribe(
      (dato: any) => {
        this.sucursales = dato;
        // Si hay una sucursal y una empresa, la seleccionamos en el combo
        //if (this.sucursalNuevo.empresa) {
        //this.sucursalNuevo.empresa = this.empresas?.find(emp => emp.id === this.sucursalNuevo.empresa?.id);
      }
      //}
    );
  }
  get busqueda(): string {
    const partes = [];
    if (this.filtroFechaFin) partes.push(`fechaFin:${this.filtroFechaFin}`);
    if (this.filtroFechaInicio) partes.push(`fechaInicio:${this.filtroFechaInicio}`);
    if (this.filtroNFactura) partes.push(`nFactura:${this.filtroNFactura}`);
    if (this.filtroSucursal) partes.push(`idSucursal:${this.filtroSucursal}`);
    if (this.filtroTerminoBusqueda) partes.push(`nombre:${this.filtroTerminoBusqueda}`);
    if (this.filtroTipoOperacion) partes.push(`idTipoOperacion:${this.filtroTipoOperacion}`);
    partes.push(`movimiento:${MOVIENTO_OPERACION}`)

    return partes.join(',');
  }
  //mostrar datos en la tabla
  loadCotizaciones() {

    this.operacionesServices.loadFac(this.busqueda, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.operaciones = dato.content; // <-- esto es lo correcto
        console.log("estas son las cotizaciones: ", this.operaciones);

        this.isFirst = dato.first;
        this.isLast = dato.last;
        this.totalPages = new Array(dato.totalPages);
      }
    );
  }


  loadTipoOperacion() {
    this.tipoOperacionServices.buscarTipoOperacion(MOVIENTO_OPERACION).subscribe(
      (dato: any) => {
        this.tipoOperaciones = dato;
        if (this.operacion.tipoOperacion) {
          this.operacion.tipoOperacion = this.tipoOperaciones?.find(emp => emp.id === this.operacion.tipoOperacion?.id);
        }
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
