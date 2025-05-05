import { Component, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
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
  selectComboSucursal: any | null= null;
  totalPages: any[] = [];
  sucursales: any[]= [];
  tipoOperaciones: any[]= [];
  selectComboTipoOperacion: any | null= null;

  terminoBusqueda: string = '';
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  nFactura!: string ; 
  tipoOperacion! : number; 
  sucursal! : number;
  operaciones: OperacionClass[] = [] ;

 



constructor(private modalService: NgbModal,  private operacionesServices: OperacionServicesService, private sucursalServices: SucursalServicesService, private tipoOperacionServices: TipoOperacionServicesService, private router: Router, private datePipe: DatePipe, private route: ActivatedRoute, // Usamos ActivatedRoute aquí
) {}

ngOnInit(): void {
  this.loadSucursal();
  this.loadCotizaciones();
  this.loadTipoOperacion();

}

AgregarNuevo(){
  console.log("Prueba");
 this.router.navigate(['/component/Nuevacotizacion']);
}
  


 //mostrar datos de la sucursal
loadSucursal() {
this.sucursalServices.buscar().subscribe(
  (dato: any) => {
    console.log("Sucursales recibidas:", dato); // Verifica los datos en la consola
    this.sucursales = dato;
    console.log("sucursal: ", dato[0].nombre);
    // Si hay una sucursal y una empresa, la seleccionamos en el combo
    //if (this.sucursalNuevo.empresa) {
      //this.sucursalNuevo.empresa = this.empresas?.find(emp => emp.id === this.sucursalNuevo.empresa?.id);
    }
  //}
);
}

//mostrar datos en la tabla
loadCotizaciones() {
  this.fechaInicio = this.fechaInicio || new Date(); // asigna la fecha actual si está vacío
  this.fechaFin = this.fechaFin || new Date(); // asigna la fecha actual si está vacío
  this.operacionesServices.loadFac(this.terminoBusqueda, this.page, this.size, this.order, this.asc,this.fechaInicio, this.fechaFin,  this.nFactura, this.tipoOperacion, this.sucursal).subscribe(
    (dato: any) => {
      this.tipoOperaciones = dato.content;
      this.isFirst = dato.first;
      this.isLast = dato.last;
      this.totalPages = new Array(dato.totalPages);
    }
  );
}

loadTipoOperacion() {
  this.tipoOperacionServices.buscarTipoOperacion("null").subscribe(
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
