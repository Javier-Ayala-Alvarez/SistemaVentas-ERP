import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SucursalClass } from '../../clases/sucursal-class';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { EmpresaClass } from '../../clases/empresa-class';
import { EmpresaServicesService } from '../../services/empresa-services.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-agregar-sucursal',
  templateUrl: './agregar-sucursal.component.html',
  styleUrl: './agregar-sucursal.component.scss'
})
export class AgregarSucursalComponent {

  sucursalNuevo: SucursalClass = new SucursalClass(); // Inicialización por defecto
  empresas?: EmpresaClass[];
  @Input() sucursal?: SucursalClass; // Recibe la sucursal desde el componente principal

  // UX validaciones
  intentoGuardar = false;
  toasts: ToastMsg[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private sucursalServices: SucursalServicesService,
    private empresaServices: EmpresaServicesService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  //Valores de inicio
  ngOnInit(): void {
    if (this.sucursal) {
      // normalizar fecha para input date
      this.sucursal.fecha = this.datePipe.transform(this.sucursal.fecha, 'yyyy-MM-dd') as string;
      this.sucursalNuevo = { ...this.sucursal };
    } else {
      this.sucursalNuevo = new SucursalClass();
    }
    this.loadEmpresa();
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

    if (c['codigo']?.invalid)         this.pushToast(id++, 'Ingrese un código válido');
    if (c['nombre']?.invalid)         this.pushToast(id++, 'Ingrese el nombre de la sucursal');
    if (c['direccion']?.invalid)      this.pushToast(id++, 'Ingrese la dirección');
    if (c['telefono']?.invalid)       this.pushToast(id++, 'Teléfono requerido (SV: 8 dígitos iniciando con 2, 6 o 7)');
    if (c['emailSucursal']?.invalid)  this.pushToast(id++, 'Correo electrónico válido requerido');
    if (c['fechaApertura']?.invalid)  this.pushToast(id++, 'Seleccione la fecha de apertura');
    if (c['empresa']?.invalid)        this.pushToast(id++, 'Seleccione una empresa');

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

  //Guardar Sucursal (lógica original intacta)
  guardar(){
    if (this.sucursal != null && this.sucursal.id != 0) {
      this.sucursalServices.modificar(this.sucursalNuevo.id ?? 0, this.sucursalNuevo).subscribe(() =>{
        this.cerrarYRecargar();
      });
    } else {
      this.sucursalServices.agregar(this.sucursalNuevo).subscribe(() =>{
        this.cerrarYRecargar();
      });
    }
  }

  cerrarYRecargar() {
    this.activeModal.close();
    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/component/sucursal']);
      });
    }, 200);
  }

  //mostrar datos de la empresa
  loadEmpresa() {
    this.empresaServices.buscar().subscribe((dato: any) => {
      this.empresas = dato;
      if (this.sucursalNuevo.empresa) {
        this.sucursalNuevo.empresa = this.empresas?.find(emp => emp.id === this.sucursalNuevo.empresa?.id);
      }
    });
  }
}

interface ToastMsg {
  id: number;
  message: string;
}
