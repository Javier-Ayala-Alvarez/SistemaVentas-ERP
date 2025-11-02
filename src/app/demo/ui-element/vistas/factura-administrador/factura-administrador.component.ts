import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';
import { OperacionClass } from '../../clases/operaciones-class';
import { OperacionServicesService } from '../../services/operacion-services.service';

const MOVIENTO_OPERACION = 'S';

@Component({
  selector: 'app-factura-administrador',
  templateUrl: './factura-administrador.component.html',
  styleUrls: ['./factura-administrador.component.scss']
})
export default class FacturaAdministradorComponent {
  operacion: OperacionClass = new OperacionClass();

  // Filtros
  filtroTerminoBusqueda: string = '';
  filtroFechaInicio: Date | null = null;
  filtroFechaFin: Date | null = null;
  filtroNFactura!: string;
  filtroTipoOperacion!: number;
  filtroSucursal!: number;

  // Datos
  operaciones: OperacionClass[] = [];
  sucursales: any[] = [];
  tipoOperaciones: any[] = [];

  // Paginación / Orden
  page: number = 0;
  size: number = 8;
  order: string = 'id';   // === igual que Gastos
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  totalPages: any[] = [];

  loading = false;

  constructor(
    private modalService: NgbModal,
    private operacionesServices: OperacionServicesService,
    private sucursalServices: SucursalServicesService,
    private tipoOperacionServices: TipoOperacionServicesService,
    private router: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTipoOperacion();
    this.loadSucursal();
    this.loadFacturas();
  }

  // Catálogos
  loadSucursal() {
    this.sucursalServices.buscar().subscribe({
      next: (dato: any) => (this.sucursales = dato || []),
      error: (err) => console.error('Error al cargar sucursales:', err)
    });
  }

  loadTipoOperacion() {
    this.tipoOperacionServices.buscarTipoOperacion(MOVIENTO_OPERACION).subscribe({
      next: (dato: any) => (this.tipoOperaciones = dato || []),
      error: (err) => console.error('Error al cargar tipos de operación:', err)
    });
  }

  // Tabla
  loadFacturas() {
    this.loading = true;
    this.operacionesServices
      .loadFac(this.busqueda, this.page, this.size, this.order, this.asc)
      .subscribe({
        next: (dato: any) => {
          const content = dato?.content ?? dato ?? [];
          // Normalizamos fecha para evitar el error del date pipe
          this.operaciones = (Array.isArray(content) ? content : []).map((o: any) => ({
            ...o,
            fechaElaboracion: o?.fechaElaboracion ? new Date(o.fechaElaboracion) : null
          }));
          this.isFirst = dato?.first ?? (this.page === 0);
          this.isLast = dato?.last ?? (this.page + 1 >= (dato?.totalPages ?? 1));
          this.totalPages = new Array(dato?.totalPages ?? 1);
        },
        error: (err) => {
          console.error('❌ Error al cargar facturas:', err);
          this.operaciones = [];
          this.totalPages = new Array(1);
          this.isFirst = true;
          this.isLast = true;
        },
        complete: () => (this.loading = false)
      });
  }

  // Paginación (igual filosofía que Gastos pero sin recargar catálogos)
  paginaSiguiente(): void {
    if (!this.isLast) {
      this.page++;
      this.loadFacturas();
    }
  }

  paginaAnterior(): void {
    if (!this.isFirst && this.page > 0) {
      this.page--;
      this.loadFacturas();
    }
  }

  // Filtros → string
  get busqueda(): string {
    const partes: string[] = [];
    const fechaInicio = this.datePipe.transform(this.filtroFechaInicio, 'yyyy-MM-dd');
    const fechaFin = this.datePipe.transform(this.filtroFechaFin, 'yyyy-MM-dd');

    if (fechaFin) partes.push(`fechaFin:${fechaFin}`);
    if (fechaInicio) partes.push(`fechaInicio:${fechaInicio}`);
    if (this.filtroNFactura) partes.push(`nFactura:${this.filtroNFactura}`);
    if (this.filtroSucursal) partes.push(`idSucursal:${this.filtroSucursal}`);
    if (this.filtroTerminoBusqueda) partes.push(`nombre:${this.filtroTerminoBusqueda}`);
    if (this.filtroTipoOperacion) partes.push(`idTipoOperacion:${this.filtroTipoOperacion}`);
    partes.push(`movimiento:${MOVIENTO_OPERACION}`);
    return partes.join(',');
  }

  // Ordenamiento “estilo Gastos”
  ordenarPor(campo: string): void {
    if (this.order === campo) {
      this.asc = !this.asc;
    } else {
      this.order = campo;
      this.asc = true;
    }
    this.loadFacturas();
  }

  // trackBy opcional (mejor rendimiento)
  trackById = (_: number, item: any) => item?.id ?? _;

  // Acciones
  editar(dato: OperacionClass): void {
    this.AgregarNuevo(dato);
  }

  AgregarNuevo(dato?: OperacionClass): void {
    if (dato) {
      this.router.navigate(['/component/factura'], {
        queryParams: { operacion: JSON.stringify(dato) }
      });
    }
  }

  eliminar(dato: OperacionClass): void {
    // Implementa según tu servicio
    console.log('Eliminar factura', dato?.id);
  }
}
