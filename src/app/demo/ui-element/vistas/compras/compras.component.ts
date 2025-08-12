import { Component } from '@angular/core';
import { SucursalClass } from '../../clases/sucursal-class';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';

import { Router } from '@angular/router';
import { OperacionClass } from '../../clases/operaciones-class';
import { OperacionServicesService } from '../../services/operacion-services.service';

const MOVIENTO_OPERACION = "S"

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.scss'
})
export default class ComprasComponent {

  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  filtroTerminoBusqueda: any | null = null;
  totalPages: any[] = [];
  sucursales: any[] = [];
  tipoOperaciones: any[] = [];
  selectComboTipoOperacion: any | null = null;
  filtroFechaInicio: Date = new Date();
  filtroFechaFin: Date = new Date();
  filtroNFactura!: string;
  filtroTipoOperacion!: number;
  filtroSucursal!: number;
  operaciones: OperacionClass[] = [];



  constructor(private router: Router, private operacionesServices: OperacionServicesService, private sucursalServices: SucursalServicesService, private tipoOperacionServices: TipoOperacionServicesService) { }

  ngOnInit(): void {
    this.loadSucursal();
    this.loadTipoOperacion();
    this.loadCompras();
  }

  AgregarNuevo() {
    this.router.navigate(['/component/Nuevacompras']);
  }


  //mostrar datos de la sucursal
  loadSucursal() {
    this.sucursalServices.buscar().subscribe(
      (dato: any) => {
        this.sucursales = dato;
      }
    );
  }

  loadTipoOperacion() {
    this.tipoOperacionServices.buscarTipoOperacion(MOVIENTO_OPERACION).subscribe(
      (dato: any) => {
        this.tipoOperaciones = dato;
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
  loadCompras() {
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
}
