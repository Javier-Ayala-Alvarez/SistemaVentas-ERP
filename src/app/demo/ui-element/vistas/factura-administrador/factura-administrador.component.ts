import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';
import { OperacionClass } from '../../clases/operaciones-class';
import { OperacionServicesService } from '../../services/operacion-services.service';


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
  terminoBusqueda: string = '';
  totalPages: any[] = [];
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  nFactura!: string ; 
  tipoOperacion! : number; 
  sucursal! : number;
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
        console.log("Sucursales recibidas:", dato[0].nombre); // Verifica los datos en la consola
        this.sucursales = dato;
        if (this.operacion) {
          this.operacion.sucursal = this.sucursales?.find(emp => emp.id === this.operacion.sucursal?.id);
        }
      }
    );
  }


  loadTipoOperacion() {
    this.tipoOperacionServices.buscarTipoOperacion("E").subscribe(
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







