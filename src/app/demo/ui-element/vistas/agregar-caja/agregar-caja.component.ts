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
    this.loadSucursal();
    if (this.caja) {
      console.log("✅ Caja recibida en ngOnInit():", JSON.stringify(this.caja, null, 2));
  
      this.cajaNuevo = { ...this.caja }; // Copia los valores si están definidos
  
      console.log("📦 Datos copiados a cajaNuevo:", JSON.stringify(this.cajaNuevo, null, 2));
    } else {
      console.log("⚠️ No se recibió ninguna caja, inicializando cajaNueva.");
      this.cajaNuevo = new CajaClass(); // Asegura la inicialización
    }
  }


  //Guardar Caja
  guardar(){
    console.log("entree");
    if (!this.cajaNuevo.sucursal) {
      this.cajaNuevo.sucursal = new SucursalClass();
  }
  this.cajaNuevo.sucursal = this.selectComboSucursal;
  
    if (this.caja != null) {
      this.cajaService.modificar(this.cajaNuevo.id ?? 0, this.cajaNuevo).subscribe();
      console.log("id a guardar de caja" , this.cajaNuevo.id);

    } else {
      this.cajaService.agregar(this.cajaNuevo).subscribe();
    }
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/component/cajas']);
    });
    this.activeModal.close(); // Cierra el modal (opcional)

  }

  //mostrar datos de la sucursal
loadSucursal() {
  this.sucursalServices.buscar().subscribe(
    (dato: any) => {
      this.sucursales = dato;
      // Si hay una sucursal y una empresa, la seleccionamos en el combo
      //if (this.sucursalNuevo.empresa) {
        //this.sucursalNuevo.empresa = this.empresas?.find(emp => emp.id === this.sucursalNuevo.empresa?.id);
      }
    //}
  );
}

}
