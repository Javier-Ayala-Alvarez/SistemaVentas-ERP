import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {GastosServicesService } from '../../services/gastos-services.service'; 	
import { GastoClass } from '../../clases/gasto-class';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-agregar-gastos',
  templateUrl: './agregar-gastos.component.html',
  styleUrl: './agregar-gastos.component.scss'
})
export class AgregarGastosComponent {
  gastoNuevo: GastoClass = new GastoClass(); // Inicialización por defecto
  gasto?: GastoClass; // Recibe la sucursal desde el componente principal

  constructor(public activeModal: NgbActiveModal, private gastoService: GastosServicesService, private router: Router, private datePipe: DatePipe) {}

   //Valores de inicio
   ngOnInit(): void {
    if (this.gasto) {
      this.gastoNuevo = { ...this.gasto }; // Copia los valores si está definido
    } else {
      this.gastoNuevo = new GastoClass(); // Asegura la inicialización
    }
  }

   //Guardar Gasto
   guardar(){
    if (this.gasto != null) {
      this.gastoService.modificar(this.gastoNuevo.id ?? 0, this.gastoNuevo).subscribe(()=>{
        this.cerrarYRecargar();
      });

    } else {
      this.gastoService.agregar(this.gastoNuevo).subscribe(()=>
      {
        this.cerrarYRecargar();
      });
    }
  
  }
  cerrarYRecargar() {
    this.activeModal.close(); // Cierra el modal primero
    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/component/gastos']);
      });
    }, 200); // Retardo de 200ms para asegurarse de que el modal se cierra antes de la navegación
  }

}
