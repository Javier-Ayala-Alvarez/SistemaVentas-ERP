import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionServicesService } from '../../services/operacion-services.service';
import { CreditoClass } from '../../clases/credito-class';
import { ClienteClass } from '../../clases/cliente-class';
import { FormaDePagoComponent } from '../forma-de-pago/forma-de-pago.component';
import { OperacionClass } from '../../clases/operaciones-class';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CajasServicesService } from '../../services/cajas-services.service';
import { DepartamentosServicesService } from '../../services/departamentos-services.service';
import { DistritosServicesService } from '../../services/distritos-services.service';
import { LoginServicesService } from '../../services/login-services.service';
import { MunicipioServicesService } from '../../services/municipio-services.service';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';
const MOVIENTO_OPERACION = 'EC';

@Component({
  selector: 'app-detalle-credito-componente',
  templateUrl: './detalle-credito-componente.component.html',
  styleUrls: ['./detalle-credito-componente.component.scss']
})
export class DetalleCreditoComponenteComponent implements OnInit {

  creditos: CreditoClass[] = [];
  operacion: OperacionClass = new OperacionClass();
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  totalPages: number[] = [];
  totalCredito: number = 0;
  nombre: string = '';
  intentoGuardar = false;
  loading = false;
  operaciones: OperacionClass[] = [];


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

  // === UX de validación (toasts + flag de intento) ===
  toasts: ToastMsg[] = [];


  @Input() cliente?: ClienteClass;

  constructor(
    public activeModal: NgbActiveModal,
    private operacionesService: OperacionServicesService,
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
    private cajaServices: CajasServicesService
  ) { }

  ngOnInit(): void {

    if (!this.cliente || !this.cliente.id) {
      console.error('Cliente no proporcionado');
      this.activeModal.dismiss();
      return;
    }

    this.operacion.cliente = this.cliente;
    this.nombre = `${this.cliente.nombre ?? ''} ${this.cliente.apellido ?? ''}`.trim();
    this.loadCreditos();
    this.loadDepartamento();
    this.loadMunicipio();
    this.loadDistrito();
    this.loadTipoOperacion();
    this.loadSucursal();
    this.limpiarArreglo();
    this.loadFacturas();
  }

  limpiarArreglo() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.urlAfterRedirects;

        if (this.previousUrl && this.previousUrl !== this.currentUrl) {
          this.operacionServices.limpiarArreglos();
        }
      });
  }

  loadDepartamento() {
    this.departamentoServices.buscar().subscribe((dato: any) => {
      this.departamentos = dato;
      const seleccionado = this.departamentos?.find(dep => dep.select === true);
      if (seleccionado) {
        this.operacion.departamento = seleccionado;
      }

      if (this.operacion.departamento) {
        this.operacion.departamento = this.departamentos?.find(
          emp => emp.id === this.operacion.departamento?.id
        );
      }
    });
  }

  // mostrar datos de la sucursal
  loadSucursal() {
    this.sucursalServices.buscar().subscribe((dato: any) => {
      this.sucursales = dato;

      // 1. Si ya hay una sucursal seleccionada previamente (por ID), la usamos
      if (this.operacion.sucursal?.id) {
        this.operacion.sucursal = this.sucursales.find(
          emp => emp.id === this.operacion.sucursal?.id
        );
      } else {
        // 2. Si hay una sucursal con select === true, la usamos
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
    this.municipioServices.buscar().subscribe((dato: any) => {
      this.municipios = dato;
      const seleccionado = this.municipios?.find(dep => dep.select === true);
      if (seleccionado) {
        this.operacion.municipio = seleccionado;
      }
      if (this.operacion.municipio) {
        this.operacion.municipio = this.municipios?.find(
          emp => emp.id === this.operacion.municipio?.id
        );
      }
    });
  }

  loadDistrito() {
    this.distritoServices.buscar().subscribe((dato: any) => {
      this.distritos = dato;
      const seleccionado = this.distritos?.find(dep => dep.select === true);
      if (seleccionado) {
        this.operacion.distrito = seleccionado;
      }
      if (this.operacion.distrito) {
        this.operacion.distrito = this.distritos?.find(
          emp => emp.id === this.operacion.distrito?.id
        );
      }
    });
  }

  loadTipoOperacion() {
    this.tipoOperacionServices.buscarTipoOperacion(MOVIENTO_OPERACION).subscribe((dato: any) => {
      this.tipoOperaciones = dato;
      const seleccionado = this.tipoOperaciones?.find(dep => dep.select === true);
      if (seleccionado) {
        this.operacion.tipoOperacion = seleccionado;
      }

    });
  }

  loadCreditos(): void {
    if (!this.cliente?.id) {
      return;
    }

    this.operacionesService
      .CreditoPage(this.cliente.id, this.page, this.size, this.order, this.asc)
      .subscribe((resp: any) => {

        this.creditos = resp.content ?? [];
        this.nombre = `${this.creditos[0]?.nombreCliente ?? ''} ${this.creditos[0]?.apellidoCliente ?? ''}`.trim();
        this.isFirst = resp.first;
        this.isLast = resp.last;
        this.totalPages = Array.from({ length: resp.totalPages });

        this.calcularTotal();
      });
  }
  loadCaja() {
    const sucursalId = this.operacion?.sucursal?.id;
    if (!sucursalId) return;

    this.cajaServices.buscar(sucursalId).subscribe((dato: any) => {
      this.cajas = dato;

      // 1. Si ya hay una caja con ID, busca la correspondiente
      if (this.operacion.caja?.id) {
        this.operacion.caja = this.cajas.find(c => c.id === this.operacion.caja?.id);
      } else {
        // 2. Si hay alguna marcada como seleccionada, usarla
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
  calcularTotal(): void {
    this.totalCredito = this.creditos.reduce(
      (acc, item) => acc + (item.montoPagado ?? 0),
      0
    );
  }

  paginaSiguiente(): void {
    if (!this.isLast) {
      this.page++;
      this.loadCreditos();
    }
  }

  paginaAnterior(): void {
    if (!this.isFirst) {
      this.page--;
      this.loadCreditos();
    }
  }

  pagarTodo(): void {
    if (!this.validarFormulario()) {
      return;
    }
    this.openModalFormaPago();
  }
  openModalFormaPago() {
    const modalRef = this.modalService.open(FormaDePagoComponent, {
      size: 'lg',
      centered: true
    });

    modalRef.componentInstance.identificador = 'credito';
    this.operacion.total = this.totalCredito;
    const hoy = new Date();
    this.operacion.fechaElaboracion = hoy.toISOString().split('T')[0];
    this.operacionesService.operacion = this.operacion;
    this.operacionServices.creditoClass = this.creditos;
    modalRef.componentInstance.totalVenta = this.operacion.total;

    modalRef.result.then((result) => {
      if (result?.success) {
        // 🔄 recargar datos
        this.page = 0;
        this.loadCreditos();
        this.loadFacturas();

        // ❌ cerrar este modal también
        //this.activeModal.close(true);
      }
    }).catch(() => { });
  }
  private addToast(message: string) {
    this.toasts.push({
      id: Date.now(),
      message
    });

    setTimeout(() => {
      this.toasts.shift();
    }, 3000);
  }

  private validarFormulario(): boolean {
    this.intentoGuardar = true;

    if (!this.operacion.departamento) {
      this.addToast('Debe seleccionar un departamento');
      return false;
    }

    if (!this.operacion.municipio) {
      this.addToast('Debe seleccionar un municipio');
      return false;
    }

    if (!this.operacion.distrito) {
      this.addToast('Debe seleccionar un distrito');
      return false;
    }

    if (!this.operacion.tipoOperacion) {
      this.addToast('Debe seleccionar el tipo de operación');
      return false;
    }

    if (!this.operacion.sucursal) {
      this.addToast('Debe seleccionar la sucursal');
      return false;
    }

    if (!this.operacion.caja) {
      this.addToast('Debe seleccionar la caja');
      return false;
    }

    if (this.totalCredito <= 0) {
      this.addToast('No hay deuda pendiente para pagar');
      return false;
    }

    return true;
  }

  loadFacturas() {
    this.loading = true;
    this.operacionServices
      .loadFac(this.busqueda, this.page, this.size, this.order, this.asc)
      .subscribe({
        next: (dato: any) => {
          const content = dato?.content ?? dato ?? [];
          // Normalizamos fecha para evitar el error del date pipe
          this.operaciones = (Array.isArray(content) ? content : []).map((o: any) => ({
            ...o,
            fechaElaboracion: o?.fechaElaboracion ? new Date(o.fechaElaboracion) : null
          }));
          console.log(this.operaciones)
          this.isFirst = dato?.first ?? (this.page === 0);
          this.isLast = dato?.last ?? (this.page + 1 >= (dato?.totalPages ?? 1));
          this.totalPages = new Array(dato?.totalPages ?? 1);
        },
        error: (err) => {
          console.error('❌ Error al cargar la operaciones:', err);
          this.operaciones = [];
          this.totalPages = new Array(1);
          this.isFirst = true;
          this.isLast = true;
        },
        complete: () => (this.loading = false)
      });
  }
  get busqueda(): string {
    const partes: string[] = [];
    partes.push(`movimiento:${MOVIENTO_OPERACION}`);
    return partes.join(',');
  }
  eliminar(operacion: OperacionClass): void {
    this.operacionesService.eliminarCredito(operacion.id ?? 0).subscribe({
      next: () => {
        this.loadCreditos();
        this.loadFacturas();

      }
    });

  }
}
// Interfaz para toasts
export interface ToastMsg {
  id: number;
  message: string;
}