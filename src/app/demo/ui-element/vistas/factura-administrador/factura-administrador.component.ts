import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';
import { OperacionClass } from '../../clases/operaciones-class';
import { OperacionServicesService } from '../../services/operacion-services.service';

const MOVIENTO_OPERACION = "E"
/**
 * @title Basic select with initial value and no form
 */
@Component({
  selector: 'app-factura-administrador',
  templateUrl: './factura-administrador.component.html',
  styleUrl: './factura-administrador.component.scss'
})
export default class FacturaAdministradorComponent {
  operacion: OperacionClass = new OperacionClass();

  page: number = 0;
  size: number = 8;
  order: string = 'fecha_elaboracion';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  filtroTerminoBusqueda: string = '';
  totalPages: any[] = [];
  filtroFechaInicio: Date = new Date();
  filtroFechaFin: Date = new Date();
  filtroNFactura!: string ; 
  filtroTipoOperacion! : number; 
  filtroSucursal! : number;
  operaciones: OperacionClass[] = [] ;


  sucursales: any[] = [];
  tipoOperaciones: any[] = [];



  ngOnInit(): void {
    this.loadTipoOperacion();
    this.loadSucursal();

    this.loadFacturas();
  }
  constructor(private modalService: NgbModal,  private operacionesServices: OperacionServicesService, private sucursalServices: SucursalServicesService, private tipoOperacionServices: TipoOperacionServicesService, private router: Router, private datePipe: DatePipe, private route: ActivatedRoute, // Usamos ActivatedRoute aquí
  ) {

  }


  //mostrar datos de la sucursal
  loadSucursal() {
    this.sucursalServices.buscar().subscribe(
      (dato: any) => {
        this.sucursales = dato;
        if (this.operacion) {
          this.operacion.sucursal = this.sucursales?.find(emp => emp.id === this.operacion.sucursal?.id);
        }
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

   //mostrar datos en la tabla
   loadFacturas() {
       this.operacionesServices.loadFac(this.busqueda, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.operaciones = dato.content;
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
    if (this.filtroFechaFin) partes.push(`fechaFin:${this.filtroFechaFin}`);
    if (this.filtroFechaInicio) partes.push(`fechaInicio:${this.filtroFechaInicio}`);
    if (this.filtroNFactura) partes.push(`nFactura:${this.filtroNFactura}`);
    if (this.filtroSucursal) partes.push(`idSucursal:${this.filtroSucursal}`);
    if (this.filtroTerminoBusqueda) partes.push(`nombre:${this.filtroTerminoBusqueda}`);
    if (this.filtroTipoOperacion) partes.push(`idTipoOperacion:${this.filtroTipoOperacion}`);
partes.push(`movimiento:${MOVIENTO_OPERACION}`)
    return partes.join(',');
  }

}







