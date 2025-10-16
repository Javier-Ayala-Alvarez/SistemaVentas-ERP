import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KardexClass } from '../../clases/kardex-class';
import { SucursalClass } from '../../clases/sucursal-class';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { OperacionServicesService } from '../../services/operacion-services.service';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrl: './kardex.component.scss'
})
export class KardexComponent {

  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;

  filtroProducto: string = '';
  filtroTipoMovimiento: string | null = null;
  filtroFechaInicio: Date | null = null;
  filtroFechaFin: Date | null = null;
  filtroSucursal: number | null = null;

  totalPages: any[] = [];
  sucursales: SucursalClass[] = [];
  kardex: KardexClass[] = [];

  constructor(
    private router: Router,
    private kardexService: OperacionServicesService,
    private sucursalServices: SucursalServicesService
  ) {}

  ngOnInit(): void {
    this.loadSucursales();
    this.loadKardex();
  }

  agregarNuevoKardex() {
    this.router.navigate(['/component/agregar-kardex']); // Define la ruta de creación
  }

  loadSucursales() {
    this.sucursalServices.buscar().subscribe(
      (dato: any) => {
        this.sucursales = dato;
      }
    );
  }

  get busqueda(): string {
    const partes = [];
    if (this.filtroProducto) partes.push(`producto:${this.filtroProducto}`);
    if (this.filtroTipoMovimiento) partes.push(`tipoMovimiento:${this.filtroTipoMovimiento}`);
    if (this.filtroFechaInicio) partes.push(`fechaInicio:${this.filtroFechaInicio}`);
    if (this.filtroFechaFin) partes.push(`fechaFin:${this.filtroFechaFin}`);
    if (this.filtroSucursal) partes.push(`idSucursal:${this.filtroSucursal}`);
    return partes.join(',');
  }

  loadKardex() {
    this.kardexService.loadKardex(this.busqueda, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.kardex = dato.content;
        this.isFirst = dato.first;
        this.isLast = dato.last;
        this.totalPages = new Array(dato.totalPages);
      }
    );
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

  
}
