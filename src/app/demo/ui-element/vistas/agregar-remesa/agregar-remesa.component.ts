import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RemesasServicesService } from '../../services/remesas-services.service';
import { RemesaClass } from '../../clases/remesa-class';
import { SucursalServicesService } from '../../services/sucursal-services.service';


@Component({
  selector: 'app-agregar-remesa',
  templateUrl: './agregar-remesa.component.html',
  styleUrl: './agregar-remesa.component.scss'
})
export  class AgregarRemesaComponent {

  sucursales:any[] =[];
  sucursalSelect:any; 

  remesaNuevo: RemesaClass = new RemesaClass(); // Inicialización por defecto
  remesa?: RemesaClass; // Recibe la sucursal desde el componente principal
  constructor(public activeModal: NgbActiveModal, private RemesaService: RemesasServicesService, private router: Router, private datePipe: DatePipe, private sucursalServices: SucursalServicesService) { }

 //Valores de inicio
 ngOnInit(): void {
  this.loadSucursal();
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

//mostrar datos de la sucursal
loadSucursal() {
  this.sucursalServices.buscar().subscribe(
    (dato: any) => {
      console.log("Sucursales recibidas:", dato.nombre); // Verifica los datos en la consola
      this.sucursales = dato;
      // Si hay una sucursal y una empresa, la seleccionamos en el combo
      //if (this.sucursalNuevo.empresa) {
        //this.sucursalNuevo.empresa = this.empresas?.find(emp => emp.id === this.sucursalNuevo.empresa?.id);
      }
    //}
  );
}

}
