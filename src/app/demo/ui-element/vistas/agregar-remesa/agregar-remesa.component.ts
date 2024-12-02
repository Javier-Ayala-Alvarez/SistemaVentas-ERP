import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RemesasServicesService } from '../../services/remesas-services.service';
import { RemesaClass } from '../../clases/remesa-class';


@Component({
  selector: 'app-agregar-remesa',
  templateUrl: './agregar-remesa.component.html',
  styleUrl: './agregar-remesa.component.scss'
})
export  class AgregarRemesaComponent {

  remesaNuevo: RemesaClass = new RemesaClass(); // Inicialización por defecto
  remesa?: RemesaClass; // Recibe la sucursal desde el componente principal
  constructor(public activeModal: NgbActiveModal, private RemesaService: RemesasServicesService, private router: Router, private datePipe: DatePipe) { }

 //Valores de inicio
 ngOnInit(): void {
  if (this.remesa) {
    this.remesaNuevo = { ...this.remesa }; // Copia los valores si está definido
  } else {
    this.remesaNuevo = new RemesaClass(); // Asegura la inicialización
  }
}

//Guardar Remesa
guardar(){
  if (this.remesa != null) {
    this.RemesaService.modificar(this.remesaNuevo.id ?? 0, this.remesaNuevo).subscribe();

  } else {
    this.RemesaService.agregar(this.remesaNuevo).subscribe();
  }
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/component/remesas']);
  });
  this.activeModal.close(); // Cierra el modal (opcional)

}

}
