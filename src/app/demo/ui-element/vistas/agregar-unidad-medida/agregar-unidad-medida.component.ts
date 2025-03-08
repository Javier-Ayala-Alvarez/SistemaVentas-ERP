import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UnidadesServicesService } from '../../services/unidades-services.service';
import { UnidadMedidaClass } from '../../clases/unidad-medida-class';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-agregar-unidad-medida',
  templateUrl: './agregar-unidad-medida.component.html',
  styleUrl: './agregar-unidad-medida.component.scss'
})
export class AgregarUnidadMedidaComponent {

  unidadNuevo: UnidadMedidaClass = new UnidadMedidaClass(); // Inicialización por defecto
  unidad?: UnidadMedidaClass; // Recibe la sucursal desde el componente principal

  constructor(public activeModal: NgbActiveModal, private unidadService: UnidadesServicesService, private router: Router, private datePipe: DatePipe) { }


  //Valores de inicio
  ngOnInit(): void {
    if (this.unidad) {
      this.unidadNuevo = { ...this.unidad }; // Copia los valores si está definido
    } else {
      this.unidadNuevo = new UnidadMedidaClass(); // Asegura la inicialización
    }
  }
  //Guardar Gasto
  guardar(){
    if (this.unidad != null) {
      this.unidadService.modificar(this.unidadNuevo.id ?? 0, this.unidadNuevo).subscribe(() =>{
        this.cerrarYRecargar();
      })

    } else {
      this.unidadService.agregar(this.unidadNuevo).subscribe(() =>{
        this.cerrarYRecargar();
      })
       
      
    }
    
  }
  cerrarYRecargar() {
    this.activeModal.close(); // Cierra el modal primero
    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/component/unidades']);
      });
    }, 200); // Retardo de 200ms para asegurarse de que el modal se cierra antes de la navegación
  }


}
