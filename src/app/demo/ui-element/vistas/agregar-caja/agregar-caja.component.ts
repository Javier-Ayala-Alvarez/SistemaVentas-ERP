import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CajaClass } from '../../clases/caja-class';
import { CajasServicesService } from '../../services/cajas-services.service';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { SucursalClass } from '../../clases/sucursal-class';

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

  constructor(public activeModal: NgbActiveModal, private cajaService: CajasServicesService, private router: Router, private datePipe: DatePipe, private sucursalServices: SucursalServicesService) {}

  //Valores de inicio
  ngOnInit(): void {

    if (this.caja) {
      this.cajaNuevo = { ...this.caja }; // Copia los valores si están definidos
      } else {
      this.cajaNuevo = new CajaClass(); // Asegura la inicialización
    }
    this.loadSucursal();

    }


  //Guardar Caja
  guardar(){
    if (!this.cajaNuevo.sucursal) {
      this.cajaNuevo.sucursal = new SucursalClass();
  }
  
    if (this.caja != null) {
      this.cajaService.modificar(this.cajaNuevo.id ?? 0, this.cajaNuevo).subscribe(() =>{
        this.cerrarYRecargar();
      });

    } else {
      this.cajaService.agregar(this.cajaNuevo).subscribe(() => {
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
        console.log("Entre")
        this.cajaNuevo.sucursal = this.sucursales?.find(emp => emp.id === this.cajaNuevo.sucursal?.id);
      }
      }
    
  );
}

}
