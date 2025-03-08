import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RemesasServicesService } from '../../services/remesas-services.service';
import { RemesaClass } from '../../clases/remesa-class';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { CajasServicesService } from '../../services/cajas-services.service';


@Component({
  selector: 'app-agregar-remesa',
  templateUrl: './agregar-remesa.component.html',
  styleUrl: './agregar-remesa.component.scss'
})
export  class AgregarRemesaComponent {

  sucursales:any[] =[];
  sucursalSelect:any; 
  cajas: any[] = [];
  selectComboCaja: any[]=[];

  remesaNuevo: RemesaClass = new RemesaClass(); // Inicialización por defecto
  remesa?: RemesaClass; // Recibe la sucursal desde el componente principal
  constructor(public activeModal: NgbActiveModal, private RemesaService: RemesasServicesService, private router: Router, private datePipe: DatePipe, private sucursalServices: SucursalServicesService, private cajasServices: CajasServicesService) { }

 //Valores de inicio
 ngOnInit(): void {
  this.remesaNuevo = new RemesaClass(); // Asegura la inicialización

  if (this.remesa) {
    this.remesaNuevo = { ...this.remesa }; // Copia los valores si está definido
  } 
  console.log("Remesa",this.remesaNuevo)

  this.loadCajas();
 
  this.loadSucursal();

}

//Guardar Remesa
guardar(){
  console.log("Remesa: ",this.remesaNuevo)
  if (this.remesa != null) {
    this.RemesaService.modificar(this.remesaNuevo.id ?? 0, this.remesaNuevo).subscribe(()=>{
      this.cerrarYRecargar();
    });

  } else {
    this.RemesaService.agregar(this.remesaNuevo).subscribe(()=>{
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

//mostrar datos de la sucursal
loadSucursal() {
  this.sucursalServices.buscar().subscribe(
    (dato: any) => {
      console.log("Sucursales recibidas:", dato[0].nombre); // Verifica los datos en la consola
      this.sucursales = dato;
      if (this.remesa) {
        this.remesaNuevo.sucursal = this.sucursales?.find(emp => emp.id === this.remesaNuevo.sucursal?.id);
      }
    }
  );
}

//mostrar datos de la sucursal
loadCajas() {
  this.cajasServices.buscarCaja().subscribe(
    (dato: any) => {
      console.log("cajas recibidas:", dato[0].id); // Verifica los datos en la consola
      this.cajas = dato;
     
      if (this.remesa) {
        this.remesaNuevo.caja = this.cajas?.find(emp => emp.id === this.remesaNuevo.caja?.id);
      }
      }
    
  );
}

}
