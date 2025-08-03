import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CajaClass } from '../../clases/caja-class';
import { CajasServicesService } from '../../services/cajas-services.service';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { SucursalClass } from '../../clases/sucursal-class';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-caja',
  templateUrl: './agregar-caja.component.html',
  styleUrl: './agregar-caja.component.scss'
})
export class AgregarCajaComponent {
  selectComboSucursal: any ;
  sucursales: any[]= [];

  cajaNuevo: CajaClass = new CajaClass(); // Inicialización por defecto
  caja?: CajaClass; // Recibe la sucursal desde el componente principal

    modoEdicion: boolean = false;


  constructor(public activeModal: NgbActiveModal, private cajaService: CajasServicesService, private router: Router, private datePipe: DatePipe, private sucursalServices: SucursalServicesService) {}

  //Valores de inicio
  ngOnInit(): void {



    if (this.caja) {
      this.cajaNuevo = { ...this.caja }; // Copia los valores si están definidos
      this.modoEdicion = true; // Establece el modo de edición si la caja está definida
      } else {
      this.cajaNuevo = new CajaClass(); // Asegura la inicialización
      this.modoEdicion = false; // Modo de creación
    }
    this.loadSucursal();

    }

      // ✅ Validación dinámica
  validarCampos(): boolean {
    // validar sucursal en ambos casos
    if (!this.cajaNuevo.sucursal || !this.cajaNuevo.sucursal.id) {
      Swal.fire('Campos requeridos', 'Debe seleccionar una sucursal.', 'warning');
      return false;
    }

    // validar campos comunes
    if (!this.cajaNuevo.fechaInicio || !this.cajaNuevo.horaInicio || this.cajaNuevo.efectivoApertura == null) {
      Swal.fire('Campos requeridos', 'Complete Fecha de Inicio, Hora de Inicio y Efectivo de Apertura.', 'warning');
      return false;
    }

    // ✅ validación adicional en modo edición
    if (this.modoEdicion) {
      if (!this.cajaNuevo.fechaCierre || !this.cajaNuevo.horaCierre || this.cajaNuevo.efectivoCierre == null) {
        Swal.fire('Campos requeridos', 'Complete Fecha de Cierre, Hora de Cierre y Efectivo de Cierre.', 'warning');
        return false;
      }
    }

    return true;
  }


  //Guardar Caja
  guardar(){
  if (!this.validarCampos()) return;

    if (this.modoEdicion) {
      this.cajaService.modificar(this.cajaNuevo.id ?? 0, this.cajaNuevo).subscribe(() => {
        Swal.fire('Caja actualizada', 'La caja se modificó correctamente.', 'success');
        this.cerrarYRecargar();
      });
    } else {
      this.cajaService.agregar(this.cajaNuevo).subscribe(() => {
        Swal.fire('Caja creada', 'La nueva caja se creó correctamente.', 'success');
        this.cerrarYRecargar();
      });
    }
  }
  cerrarYRecargar() {
    this.activeModal.close(); // Cierra el modal primero
    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/component/cajas']);
      });
    }, 200); // Retardo de 200ms para asegurarse de que el modal se cierra antes de la navegación
  }

  //mostrar datos de la sucursal
loadSucursal() {
  this.sucursalServices.buscar().subscribe(
    (dato: any) => {
      this.sucursales = dato;
      if (this.caja) {
        this.cajaNuevo.sucursal = this.sucursales?.find(emp => emp.id === this.cajaNuevo.sucursal?.id);
      }
      }
    
  );
}

}
