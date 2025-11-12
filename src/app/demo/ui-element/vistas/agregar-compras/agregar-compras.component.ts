import { CommonModule, AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { OperacionClass } from '../../clases/operaciones-class';
import { DepartamentosServicesService } from '../../services/departamentos-services.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MunicipioServicesService } from '../../services/municipio-services.service';
import { DistritosServicesService } from '../../services/distritos-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { AgregarProveedorComponent } from '../agregar-proveedor/agregar-proveedor.component';
import { BuscarProveedorComponent } from '../buscar-proveedor/buscar-proveedor.component';
import { BuscarProductoComponent } from '../buscar-producto/buscar-producto.component';
import { FormaDePagoComponent } from '../forma-de-pago/forma-de-pago.component';
import { OperacionDetalleClass } from '../../clases/operacionDetalle';
import { OperacionServicesService } from '../../services/operacion-services.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-agregar-compras',
  templateUrl: './agregar-compras.component.html',
  styleUrl: './agregar-compras.component.scss'
})
export default class AgregarComprasComponent implements OnInit {
  operacion: OperacionClass = new OperacionClass();
  operacionDetalle: OperacionDetalleClass[] = [];

  sucursales: any[] = [];
  tipoOperaciones: any[] = [];
  departamentos: any[] = [];
  municipios: any[] = [];
  distritos: any[] = [];
  clientes: any[] = [];

  subtotal = 0;
  iva = 0;
  retencion = 0;
  totalCompra = 0;
  previousUrl: string = '';
  currentUrl: string = '';

  // --- Validación UX ---
  intentoGuardar = false;

  // --- Toasts individuales ---
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
    this.loadTipoOperacion();
    this.loadSucursal();
    this.limpiarArreglo();
    this.operacionDetalle = this.operacionServices.operacionDetalle;
    this.operacion = this.operacionServices.operacion;

    const hoy = new Date();
    this.operacion.fechaElaboracion = hoy.toISOString().split('T')[0];
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

  loadTipoOperacion() {
    this.tipoOperacionServices.buscarTipoOperacion("E").subscribe(
      (dato: any) => {
        this.tipoOperaciones = dato;
        if (this.operacion.tipoOperacion) {
          this.operacion.tipoOperacion = this.tipoOperaciones?.find(emp => emp.tipoOperacion === this.operacion.tipoOperacion);
        }
      }
    );
  }

  openModalProveedor() {
    const modalRef = this.modalService.open(BuscarProveedorComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.identificador = "compra";
  }

  openModalProducto() {
    const modalRef = this.modalService.open(BuscarProductoComponent, {
      size: 'xl',
      centered: true
    });
    modalRef.componentInstance.identificador = "compra";
  }

  openModalFormaPago() {
    const modalRef = this.modalService.open(FormaDePagoComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.identificador = "compra";
    modalRef.componentInstance.totalVenta = this.operacion.total;
    console.log(this.operacion);
  }

  preGuardar(form: NgForm) {
    this.intentoGuardar = true;
    form.form.markAllAsTouched();

    const sinProductos = !this.operacionDetalle || this.operacionDetalle.length === 0;
    const proveedorInvalido = !this.operacion.proveedor || !this.operacion.proveedor.id;

    // Limpia toasts previos
    this.toasts = [];
    let id = Date.now();

    // Generar toasts según errores
    const controls = (form.controls ?? {}) as any;

    if (proveedorInvalido) this.pushToast(id++, 'Seleccionar o ingresar proveedor');
    if (controls['departamento']?.invalid) this.pushToast(id++, 'Seleccionar Departamento');
    if (controls['municipio']?.invalid) this.pushToast(id++, 'Seleccionar Municipio');
    if (controls['distrito']?.invalid) this.pushToast(id++, 'Seleccionar Distrito');
    if (controls['fechaCompra']?.invalid) this.pushToast(id++, 'Indicar Fecha de Compra');
    if (controls['tipoOperacion']?.invalid) this.pushToast(id++, 'Seleccionar Tipo de Operación');
    if (controls['sucursal']?.invalid) this.pushToast(id++, 'Seleccionar Sucursal');
    if (sinProductos) this.pushToast(id++, 'Agregar al menos un producto');

    const anyInvalid = form.invalid || sinProductos || proveedorInvalido;

    if (anyInvalid) {
      return; // No continuamos, mostramos los toasts
    }

    // OK: continuar con el flujo original
    this.openModalFormaPago();
  }


  // Toast helpers
  pushToast(id: number, message: string) {
    this.toasts.push({ id, message });
    setTimeout(() => this.removeToast(id), 4500);
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
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

// --- Interfaz del toast ---
export interface ToastMsg {
  id: number;
  message: string;
}
