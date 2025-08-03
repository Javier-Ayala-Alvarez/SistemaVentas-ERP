import { CommonModule, AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  ngOnInit(): void {
    this.loadDepartamento();
    this.loadMunicipio();
    this.loadDistrito();
    this.loadTipoOperacion();
    this.loadSucursal();
    this.limpiarArreglo();
    this.operacionDetalle = this.operacionServices.operacionDetalle;
    this.operacion = this.operacionServices.operacion;

  }
  constructor(private modalService: NgbModal, private operacionServices: OperacionServicesService, private sucursalServices: SucursalServicesService, private tipoOperacionServices: TipoOperacionServicesService, private distritoServices: DistritosServicesService, private municipioServices: MunicipioServicesService, private departamentoServices: DepartamentosServicesService, private router: Router, private datePipe: DatePipe, private route: ActivatedRoute, // Usamos ActivatedRoute aquí
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
    this.tipoOperacionServices.buscarTipoOperacion("S").subscribe(
      (dato: any) => {
        this.tipoOperaciones = dato;
        if (this.operacion.tipoOperacion) {
          this.operacion.tipoOperacion = this.tipoOperaciones?.find(emp => emp.id === this.operacion.tipoOperacion?.id);
        }
      }

    );

  }



  openModalProveedor() {
    const modalRef = this.modalService.open(BuscarProveedorComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true

    });
    modalRef.componentInstance.identificador = "compra"; // ← acá mandás el parámetro


  }
  openModalProducto() {
    const modalRef = this.modalService.open(BuscarProductoComponent, {
      size: 'xl', // 'sm' | 'lg' | 'xl' para ajustar el tamaño
      centered: true // para centrar el modal
    });
    modalRef.componentInstance.identificador = "compra"; // ← acá mandás el parámetro


  }

  openModalFormaPago() {
    const modalRef = this.modalService.open(FormaDePagoComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajustar el tamaño
      centered: true
    });
    modalRef.componentInstance.identificador = "compra"; // ← acá mandás el parámetro
    modalRef.componentInstance.totalVenta = this.operacion.total; // ← acá mandás el parámetro
  }
}
