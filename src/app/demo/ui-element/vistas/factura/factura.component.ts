import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { BuscarProductoComponent } from '../buscar-producto/buscar-producto.component';
import { BuscarClienteComponent } from '../buscar-cliente/buscar-cliente.component';
import { FormaDePagoComponent } from '../forma-de-pago/forma-de-pago.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { OperacionClass } from '../../clases/operaciones-class';
import { DepartamentosServicesService } from '../../services/departamentos-services.service';
import { DistritosServicesService } from '../../services/distritos-services.service';
import { MunicipioServicesService } from '../../services/municipio-services.service';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';
import { OperacionDetalleClass } from '../../clases/operacionDetalle';
import { OperacionServicesService } from '../../services/operacion-services.service';
import { CajasServicesService } from '../../services/cajas-services.service';
import { CajaClass } from '../../clases/caja-class';
import { LoginServicesService } from '../../services/login-services.service';

const MOVIENTO_OPERACION = "E"

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export default class FacturaComponent implements OnInit {


  operacion: OperacionClass = new OperacionClass();
  operacionDetalle: OperacionDetalleClass[] = [];
  sucursales: any[] = [];
  cajas: any[] = [];
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


  ngOnInit(): void {
   
    console.log( this.route.snapshot.queryParams['operacion'])
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

    const usuario = this.loginServices.getUser();
    if (usuario && usuario.username) {
      this.operacion.vendedor!.id = usuario.id;
      this.operacion.vendedor!.username = usuario.username;

    }


    this.loadCaja();
  }
  constructor(private modalService: NgbModal, private operacionServices: OperacionServicesService, private loginServices: LoginServicesService, private sucursalServices: SucursalServicesService, private tipoOperacionServices: TipoOperacionServicesService, private distritoServices: DistritosServicesService, private municipioServices: MunicipioServicesService, private departamentoServices: DepartamentosServicesService, private router: Router, private datePipe: DatePipe, private route: ActivatedRoute, private cajaServices: CajasServicesService // Usamos ActivatedRoute aquí
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
    this.operacionServices.eliminarOperacionDetalle(detalle).subscribe(() => {
      this.operacionDetalle = this.operacionServices.operacionDetalle;
    });
  }
  loadDepartamento() {
    this.departamentoServices.buscar().subscribe(
      (dato: any) => {
        this.departamentos = dato;
        const seleccionado = this.departamentos?.find(dep => dep.select === true);
        if (seleccionado) {
          this.operacion.departamento = seleccionado;
        }


        if (this.operacion.departamento) {
          this.operacion.departamento = this.departamentos?.find(emp => emp.id === this.operacion.departamento?.id);
        }
      }

    );
  }

  //mostrar datos de la sucursal
  loadSucursal() {
    this.sucursalServices.buscar().subscribe((dato: any) => {
      this.sucursales = dato;

      // 1. Si ya hay una sucursal seleccionada previamente (por ID), la usamos
      if (this.operacion.sucursal?.id) {
        this.operacion.sucursal = this.sucursales.find(emp => emp.id === this.operacion.sucursal?.id);
      }
      // 2. Si hay una sucursal con select === true, la usamos
      else {
        const seleccionado = this.sucursales.find(dep => dep.select === true);
        if (seleccionado) {
          this.operacion.sucursal = seleccionado;
        }
        // 3. Si no, usamos la primera
        else if (this.sucursales.length > 0) {
          this.operacion.sucursal = this.sucursales[0];
        }
      }

      this.loadCaja();
    });
  }

  onSucursalChange(sucursalSeleccionada: any) {
    this.operacion.sucursal = sucursalSeleccionada;
    this.loadCaja();
  }


  loadMunicipio() {
    this.municipioServices.buscar().subscribe(
      (dato: any) => {
        this.municipios = dato;
        const seleccionado = this.municipios?.find(dep => dep.select === true);
        if (seleccionado) {
          this.operacion.municipio = seleccionado;
        }
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
        const seleccionado = this.distritos?.find(dep => dep.select === true);
        if (seleccionado) {
          this.operacion.distrito = seleccionado;
        }
        if (this.operacion.distrito) {
          this.operacion.distrito = this.distritos?.find(emp => emp.id === this.operacion.distrito?.id);
        }
      }

    );

  }

  loadTipoOperacion() {
    this.tipoOperacionServices.buscarTipoOperacion(MOVIENTO_OPERACION).subscribe(
      (dato: any) => {
        this.tipoOperaciones = dato;
        const seleccionado = this.tipoOperaciones?.find(dep => dep.select === true);
        if (seleccionado) {
          this.operacion.tipoOperacion = seleccionado;
        }
        if (this.operacion.tipoOperacion) {
          this.operacion.tipoOperacion = this.tipoOperaciones?.find(emp => emp.id === this.operacion.tipoOperacion?.id);
        }
      }

    );

  }


  openModalCliente() {

    const modalRef = this.modalService.open(BuscarClienteComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajustar el tamaño
      centered: true // para centrar el modal

    });
    modalRef.componentInstance.identificador = "factura"; // ← acá mandás el parámetro

  }
  openModalProducto() {
    const modalRef = this.modalService.open(BuscarProductoComponent, {
      size: 'xl', // 'sm' | 'lg' | 'xl' para ajustar el tamaño
      centered: true // para centrar el modal
    });
    modalRef.componentInstance.identificador = "factura"; // ← acá mandás el parámetro


  }

  openModalFormaPago() {
    const modalRef = this.modalService.open(FormaDePagoComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
    });
    modalRef.componentInstance.identificador = "factura"; // ← acá mandás el parámetro
    modalRef.componentInstance.totalVenta = this.operacion.total; // ← acá mandás el parámetro

  }

  loadCaja() {
    const sucursalId = this.operacion?.sucursal?.id;

    if (!sucursalId) return;

    this.cajaServices.buscar(sucursalId).subscribe((dato: any) => {
      this.cajas = dato;

      // 1. Si ya hay una caja con ID, busca la correspondiente
      if (this.operacion.caja?.id) {
        this.operacion.caja = this.cajas.find(c => c.id === this.operacion.caja?.id);
      }
      // 2. Si hay alguna marcada como seleccionada, usarla
      else {
        const seleccionado = this.cajas.find(c => c.select === true);
        if (seleccionado) {
          this.operacion.caja = seleccionado;
        }
        // 3. Si no, usar la primera de la lista
        else if (this.cajas.length > 0) {
          this.operacion.caja = this.cajas[0];
        }
      }
    });
  }



  //validar si la caja ha sido seleccionada antes de guardar factura 

  guardarFactura() {
    if (!this.operacion.caja || !this.operacion.caja.id) {
      Swal.fire({
        icon: 'warning',
        title: 'Caja no seleccionada',
        text: 'Debe seleccionar una caja antes de continuar.',
      });
      return;
    }

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

    // ✅ Si todas las validaciones pasan, abrir modal de forma de pago
    this.openModalFormaPago();
  }


  agregarProducto() {
    if (!this.operacion.caja || !this.operacion.caja.id) {
      Swal.fire({
        icon: 'warning',
        title: 'Caja no seleccionada',
        text: 'Debe seleccionar una caja antes de continuar.',
      });
      return;
    }
    this.openModalProducto();
  }



}

