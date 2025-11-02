import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarCajaComponent } from '../agregar-caja/agregar-caja.component';
import { CajasServicesService } from '../../services/cajas-services.service';
import { CajaClass } from '../../clases/caja-class';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { SucursalClass } from '../../clases/sucursal-class';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OperacionServicesService } from '../../services/operacion-services.service';



@Component({
  selector: 'app-cajas',
  templateUrl: './cajas.component.html',
  styleUrl: './cajas.component.scss'
})
export default class CajasComponent {
  filtroCodigo: string = '';
  filtroIdSucursal: string = '';
  filtroFechaInicio: string = '';
  filtroHoraInicio: string = '';
  filtroFechaFin: string = '';
  filtroHoraFin: string = '';
  filtroEfectivoInicio: string = '';
  filtroEfectivoCierre: string = '';

  cajas: CajaClass[] | undefined;
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  selectComboSucursal: any | null = null;
  totalPages: any[] = [];
  sucursales: any[] = [];


    pdfUrl: SafeResourceUrl | null = null;
    pdfBlob: Blob | null = null;
    isLoading: boolean = false;
  constructor(private modalService: NgbModal, private cajasServices: CajasServicesService, private sucursalServices: SucursalServicesService, private cdr: ChangeDetectorRef,private sanitizer: DomSanitizer,
  private operacion: OperacionServicesService
  ) { }


  ngOnInit(): void {
    this.loadcajas();
    this.loadSucursal();


  }

  agregar(): void {
    this.openModal();
  }

  openModal(caja?: CajaClass): void {
    const modalRef = this.modalService.open(AgregarCajaComponent, {
      size: 'lg',
      centered: true
    });
    //Pasar datos al modal
    if (caja) {
      modalRef.componentInstance.caja = caja;
    }

  }



  editar(caja: CajaClass): void {
    this.openModal(caja);
  }
  eliminar(caja: CajaClass): void {
    this.cajasServices.eliminar(caja.id ?? 0, caja).subscribe(

      () => {
        this.loadcajas();
      }
    );

  }



  //mostrar datos en la tabla
  loadcajas() {
    this.cajasServices.load(this.busqueda, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.cajas = dato.content;
        this.isFirst = dato.first;
        this.isLast = dato.last;
        this.totalPages = new Array(dato.totalPages);
      }
    );
  }


  //Ir a la siguiente pagina
  paginaSiguiente(): void {
    if (!this.isLast) {
      this.page++;
      this.ngOnInit();
    }
  }
  //ir a la pagina anterior
  paginaAnterior(): void {
    if (!this.isFirst) {
      this.page--;
      this.ngOnInit();
    }
  }

  //mostrar datos de la sucursal
  loadSucursal() {
    this.sucursalServices.buscar().subscribe(
      (dato: any) => {
        this.sucursales = dato;
      }
    );
  }

  get busqueda(): string {
    const partes = [];
    if (this.filtroCodigo) partes.push(`codigo:${this.filtroCodigo}`);
    if (this.filtroIdSucursal) partes.push(`idSucursal:${this.filtroIdSucursal}`);
    if (this.filtroFechaInicio) partes.push(`fechaInicio:${this.filtroFechaInicio}`);
    if (this.filtroHoraInicio) partes.push(`horaInicio:${this.filtroHoraInicio}`);
    if (this.filtroFechaFin) partes.push(`fechaFin:${this.filtroFechaFin}`);
    if (this.filtroHoraFin) partes.push(`horaFin:${this.filtroHoraFin}`);
    if (this.filtroEfectivoInicio) partes.push(`efectivoInicio:${this.filtroEfectivoInicio}`);
    if (this.filtroEfectivoCierre) partes.push(`efectivoCierre:${this.filtroEfectivoCierre}`);
    return partes.join(',');
  }
  ordenarPor(campo: string): void {
    if (this.order === campo) {
      this.asc = !this.asc;
    } else {
      this.order = campo;
      this.asc = true;
    }
    this.loadcajas();
  }


  // Helpers seguros para convertir a número
private toNumber(v: any): number {
  if (v === null || v === undefined) return 0;
  if (typeof v === 'number' && !isNaN(v)) return v;
  if (typeof v === 'string') {
    // Limpia posibles separadores y símbolos: "1,234.50" o "1.234,50" o " $1,234 "
    const clean = v.trim()
      .replace(/\s/g, '')
      .replace(/\$/g, '')
      .replace(/,/g, '.'); // si tu backend ya manda punto decimal, esto no le afecta
    const n = parseFloat(clean);
    return isNaN(n) ? 0 : n;
  }
  const n = Number(v);
  return isNaN(n) ? 0 : n;
}

get totalApertura(): number {
  const src = this.cajas ?? [];
  return src.reduce((t, c: any) => t + this.toNumber(c?.efectivoApertura), 0);
}

get totalCierre(): number {
  const src = this.cajas ?? [];
  return src.reduce((t, c: any) => t + this.toNumber(c?.efectivoCierre), 0);
}

get diferencia(): number {
  return this.totalCierre - this.totalApertura;
}

// Considera cerrada si TIENE fecha/hora/efectivo de cierre (no solo que no sean null,
// además chequeamos strings vacíos)
private hasValue(v: any): boolean {
  return !(v === null || v === undefined || (typeof v === 'string' && v.trim() === ''));
}

get abiertas(): number {
  const src = this.cajas ?? [];
  return src.filter(c =>
    !this.hasValue(c?.fechaCierre) &&
    !this.hasValue(c?.horaCierre)  &&
    !this.hasValue(c?.efectivoCierre)
  ).length;
}

get cerradas(): number {
  const total = this.cajas?.length ?? 0;
  return total - this.abiertas;
}
async descargarPDF(caja: CajaClass) {
    try {
      await this.generarPDF(caja);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(this.pdfBlob!);
      link.download = 'reporte_ventas.pdf';
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error('No se pudo descargar PDF', err);
    }
  }
public generarPDF(caja: CajaClass): Promise<void> {
    this.isLoading = true;
    this.cdr.detectChanges(); // fuerza actualización de vista
    return new Promise((resolve, reject) => {
     
this.operacion.generarReportePDF('', '', String(caja!.id), '')
        .subscribe({
          next: (response: Blob) => {
            this.pdfBlob = response;
            const objectUrl = URL.createObjectURL(response);
            this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
            this.isLoading = false;
            this.cdr.detectChanges(); // refresca vista otra vez
            resolve();
          },
          error: (err) => {
            console.error('Error al generar PDF', err);
            this.isLoading = false;
            this.cdr.detectChanges();
            reject(err);
          }
        });
    });
  }
}
