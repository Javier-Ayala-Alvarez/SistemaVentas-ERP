import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProveedorClass } from '../../clases/proveedor-class';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProveedoresServicesService } from '../../services/proveedores-services.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrl: './agregar-proveedor.component.scss'
})
export class AgregarProveedorComponent {

  proveedorNuevo: ProveedorClass = new ProveedorClass(); // Inicialización por defecto
  @Input() proveedor?: ProveedorClass; // Recibe la sucursal desde el componente principal

  // UX validación
  intentoGuardar = false;
  toasts: ToastMsg[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private proveedorServices: ProveedoresServicesService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  //Valores de inicio
  ngOnInit(): void {
    if (this.proveedor) {
      this.proveedor.fecha = this.datePipe.transform(this.proveedor.fecha, 'yyyy-MM-dd') as string;
      this.proveedorNuevo = { ...this.proveedor }; // Copia los valores si está definido
    } else {
      this.proveedorNuevo = new ProveedorClass(); // Asegura la inicialización
    }
  }

  // =========================
  // VALIDACIÓN PREVIA + TOAST
  // =========================
  preGuardar(form: NgForm) {
    this.intentoGuardar = true;
    form.form.markAllAsTouched();

    this.toasts = [];
    let id = Date.now();
    const c = form.controls as any;

    if (c['nombreProveedor']?.invalid)   this.pushToast(id++, 'Ingresar nombre válido');
    if (c['apellidoProveedor']?.invalid) this.pushToast(id++, 'Ingresar apellido válido');
    if (c['direccionProveedor']?.invalid)this.pushToast(id++, 'Ingresar dirección válida');
    if (c['telefonoProveedor']?.invalid) this.pushToast(id++, 'Teléfono inválido (formato SV 8 dígitos 2/6/7)');
    if (c['emailProveedor']?.invalid)    this.pushToast(id++, 'Correo electrónico inválido');
    if (c['duiProveedor']?.invalid)      this.pushToast(id++, 'DUI inválido (########-#)');
    if (c['nitProveedor']?.invalid)      this.pushToast(id++, 'NIT inválido (####-######-###-#)');

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

  //Guardar (lógica original intacta)
  guardar() {
    if (this.proveedor != null) {
      this.proveedorServices.modificar(this.proveedorNuevo.id ?? 0, this.proveedorNuevo).subscribe(() => {
        this.cerrarYRecargar();
      });

    } else {
      this.proveedorServices.agregar(this.proveedorNuevo).subscribe(() => {
        this.cerrarYRecargar();
      });
    }
  }

  cerrarYRecargar() {
    this.activeModal.close(); // Cierra el modal primero
    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/component/proveedores']);
      });
    }, 200); // Retardo de 200ms para asegurarse de que el modal se cierra antes de la navegación
  }

}

// interfaz para toasts
export interface ToastMsg {
  id: number;
  message: string;
}
