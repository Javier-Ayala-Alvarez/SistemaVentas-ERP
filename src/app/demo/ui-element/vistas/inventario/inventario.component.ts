import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { KardexClass } from '../../clases/kardex-class';
import { SucursalClass } from '../../clases/sucursal-class';
import { OperacionServicesService } from '../../services/operacion-services.service';
import { SucursalServicesService } from '../../services/sucursal-services.service';
type EstadoStock = 'CRITICO' | 'ADVERTENCIA' | 'OK' | null;

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'], // <- plural
  providers: [DatePipe]
})

export class InventarioComponent {

  // Paginación / Orden
  page: number = 0;
  size: number = 8;


  order: string = 'id_producto';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  totalPages: any[] = [];


  // Filtros
  filtroNombre: string = '';            // <--- nuevo (búsqueda por nombre de producto)
  filtroProducto: string = '';          // si lo usas para código de producto, lo mantenemos
  filtroTipoMovimiento: string | null = null;
  filtroFechaInicio: Date | null = null;
  filtroFechaFin: Date | null = null;
  filtroSucursal: number | null = null;
  filtroEstadoStock: EstadoStock = null;

  // Datos
  sucursales: SucursalClass[] = [];
  kardex: KardexClass[] = [];

  loading = false;

  constructor(
    private router: Router,
    private kardexService: OperacionServicesService,
    private sucursalServices: SucursalServicesService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadSucursales();
    this.loadKardex();
  }

  loadSucursales() {
    this.sucursalServices.buscar().subscribe({
      next: (dato: any) => this.sucursales = dato || [],
      error: (e) => console.error('Error al cargar sucursales:', e)
    });
  }

  // Construye la cadena de filtros para el backend
  get busqueda(): string {
    const partes: string[] = [];

    if (this.filtroNombre) partes.push(`nombre:${this.filtroNombre}`);
    if (this.filtroProducto) partes.push(`producto:${this.filtroProducto}`);
    if (this.filtroTipoMovimiento) partes.push(`tipoMovimiento:${this.filtroTipoMovimiento}`);

    const fIni = this.datePipe.transform(this.filtroFechaInicio, 'yyyy-MM-dd');
    const fFin = this.datePipe.transform(this.filtroFechaFin, 'yyyy-MM-dd');
    if (fIni) partes.push(`fechaInicio:${fIni}`);
    if (fFin) partes.push(`fechaFin:${fFin}`);

    if (this.filtroSucursal) partes.push(`idSucursal:${this.filtroSucursal}`);

    return partes.join(',');
  }

  loadKardex() {
    this.loading = true;
    this.kardexService
      .loadInventario(this.busqueda, this.page, this.size, this.order, this.asc)
      .subscribe({
        next: (dato: any) => {
          const content = dato?.content ?? dato ?? [];
          this.kardex = Array.isArray(content) ? content : [];
          this.isFirst = dato?.first ?? (this.page === 0);
          this.isLast = dato?.last ?? (this.page + 1 >= (dato?.totalPages ?? 1));
          this.totalPages = new Array(dato?.totalPages ?? 1);
        },
        error: (e) => {
          console.error('❌ Error al cargar inventario:', e);
          this.kardex = [];
          this.totalPages = new Array(1);
          this.isFirst = true;
          this.isLast = true;
        },
        complete: () => this.loading = false
      });
  }

  // Ordenamiento por columnas (coincide con los th del HTML)
  ordenarPor(campo: 'id' | 'precio_unitario' | 'stock' | 'valor_stock' | 'id_producto') {
    if (this.order === campo) {
      this.asc = !this.asc;
    } else {
      this.order = campo;
      this.asc = true;
    }
    this.loadKardex();
  }

  // Paginación
  paginaSiguiente(): void {
    if (!this.isLast) {
      this.page++;
      this.loadKardex();
    }
  }

  paginaAnterior(): void {
    if (!this.isFirst && this.page > 0) {
      this.page--;
      this.loadKardex();
    }
  }

  // trackBy para *ngFor
  trackById = (_: number, item: any) => item?.id ?? _;
  get kardexFiltrado(): KardexClass[] {
    if (!this.filtroEstadoStock) return this.kardex;

    return this.kardex.filter(item => {
      const stock = item.stock ?? 0;
      const minimo = item.stockConfigurado ?? 0;

      switch (this.filtroEstadoStock) {
        case 'CRITICO':
          return stock < minimo;
        case 'ADVERTENCIA':
          return stock === minimo;
        case 'OK':
          return stock > minimo;
        default:
          return true;
      }
    });
  }
  get totalInvertido(): number {
    return this.kardexFiltrado?.reduce(
      (sum, dato) => sum + ((dato.precioUnitario || 0) * (dato.stock || 0)), 0
    ) || 0;
  }

}
