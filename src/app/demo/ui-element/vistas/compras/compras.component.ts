import { Component } from '@angular/core';
import { SucursalClass } from '../../clases/sucursal-class';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';

import { Router } from '@angular/router';

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
    filtroTerminoBusqueda: any | null= null;
    totalPages: any[] = [];
    sucursales: any[]= [];
    tipoOperaciones: any[]= [];
    selectComboTipoOperacion: any | null= null;
 filtroFechaInicio: Date = new Date();
  filtroFechaFin: Date = new Date();
  filtroNFactura!: string ; 
  filtroTipoOperacion! : number; 
  filtroSucursal! : number;


  constructor(private router: Router, private sucursalServices: SucursalServicesService, private tipoOperacionServices : TipoOperacionServicesService) { }

  ngOnInit(): void {
    this.loadSucursal();
    this.loadTipoOperacion();
  }

  AgregarNuevo(){
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
  this.tipoOperacionServices.buscarTipoOperacion("S").subscribe(
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

    return partes.join(',');
  }
  loadCompras(){
    
  }
}
