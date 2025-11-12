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

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-agregar-cotizacion',
  templateUrl: './agregar-cotizacion.component.html',
  styleUrl: './agregar-cotizacion.component.scss'
})
export class AgregarCotizacionComponent {
  operacion: OperacionClass = new OperacionClass();
  operacionDetalle: OperacionDetalleClass[] = [];

  sucursales: any[] = [];
  tipoOperaciones: any[] = [];
  departamentos: any[] = [];
  municipios: any[] = [];
  distritos: any[] = [];

  subtotal = 0;
  iva = 0;
  retencion = 0;
  totalVenta = 0;

  previousUrl: string = '';
  currentUrl: string = '';

  // === UX de validación ===
  intentoGuardar = false;

  // === Toasts individuales con autocierre ===
  toasts: ToastMsg[] = [];

  constructor(
    private modalService: NgbModal,
    private operacionServices: OperacionServicesService,
    private sucursalServices: SucursalServicesService,
    private tipoOperacionServices: TipoOperacionServicesService,
    private distritoServices: DistritosServicesService,
    private municipioServices: MunicipioServicesService,
    private departamentoServices: DepartamentosServicesService,
    private router: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const opFromNav = nav?.extras?.state?.['operacion'] as OperacionClass | undefined;
    const opFromHistory = (history.state?.operacion as OperacionClass) || undefined;
    const op = opFromNav ?? opFromHistory;
    if (op) {
      this.loadDetalleFac(op.id ?? 0);

    }


    this.loadDepartamento();
    this.loadMunicipio();
    this.loadDistrito();
    this.loadSucursal();
    this.limpiarArreglo();
    this.loadTipoOperacion();
    this.operacionDetalle = this.operacionServices.operacionDetalle;
    this.operacion = this.operacionServices.operacion;
  }
  loadTipoOperacion() {
    this.tipoOperacionServices.buscarTipoOperacion("null").subscribe(
      (dato: any) => {
        this.tipoOperaciones = dato;
        if (this.operacion.tipoOperacion) {
          this.operacion.tipoOperacion = this.tipoOperaciones?.find(emp => emp.tipoOperacion === this.operacion.tipoOperacion);
        }
      }
    );
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
    this.operacionServices.eliminarOperacionDetalle(detalle).subscribe(() => {
      this.operacionDetalle = this.operacionServices.operacionDetalle;
    });
  }

  loadDepartamento() {
    this.departamentoServices.buscar().subscribe(
      (dato: any) => {
        this.departamentos = dato;
        if (this.operacion.departamento) {
          this.operacion.departamento = this.departamentos?.find(emp => emp.id === this.operacion.departamento?.id);
        }
      }
    );
  }

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

  loadMunicipio() {
    this.municipioServices.buscar().subscribe(
      (dato: any) => {
        this.municipios = dato;
        if (this.operacion.municipio) {
          this.operacion.municipio = this.municipios?.find(emp => emp.id === this.operacion.municipio?.id);
        }
      }
    );
  }

  loadDistrito() {
    this.distritoServices.buscar().subscribe(
      (dato: any) => {
        this.distritos = dato;
        if (this.operacion.distrito) {
          this.operacion.distrito = this.distritos?.find(emp => emp.id === this.operacion.distrito?.id);
        }
      }
    );
  }

  openModalAgregar() {
    const modalRef = this.modalService.open(AgregarClienteComponent, {
      size: 'lg',
      centered: true
    });
  }

  openModalCliente() {
    const modalRef = this.modalService.open(BuscarClienteComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.identificador = "cotizacion";
  }

  openModalProducto() {
    const modalRef = this.modalService.open(BuscarProductoComponent, {
      size: 'xl',
      centered: true
    });
    modalRef.componentInstance.identificador = "cotizacion";
  }

  openModalFormaPago() {
    const modalRef = this.modalService.open(FormaDePagoComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.identificador = "cotizacion";
    modalRef.componentInstance.totalVenta = this.operacion.total;
  }

  // ===============================
  //   VALIDACIÓN PREVIA + TOASTS
  // ===============================
  preGuardar(form: NgForm) {
    this.intentoGuardar = true;
    form.form.markAllAsTouched();

    // Checks de negocio / modelo
    const sinProductos = !this.operacionDetalle || this.operacionDetalle.length === 0;
    const clienteInvalido = !this.operacion.cliente || !this.operacion.cliente.id;
    const fechaVencimientoInvalida = !this.operacion.fechaVencimiento;
    const descripcionInvalida = !this.operacion.descripcion || this.operacion.descripcion.trim() === '';

    // Limpiar toasts previos y armar mensajes
    this.toasts = [];
    let id = Date.now();

    // Controles del formulario (selects con #refs en el template)
    const controls = (form.controls ?? {}) as any;

    if (clienteInvalido) this.pushToast(id++, 'Seleccionar cliente');
    if (controls['departamento']?.invalid) this.pushToast(id++, 'Seleccionar Departamento');
    if (controls['municipio']?.invalid) this.pushToast(id++, 'Seleccionar Municipio');
    if (controls['distrito']?.invalid) this.pushToast(id++, 'Seleccionar Distrito');
    if (controls['sucursal']?.invalid) this.pushToast(id++, 'Seleccionar Sucursal');
    if (controls['tipoOperacion']?.invalid) this.pushToast(id++, 'Seleccionar Tipo de Operación');
    if (fechaVencimientoInvalida) this.pushToast(id++, 'Indicar Fecha de Vencimiento');
    if (descripcionInvalida) this.pushToast(id++, 'Ingresar Descripción');
    if (sinProductos) this.pushToast(id++, 'Agregar al menos un producto');

    const anyInvalid =
      form.invalid ||
      sinProductos ||
      clienteInvalido ||
      fechaVencimientoInvalida ||
      descripcionInvalida;

    if (anyInvalid) {
      return; // mostrar toasts y no continuar
    }

    // OK: continuar con tu lógica original
    this.guardarCotizacion();
  }

  // Helpers de toasts
  pushToast(id: number, message: string) {
    this.toasts.push({ id, message });
    setTimeout(() => this.removeToast(id), 4500);
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  // ===============================
  //     LÓGICA ORIGINAL (Swal)
  // ===============================
  guardarCotizacion() {
    if (!this.operacion.cliente || !this.operacion.cliente.id) {
      Swal.fire({
        icon: 'warning',
        title: 'Cliente no seleccionado',
        text: 'Debe seleccionar un cliente antes de continuar.',
      });
      return;
    }

    if (!this.operacionDetalle || this.operacionDetalle.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin productos',
        text: 'Debe agregar al menos un producto antes de continuar.',
      });
      return;
    }

    if (!this.operacion.fechaVencimiento) {
      Swal.fire({
        icon: 'warning',
        title: 'Fecha de vencimiento requerida',
        text: 'Debe seleccionar una fecha de vencimiento.',
      });
      return;
    }

    if (!this.operacion.descripcion || this.operacion.descripcion.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Descripción requerida',
        text: 'Debe ingresar una descripción.',
      });
      return;
    }

    if (!this.operacion.departamento) {
      Swal.fire({
        icon: 'warning',
        title: 'Departamento no seleccionado',
        text: 'Debe seleccionar un departamento.',
      });
      return;
    }

    if (!this.operacion.municipio) {
      Swal.fire({
        icon: 'warning',
        title: 'Municipio no seleccionado',
        text: 'Debe seleccionar un municipio.',
      });
      return;
    }

    if (!this.operacion.distrito) {
      Swal.fire({
        icon: 'warning',
        title: 'Distrito no seleccionado',
        text: 'Debe seleccionar un distrito.',
      });
      return;
    }

    if (!this.operacion.sucursal) {
      Swal.fire({
        icon: 'warning',
        title: 'Sucursal no seleccionada',
        text: 'Debe seleccionar una sucursal.',
      });
      return;
    }

 

    this.registrarCotizacion();
  }

  registrarCotizacion() {
    this.operacion.fechaVencimiento = this.operacion.fechaVencimiento;
    this.operacionServices.guardarOperacion().subscribe((dato: any) => {
      // this.formaPagoOperacionList = this.operacion.formaPagoOperacion;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/component/Nuevacotizacion']);
      });
    });
  }
  loadDetalleFac(idOperacion: number) {
    this.operacionServices.loadDetalleFac(idOperacion).subscribe((dato: any) => {

      this.operacion = this.operacionServices.ensureShape(dato[0].operacion ?? undefined);
      this.operacionServices.operacionDetalle = dato;
      this.operacionServices.operacion = dato[0].operacion;
      this.operacionServices.operacion.tipoOperacion = dato[0].operacion.tipoOperacion


      this.operacionDetalle = dato
      this.operacion.tipoOperacion = dato[0].operacion.tipoOperacion
      this.loadDepartamento();
      this.loadMunicipio();
      this.loadDistrito();
      this.loadTipoOperacion();
      this.loadSucursal();
      this.limpiarArreglo();
    });
  }
}

// Interfaz para los toasts
export interface ToastMsg {
  id: number;
  message: string;
}
