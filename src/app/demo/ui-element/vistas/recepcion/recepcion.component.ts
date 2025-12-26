import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionClass } from '../../clases/operaciones-class';
import { OperacionServicesService } from '../../services/operacion-services.service';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';
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

// Ajusta si tu backend necesita otro valor (ej. 'C' o 'Q')
// Lo dejo como lo tenías.
const MOVIENTO_OPERACION = 'ER';
@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrl: './recepcion.component.scss'
})
export class RecepcionComponent {
operacion: OperacionClass = new OperacionClass();

  // Paginación / ordenamiento
  page: number = 0;
  size: number = 8;
  order: 'id' | 'fecha_elaboracion' | 'total' = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  totalPages: any[] = [];

  // Filtros
  filtroTerminoBusqueda: string = '';
  filtroFechaInicio: Date | null = null;
  filtroFechaFin: Date | null = null;
  filtroNFactura!: string;
  filtroTipoOperacion!: number;
  filtroSucursal: any | null = null;

  // Catálogos / datos
  sucursales: any[] = [];
  tipoOperaciones: any[] = [];
  selectComboTipoOperacion: any | null = null; // si lo usas en el HTML
  operaciones: OperacionClass[] = [];

  loading = false;

  constructor(
    private modalService: NgbModal,
    private operacionesServices: OperacionServicesService,
    private sucursalServices: SucursalServicesService,
    private tipoOperacionServices: TipoOperacionServicesService,
    private router: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadSucursal();
    this.loadTipoOperacion();
    this.loadCotizaciones();
  }
  editar(dato: OperacionClass): void {
    this.AgregarNuevo(dato);
  }
  AgregarNuevo(dato?: OperacionClass): void {
      this.router.navigate(['/component/NuevaRecepcion'], {
        state: { operacion: dato }
      });
    
  }



  /** === Catálogos === */
  loadSucursal() {
    this.sucursalServices.buscar().subscribe({
      next: (dato: any) => {
        this.sucursales = dato || [];
      },
      error: (e) => console.error('Error al cargar sucursales:', e)
    });
  }

  loadTipoOperacion() {
    this.tipoOperacionServices.buscarTipoOperacion(MOVIENTO_OPERACION).subscribe({
      next: (dato: any) => {
        this.tipoOperaciones = dato || [];
        if (this.operacion?.tipoOperacion) {
          this.operacion.tipoOperacion = this.tipoOperaciones?.find(
            emp => emp.id === this.operacion.tipoOperacion?.id
          );
        }
        console.log(dato)
      },
      error: (e) => console.error('Error al cargar tipos de operación:', e)
    });
  }

  /** === Cadena de búsqueda para backend === */
  get busqueda(): string {
    const partes: string[] = [];
    const fechaInicio = this.datePipe.transform(this.filtroFechaInicio, 'yyyy-MM-dd');
    const fechaFin = this.datePipe.transform(this.filtroFechaFin, 'yyyy-MM-dd');

    if (fechaFin) partes.push(`fechaFin:${fechaFin}`);
    if (fechaInicio) partes.push(`fechaInicio:${fechaInicio}`);
    if (this.filtroNFactura) partes.push(`nFactura:${this.filtroNFactura}`);
    if (this.filtroSucursal) partes.push(`idSucursalDestino:${this.filtroSucursal}`);
    if (this.filtroTerminoBusqueda) partes.push(`nombre:${this.filtroTerminoBusqueda}`);
   // if (this.filtroTipoOperacion) partes.push(`idTipoOperacion:${this.filtroTipoOperacion}`);
    //partes.push(`movimiento:${MOVIENTO_OPERACION}`);

    return partes.join(',');
  }

  /** === Carga tabla principal === */
  loadCotizaciones() {
    this.loading = true;
    this.operacionesServices
      .loadFac(this.busqueda, this.page, this.size, this.order, this.asc)
      .subscribe({
        next: (dato: any) => {
          const content = dato?.content ?? dato ?? [];
          // Normaliza la fecha para evitar errores con el date pipe
          this.operaciones = (Array.isArray(content) ? content : []).map((o: any) => ({
            ...o,
            fechaElaboracion: o?.fechaElaboracion ? new Date(o.fechaElaboracion) : null
          }));

          this.isFirst = dato?.first ?? (this.page === 0);
          this.isLast = dato?.last ?? (this.page + 1 >= (dato?.totalPages ?? 1));
          const pages = dato?.totalPages ?? 1;
          this.totalPages = new Array(pages > 0 ? pages : 1);
        },
        error: (err) => {
          console.error('❌ Error al cargar cotizaciones:', err);
          this.operaciones = [];
          this.totalPages = new Array(1);
          this.isFirst = true;
          this.isLast = true;
        },
        complete: () => (this.loading = false)
      });
  }

  /** === Ordenar columnas === */
  ordenarPor(campo: 'id' | 'fecha_elaboracion' | 'total'): void {
    if (this.order === campo) {
      this.asc = !this.asc;
    } else {
      this.order = campo;
      this.asc = true;
    }
    this.loadCotizaciones();
  }

  /** === Paginación === */
  paginaSiguiente(): void {
    if (!this.isLast) {
      this.page++;
      this.loadCotizaciones();
    }
  }

  paginaAnterior(): void {
    if (!this.isFirst && this.page > 0) {
      this.page--;
      this.loadCotizaciones();
    }
  }

  /** === trackBy para *ngFor === */
  trackById = (_: number, item: any) => item?.id ?? _;

  eliminar(dato: OperacionClass): void {
    if (!dato?.id) return;
    this.operacionesServices.eliminar(dato.id as number).subscribe({
      next: () => this.loadCotizaciones(),
      error: (e) => console.error('❌ Error al eliminar cotización:', e)
    });
  }
}

