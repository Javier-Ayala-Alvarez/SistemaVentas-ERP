import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';
import { OperacionClass } from '../../clases/operaciones-class';
import { OperacionServicesService } from '../../services/operacion-services.service';

const MOVIENTO_OPERACION = "S";

@Component({
  selector: 'app-factura-administrador',
  templateUrl: './factura-administrador.component.html',
  styleUrls: ['./factura-administrador.component.scss']
})
export default class FacturaAdministradorComponent {
  operacion: OperacionClass = new OperacionClass();

  page: number = 0;
  size: number = 8;
  order: string = 'fecha_elaboracion';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  filtroTerminoBusqueda: string = '';
  totalPages: any[] = [];
 filtroFechaInicio: Date | null = null;
filtroFechaFin: Date | null = null;

  filtroNFactura!: string;
  filtroTipoOperacion!: number;
  filtroSucursal!: number;
  operaciones: OperacionClass[] = [];

  sucursales: any[] = [];
  tipoOperaciones: any[] = [];

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

  // Mostrar datos de sucursales
  loadSucursal() {
    this.sucursalServices.buscar().subscribe({
      next: (dato: any) => {
        this.sucursales = dato;
        if (this.operacion) {
          this.operacion.sucursal = this.sucursales?.find(
            emp => emp.id === this.operacion.sucursal?.id
          );
        }
      },
      error: (err) => console.error('Error al cargar sucursales:', err)
    });
  }

  // Mostrar tipos de operación
  loadTipoOperacion() {
    this.tipoOperacionServices.buscarTipoOperacion(MOVIENTO_OPERACION).subscribe({
      next: (dato: any) => {
        this.tipoOperaciones = dato;
        if (this.operacion.tipoOperacion) {
          this.operacion.tipoOperacion = this.tipoOperaciones?.find(
            emp => emp.id === this.operacion.tipoOperacion?.id
          );
        }
      },
      error: (err) => console.error('Error al cargar tipos de operación:', err)
    });
  }

  // Mostrar facturas en tabla
  loadFacturas() {
    console.log("🔍 Filtros enviados:", this.busqueda);
    this.operacionesServices.loadFac(this.busqueda, this.page, this.size, this.order, this.asc)
      .subscribe({
        next: (dato: any) => {
          console.log("✅ Respuesta del backend:", dato);
          this.operaciones = dato.content || dato; // soporta paginación o lista directa
          this.isFirst = dato.first ?? false;
          this.isLast = dato.last ?? false;
          this.totalPages = new Array(dato.totalPages ?? 1);
        },
        error: (err) => {
          console.error("❌ Error al cargar facturas:", err);
        }
      });
  }

  // Navegar entre páginas
  paginaSiguiente(): void {
    if (!this.isLast) {
      this.page++;
      this.loadFacturas();
    }
  }

  paginaAnterior(): void {
    if (!this.isFirst) {
      this.page--;
      this.loadFacturas();
    }
  }

  // Generar cadena de búsqueda
  get busqueda(): string {
    const partes = [];
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

  // Editar o agregar nuevo
  editar(dato: OperacionClass): void {
    this.AgregarNuevo(dato);
  }

  AgregarNuevo(dato?: OperacionClass): void {
    if (dato) {
      console.log("📝 Editando factura:", dato);
      this.router.navigate(['/component/factura'], {
        queryParams: { operacion: JSON.stringify(dato) } // ✅ serializar objeto
      });
    }
  }
}
