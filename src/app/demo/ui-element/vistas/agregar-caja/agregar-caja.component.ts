import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CajaClass } from '../../clases/caja-class';
import { CajasServicesService } from '../../services/cajas-services.service';

@Component({
  selector: 'app-agregar-caja',
  templateUrl: './agregar-caja.component.html',
  styleUrl: './agregar-caja.component.scss'
})
export class AgregarCajaComponent {

  cajaNuevo: CajaClass = new CajaClass(); // Inicialización por defecto
  caja?: CajaClass; // Recibe la sucursal desde el componente principal

  constructor(public activeModal: NgbActiveModal, private cajaService: CajasServicesService, private router: Router, private datePipe: DatePipe) {}

  //Valores de inicio
  ngOnInit(): void {
    if (this.caja) {
      this.cajaNuevo = { ...this.caja }; // Copia los valores si está definido
    } else {
      this.cajaNuevo = new CajaClass(); // Asegura la inicialización
    }
  }


  //Guardar Caja
  guardar(){
    if (this.caja != null) {
      this.cajaService.modificar(this.cajaNuevo.id ?? 0, this.cajaNuevo).subscribe();

    } else {
      this.cajaService.agregar(this.cajaNuevo).subscribe();
    }
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/component/cajas']);
    });
    this.activeModal.close(); // Cierra el modal (opcional)

  }

}
