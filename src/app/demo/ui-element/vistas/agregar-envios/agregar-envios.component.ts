import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';
import { OperacionDetalleClass } from '../../clases/operacionDetalle';
import { OperacionClass } from '../../clases/operaciones-class';
import { DepartamentosServicesService } from '../../services/departamentos-services.service';
import { DistritosServicesService } from '../../services/distritos-services.service';
import { MunicipioServicesService } from '../../services/municipio-services.service';
import { OperacionServicesService } from '../../services/operacion-services.service';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';
import { BuscarProductoComponent } from '../buscar-producto/buscar-producto.component';

@Component({
  selector: 'app-agregar-envios',
  templateUrl: './agregar-envios.component.html',
  styleUrl: './agregar-envios.component.scss'
})
export class AgregarEnviosComponent {
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
    this.tipoOperacionServices.buscarTipoOperacion("SE").subscribe(
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


  openModalProducto() {
    const modalRef = this.modalService.open(BuscarProductoComponent, {
      size: 'xl',
      centered: true
    });
    modalRef.componentInstance.identificador = "envio";
  }


  // ===============================
  //   VALIDACIÓN PREVIA + TOASTS
  // ===============================
  preGuardar(form: NgForm) {
    this.intentoGuardar = true;
    form.form.markAllAsTouched();

    // Checks de negocio / modelo
    const sinProductos = !this.operacionDetalle || this.operacionDetalle.length === 0;
    const fechaVencimientoInvalida = !this.operacion.fechaVencimiento;
    const descripcionInvalida = !this.operacion.descripcion || this.operacion.descripcion.trim() === '';

    // Limpiar toasts previos y armar mensajes
    this.toasts = [];
    let id = Date.now();

    // Controles del formulario (selects con #refs en el template)
    const controls = (form.controls ?? {}) as any;
    if (controls['tipoOperacion']?.invalid) this.pushToast(id++, 'Seleccionar Tipo de Operación');
    if (fechaVencimientoInvalida) this.pushToast(id++, 'Indicar Fecha de Vencimiento');
    if (descripcionInvalida) this.pushToast(id++, 'Ingresar Descripción');
    if (sinProductos) this.pushToast(id++, 'Agregar al menos un producto');

    const anyInvalid =
      form.invalid ||
      sinProductos ||
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
        this.router.navigate(['/component/NuevoEnvio']);
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

