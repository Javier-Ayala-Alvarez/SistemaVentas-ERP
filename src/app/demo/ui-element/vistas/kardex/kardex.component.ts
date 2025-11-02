import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { KardexClass } from '../../clases/kardex-class';
import { SucursalClass } from '../../clases/sucursal-class';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { OperacionServicesService } from '../../services/operacion-services.service';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.scss'], // <- plural
  providers: [DatePipe]
})
export class KardexComponent {

  // Paginación / Orden
  page: number = 0;
  size: number = 8;
  order: string = 'id';   // si luego ordenas por fecha/total/costo_stock, ajusta desde el HTML
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  totalPages: any[] = [];

  // Filtros
  filtroNombre: string = '';                // <--- NUEVO (nombre de producto/cliente)
  filtroProducto: string = '';              // si lo sigues usando para código de producto, puedes mantener ambos
  filtroTipoMovimiento: string | null = null;
  filtroFechaInicio: Date | null = null;
  filtroFechaFin: Date | null = null;
  filtroSucursal: number | null = null;

  // Datos
  sucursales: SucursalClass[] = [];
  kardex: KardexClass[] = [];

  constructor(
    private router: Router,
    private kardexService: OperacionServicesService,
    private sucursalServices: SucursalServicesService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadSucursales();
    this.loadKardex();
  }

  agregarNuevoKardex() {
    this.router.navigate(['/component/agregar-kardex']);
  }

  loadSucursales() {
    this.sucursalServices.buscar().subscribe({
      next: (dato: any) => this.sucursales = dato || [],
      error: (e) => console.error('Error al cargar sucursales:', e)
    });
  }

  // Construcción de la query para el backend
  get busqueda(): string {
    const partes: string[] = [];

    // nombre (producto/cliente)
    if (this.filtroNombre) partes.push(`nombre:${this.filtroNombre}`);

    // si también quieres mantener búsqueda por "producto" (código)
    if (this.filtroProducto) partes.push(`producto:${this.filtroProducto}`);

    if (this.filtroTipoMovimiento) partes.push(`tipoMovimiento:${this.filtroTipoMovimiento}`);

    const fechaIni = this.datePipe.transform(this.filtroFechaInicio, 'yyyy-MM-dd');
    const fechaFin = this.datePipe.transform(this.filtroFechaFin, 'yyyy-MM-dd');
    if (fechaIni) partes.push(`fechaInicio:${fechaIni}`);
    if (fechaFin) partes.push(`fechaFin:${fechaFin}`);

    if (this.filtroSucursal) partes.push(`idSucursal:${this.filtroSucursal}`);

    return partes.join(',');
  }

  loadKardex() {
    this.kardexService.loadKardex(this.busqueda, this.page, this.size, this.order, this.asc)
      .subscribe({
        next: (dato: any) => {
          const content = dato?.content ?? dato ?? [];
          // Si quieres normalizar la fecha (por si viene como string)
          this.kardex = (Array.isArray(content) ? content : []).map((k: any) => ({
            ...k,
            fecha: k?.fecha ? new Date(k.fecha) : null
          }));

          this.isFirst = dato?.first ?? (this.page === 0);
          this.isLast = dato?.last ?? (this.page + 1 >= (dato?.totalPages ?? 1));
          this.totalPages = new Array(dato?.totalPages ?? 1);
        },
        error: (e) => {
          console.error('❌ Error al cargar kardex:', e);
          this.kardex = [];
          this.totalPages = new Array(1);
          this.isFirst = true;
          this.isLast = true;
        }
      });
  }

  paginaSiguiente(): void {
    if (!this.isLast) {
      this.page++;
      this.loadKardex();
    }
  }

  paginaAnterior(): void {
    if (!this.isFirst) {
      this.page--;
      this.loadKardex();
    }
  }

  // Opcional: por si decides hacer columnas ordenables
  ordenarPor(campo: string) {
    if (this.order === campo) {
      this.asc = !this.asc;
    } else {
      this.order = campo;
      this.asc = true;
    }
    this.loadKardex();
  }

  // trackBy para mejorar desempeño
  trackById = (_: number, item: any) => item?.id ?? _;
}
