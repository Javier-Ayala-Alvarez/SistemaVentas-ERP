import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { OperacionServicesService } from '../../services/operacion-services.service';
import { SucursalServicesService } from '../../services/sucursal-services.service';

declare var bootstrap: any;

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.scss']
})
export class ReporteVentasComponent {
  filtros = { fechaInicio: '', fechaFin: '', numeroCaja: '', idSucursal: '' };
  pdfUrl: SafeResourceUrl | null = null;
  pdfBlob: Blob | null = null;
  sucursales: any[] = [];
  isLoading: boolean = false;

  @ViewChild('modalRef', { static: false }) modalRef!: ElementRef;
  modalInstance: any;

  constructor(
    private operacion: OperacionServicesService,
    private sanitizer: DomSanitizer,
    private sucursalServices: SucursalServicesService,
    private cdr: ChangeDetectorRef // importante
  ) {}

  ngOnInit(): void {
    this.loadSucursal();
  }

  private generarPDF(): Promise<void> {
    this.isLoading = true;
    this.cdr.detectChanges(); // fuerza actualización de vista
    return new Promise((resolve, reject) => {
      const { fechaInicio, fechaFin, numeroCaja, idSucursal } = this.filtros;
     
      this.operacion.generarReportePDF(fechaInicio, fechaFin, numeroCaja, idSucursal)
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

  async abrirVistaPrevia() {
    try {
      await this.generarPDF();
      this.mostrarModal();
    } catch (err) {
      console.error('No se pudo abrir vista previa', err);
    }
  }

  private mostrarModal() {
    if (!this.modalInstance) {
      this.modalInstance = new bootstrap.Modal(this.modalRef.nativeElement);
    }
    this.modalInstance.show();
  }

  cerrarModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  async descargarPDF() {
    try {
      await this.generarPDF();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(this.pdfBlob!);
      link.download = 'reporte_ventas.pdf';
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error('No se pudo descargar PDF', err);
    }
  }

  loadSucursal() {
    this.sucursalServices.buscar().subscribe((dato: any) => {
      this.sucursales = dato;
    });
  }
}
