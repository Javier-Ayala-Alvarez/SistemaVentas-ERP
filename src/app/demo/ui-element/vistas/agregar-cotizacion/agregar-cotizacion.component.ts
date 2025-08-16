import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionClass } from '../../clases/operaciones-class';
import { DepartamentosServicesService } from '../../services/departamentos-services.service';
import { DistritosServicesService } from '../../services/distritos-services.service';
import { MunicipioServicesService } from '../../services/municipio-services.service';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';
import { BuscarClienteComponent } from '../buscar-cliente/buscar-cliente.component';
import { BuscarProductoComponent } from '../buscar-producto/buscar-producto.component';
import { FormaDePagoComponent } from '../forma-de-pago/forma-de-pago.component';
import { OperacionDetalleClass } from '../../clases/operacionDetalle';
import { OperacionServicesService } from '../../services/operacion-services.service';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-cotizacion',
  templateUrl: './agregar-cotizacion.component.html',
  styleUrl: './agregar-cotizacion.component.scss'
})
export class AgregarCotizacionComponent {
  operacion: OperacionClass = new OperacionClass();
   operacionDetalle: OperacionDetalleClass [] = [];
      sucursales: any[]= [];
      tipoOperaciones: any[]= [];
      departamentos: any[]= [];
      municipios: any[]= [];
      distritos: any[]= [];
      subtotal = 0;
      iva = 0;
      retencion = 0;
      totalVenta = 0;
      
      previousUrl: string = '';
      currentUrl: string = '';


  ngOnInit(): void {
    this.loadDepartamento();
    this.loadMunicipio();
    this.loadDistrito();
    this.loadSucursal();
    this.limpiarArreglo();
    this.operacionDetalle = this.operacionServices.operacionDetalle;
    this.operacion = this.operacionServices.operacion;



  }
   constructor(private modalService: NgbModal,private operacionServices: OperacionServicesService, private sucursalServices: SucursalServicesService,private tipoOperacionServices: TipoOperacionServicesService, private distritoServices: DistritosServicesService, private municipioServices: MunicipioServicesService, private departamentoServices: DepartamentosServicesService,  private router: Router, private datePipe: DatePipe, private route: ActivatedRoute, // Usamos ActivatedRoute aquí
    ) { 

    }
    limpiarArreglo() {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: any) => {
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.urlAfterRedirects;
  
          if (this.previousUrl && this.previousUrl !== this.currentUrl) {
            this.operacionServices.limpiarArreglos()
          }
        });
  
    }
    eliminarDetalle(detalle: OperacionDetalleClass): void {
      this.operacionServices.eliminarOperacionDetalle(detalle).subscribe(()=>{
        this.operacionDetalle = this.operacionServices.operacionDetalle;
      });
  }

  loadDepartamento(){
    this.departamentoServices.buscar().subscribe(
      (dato: any) => {
        this.departamentos = dato;
        if (this.operacion.departamento) {
          this.operacion.departamento = this.departamentos?.find(emp => emp.id === this.operacion.departamento?.id);
        }
      }

    );
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
  loadMunicipio(){
    this.municipioServices.buscar().subscribe(
      (dato: any) => {
        this.municipios = dato;
        if (this.operacion.municipio) {
          this.operacion.municipio = this.municipios?.find(emp => emp.id === this.operacion.municipio?.id);
        }
      }

    );

  }
  loadDistrito(){
    this.distritoServices.buscar().subscribe(
      (dato: any) => {
        this.distritos = dato;
        if (this.operacion.distrito) {
          this.operacion.distrito = this.distritos?.find(emp => emp.id === this.operacion.distrito?.id);
        }
      }

    );

  }



  openModalAgregar (){
    const modalRef = this.modalService.open(AgregarClienteComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  }






  openModalCliente() {
    
    const modalRef = this.modalService.open(BuscarClienteComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajustar el tamaño
      centered: true // para centrar el modal
      
    });
    modalRef.componentInstance.identificador = "cotizacion"; // ← acá mandás el parámetro

  }
  openModalProducto() {
    const modalRef = this.modalService.open(BuscarProductoComponent, {
      size: 'xl', // 'sm' | 'lg' | 'xl' para ajustar el tamaño
      centered: true // para centrar el modal
    });
    modalRef.componentInstance.identificador = "cotizacion"; // ← acá mandás el parámetro

    
  }

  openModalFormaPago(){
    const modalRef = this.modalService.open(FormaDePagoComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  modalRef.componentInstance.identificador = "cotizacion"; // ← acá mandás el parámetro
  modalRef.componentInstance.totalVenta = this.operacion.total; // ← acá mandás el parámetro

  }

  guardarCotizacion(){
  // ✅ Validación de Cliente
      if (!this.operacion.cliente || !this.operacion.cliente.id) {
        Swal.fire({
          icon: 'warning',
          title: 'Cliente no seleccionado',
          text: 'Debe seleccionar un cliente antes de continuar.',
        });
        return;
      }
  
      // ✅ Validación de Productos agregados
      if (!this.operacionDetalle || this.operacionDetalle.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Sin productos',
          text: 'Debe agregar al menos un producto antes de continuar.',
        });
        return;
      }

        // ✅ Validar Fecha de Vencimiento
  if (!this.operacion.fechaVencimiento) {
    Swal.fire({
      icon: 'warning',
      title: 'Fecha de vencimiento requerida',
      text: 'Debe seleccionar una fecha de vencimiento.',
    });
    return;
  }

  // ✅ Validar Descripción
  if (!this.operacion.descripcion || this.operacion.descripcion.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Descripción requerida',
      text: 'Debe ingresar una descripción.',
    });
    return;
  }

  // ✅ Validar Departamento
  if (!this.operacion.departamento) {
    Swal.fire({
      icon: 'warning',
      title: 'Departamento no seleccionado',
      text: 'Debe seleccionar un departamento.',
    });
    return;
  }

  // ✅ Validar Municipio
  if (!this.operacion.municipio) {
    Swal.fire({
      icon: 'warning',
      title: 'Municipio no seleccionado',
      text: 'Debe seleccionar un municipio.',
    });
    return;
  }

  // ✅ Validar Distrito
  if (!this.operacion.distrito) {
    Swal.fire({
      icon: 'warning',
      title: 'Distrito no seleccionado',
      text: 'Debe seleccionar un distrito.',
    });
    return;
  }

  // ✅ Validar Sucursal
  if (!this.operacion.sucursal) {
    Swal.fire({
      icon: 'warning',
      title: 'Sucursal no seleccionada',
      text: 'Debe seleccionar una sucursal.',
    });
    return;
  }
  
      // ✅ Si todas las validaciones pasan, abrir modal de forma de pago
      //this.openModalFormaPago();

      this.registrarCotizacion();


    }


    registrarCotizacion() {
        this.operacion.fechaVencimiento = this.operacion.fechaVencimiento;


      this.operacionServices.guardarOperacion().subscribe((dato: any) => {
      //this.formaPagoOperacionList = this.operacion.formaPagoOperacion;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/component/Nuevacotizacion']);
        });
      });
    }
}
