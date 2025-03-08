import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProveedorClass } from '../../clases/proveedor-class';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProveedoresServicesService } from '../../services/proveedores-services.service';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrl: './agregar-proveedor.component.scss'
})
export class AgregarProveedorComponent {

  proveedorNuevo: ProveedorClass = new ProveedorClass(); // Inicialización por defecto
    @Input() proveedor?: ProveedorClass; // Recibe la sucursal desde el componente principal
  
  constructor(public activeModal: NgbActiveModal, private proveedorServices: ProveedoresServicesService, private router: Router, private datePipe: DatePipe) { }

  //Valores de inicio
    ngOnInit(): void {
      if (this.proveedor) {
        this.proveedor.fecha = this.datePipe.transform(this.proveedor.fecha, 'yyyy-MM-dd') as string;
        this.proveedorNuevo = { ...this.proveedor }; // Copia los valores si está definido
      } else {
        this.proveedorNuevo = new ProveedorClass(); // Asegura la inicialización
      }
      console.log("proveedor: " + JSON.stringify(this.proveedorNuevo));
      
    }

    //Guardar Sucursal
  guardar(){
    if (this.proveedor != null) {
      this.proveedorServices.modificar(this.proveedorNuevo.id ?? 0, this.proveedorNuevo).subscribe(()=>{
        this.cerrarYRecargar();
      });

    } else {
      this.proveedorServices.agregar(this.proveedorNuevo).subscribe(() =>{
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
