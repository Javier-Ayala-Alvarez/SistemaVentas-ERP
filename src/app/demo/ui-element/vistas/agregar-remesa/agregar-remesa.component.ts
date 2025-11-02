import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RemesasServicesService } from '../../services/remesas-services.service';
import { RemesaClass } from '../../clases/remesa-class';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { CajasServicesService } from '../../services/cajas-services.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-agregar-remesa',
  templateUrl: './agregar-remesa.component.html',
  styleUrl: './agregar-remesa.component.scss'
})
export class AgregarRemesaComponent {

  sucursales: any[] = [];
  sucursalSelect: any;
  cajas: any[] = [];
  selectComboCaja: any[] = [];

  remesaNuevo: RemesaClass = new RemesaClass(); // Inicialización por defecto
  remesa?: RemesaClass; // Recibe la sucursal desde el componente principal

  // UX de validación
  intentoGuardar = false;
  toasts: ToastMsg[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private RemesaService: RemesasServicesService,
    private router: Router,
    private datePipe: DatePipe,
    private sucursalServices: SucursalServicesService,
    private cajasServices: CajasServicesService
  ) {}

  // Valores de inicio
  ngOnInit(): void {
    this.remesaNuevo = new RemesaClass(); // Asegura la inicialización

    if (this.remesa) {
      this.remesaNuevo = { ...this.remesa }; // Copia los valores si está definido
      this.sucursalSelect = this.remesaNuevo.sucursal;
    }
    this.loadSucursal();
    // Si ya hay sucursal seleccionada (por edición), cargar cajas
    this.loadCajas();
  }

  // =========================
  // VALIDACIÓN PREVIA + TOAST
  // =========================
  preGuardar(form: NgForm) {
    this.intentoGuardar = true;
    form.form.markAllAsTouched();

    // limpiar toasts y construir mensajes
    this.toasts = [];
    let id = Date.now();
    const c = form.controls as any;

    if (c['sucursal']?.invalid)  this.pushToast(id++, 'Seleccione una sucursal');
    if (c['caja']?.invalid)      this.pushToast(id++, 'Seleccione una caja');
    if (c['cantidad']?.invalid)  this.pushToast(id++, 'Ingrese una cantidad válida (> 0)');

    if (form.invalid || this.toasts.length > 0) return;

    // OK -> lógica original
    this.guardar();
  }

  // Helpers toasts
  pushToast(id: number, message: string) {
    this.toasts.push({ id, message });
    setTimeout(() => this.removeToast(id), 4500);
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  // Guardar Remesa (lógica original intacta)
  guardar() {
    if (this.remesa != null) {
      this.RemesaService.modificar(this.remesaNuevo.id ?? 0, this.remesaNuevo).subscribe(() => {
        this.cerrarYRecargar();
      });
    } else {
      this.RemesaService.agregar(this.remesaNuevo).subscribe(() => {
        this.cerrarYRecargar();
      });
    }
  }

  cerrarYRecargar() {
    this.activeModal.close(); // Cierra el modal primero
    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/component/remesas']);
      });
    }, 200); // Retardo de 200ms para asegurarse de que el modal se cierra antes de la navegación
  }

  // Datos de sucursal
  loadSucursal() {
    this.sucursalServices.buscar().subscribe((dato: any) => {
      this.sucursales = dato;

      // Si ya hay una sucursal seleccionada, mapear por id
      if (this.remesaNuevo.sucursal?.id) {
        this.remesaNuevo.sucursal = this.sucursales.find(emp => emp.id === this.remesaNuevo.sucursal?.id);
      } else if (!this.remesaNuevo.sucursal && this.sucursales.length > 0) {
        // opcional: preseleccionar la primera
        // this.remesaNuevo.sucursal = this.sucursales[0];
      }

      // Actualizar sucursalSelect y recargar cajas
      this.sucursalSelect = this.remesaNuevo.sucursal ?? this.sucursalSelect;
      this.loadCajas();
    });
  }

  onSucursalChange(sucursalSeleccionada: any) {
    // Corrige asignación: aquí debe asignarse la sucursal, no la caja
    this.remesaNuevo.sucursal = sucursalSeleccionada;
    this.sucursalSelect = sucursalSeleccionada;
    this.remesaNuevo.caja = null as any; // reset caja al cambiar sucursal
    this.loadCajas();
  }

  // Datos de cajas según sucursal
  loadCajas() {
    if (!this.sucursalSelect?.id) {
      this.cajas = [];
      return;
    }

    this.cajasServices.buscar(this.sucursalSelect.id).subscribe((dato: any) => {
      this.cajas = dato;

      if (this.remesa) {
        // edición: mapear caja por id si existe
        if (this.remesaNuevo.caja?.id) {
          this.remesaNuevo.caja = this.cajas.find(emp => emp.id === this.remesaNuevo.caja?.id);
        }
      } else {
        // creación: si quieres autoseleccionar, puedes usar la primera o la marcada como select
        const preselect = this.cajas.find((c: any) => c.select === true);
        this.remesaNuevo.caja = preselect ?? this.remesaNuevo.caja ?? null;
      }
    });
  }
}

// interfaz para toasts
export interface ToastMsg {
  id: number;
  message: string;
}
