import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';
import { Router } from '@angular/router';
import { OperacionClass } from '../../clases/operaciones-class';
import { OperacionServicesService } from '../../services/operacion-services.service';

const MOVIENTO_OPERACION = 'E';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss'], // <- plural
  providers: [DatePipe]
})
export default class ComprasComponent {
  // Paginación / orden
  page = 0;
  size = 8;
  order: string = 'id';                 // 'id' | 'fecha_elaboracion' | 'total'
  asc = true;
  isFirst = false;
  isLast = false;
  totalPages: any[] = [];

  // Filtros
  filtroTerminoBusqueda: string = '';
  filtroFechaInicio: Date | null = null;
  filtroFechaFin: Date | null = null;
  filtroNFactura!: string;
  filtroTipoOperacion!: number;
  filtroSucursal!: number;

  // Catálogos / datos
  sucursales: any[] = [];
  tipoOperaciones: any[] = [];
  operaciones: OperacionClass[] = [];

  loading = false;

  constructor(
    private router: Router,
    private operacionesServices: OperacionServicesService,
    private sucursalServices: SucursalServicesService,
    private tipoOperacionServices: TipoOperacionServicesService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadSucursal();
    this.loadTipoOperacion();
    this.loadCompras();
  }
 editar(dato: OperacionClass): void {
    this.AgregarNuevo(dato);
  }
  AgregarNuevo(dato?: OperacionClass): void {
      this.router.navigate(['/component/Nuevacompras'], {
      state: { operacion: dato }
      }); 
    
  }


  // Catálogos
  loadSucursal() {
    this.sucursalServices.buscar().subscribe({
      next: (dato: any) => (this.sucursales = dato || []),
      error: (e) => console.error('Error al cargar sucursales:', e)
    });
  }

  loadTipoOperacion() {
    this.tipoOperacionServices.buscarTipoOperacion(MOVIENTO_OPERACION).subscribe({
      next: (dato: any) => (this.tipoOperaciones = dato || []),
      error: (e) => console.error('Error al cargar tipos de operación:', e)
    });
  }

  // Query de búsqueda (fechas formateadas)
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

  // Carga tabla
  loadCompras() {
    this.loading = true;
    this.operacionesServices
      .loadFac(this.busqueda, this.page, this.size, this.order, this.asc)
      .subscribe({
        next: (dato: any) => {
          console.log(dato)
          const content = dato?.content ?? dato ?? [];
          // Normalizar fecha para pipe date
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
          console.error('❌ Error al cargar compras:', err);
          this.operaciones = [];
          this.totalPages = new Array(1);
          this.isFirst = true;
          this.isLast = true;
        },
        complete: () => (this.loading = false)
      });
  }

  // Ordenamiento (igual que Gastos)
  ordenarPor(campo: 'id' | 'fecha_elaboracion' | 'total'): void {
    if (this.order === campo) {
      this.asc = !this.asc;
    } else {
      this.order = campo;
      this.asc = true;
    }
    this.loadCompras();
  }

  // Paginación (sin recargar catálogos)
  paginaSiguiente(): void {
    if (!this.isLast) {
      this.page++;
      this.loadCompras();
    }
  }

  paginaAnterior(): void {
    if (!this.isFirst && this.page > 0) {
      this.page--;
      this.loadCompras();
    }
  }

  // trackBy para *ngFor
  trackById = (_: number, item: any) => item?.id ?? _;
    eliminar(dato: OperacionClass): void {
    if (!dato?.id) return;
    this.operacionesServices.eliminar(dato.id as number).subscribe({
      next: () => this.loadCompras(),
      error: (e) => console.error('❌ Error al eliminar Compra:', e)
    });
  }
}
