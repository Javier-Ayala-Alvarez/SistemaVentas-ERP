import { Component, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';


export interface Producto {
  codigo: string;
  descripcion: string;
  cantidad: number;
  descuento: number;
  valorUnitario: number;
  exento: number;
  iva: number;
  total: number;
}

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export default class cotizacionesComponent implements OnInit {
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  selectComboSucursal: any | null= null;
  totalPages: any[] = [];
  sucursales: any[]= [];
  tipoOperaciones: any[]= [];
  selectComboTipoOperacion: any | null= null;
 



constructor(private router: Router, private sucursalServices: SucursalServicesService, private tipoOperacionServices : TipoOperacionServicesService) { }

ngOnInit(): void {
  this.loadSucursal();

}

AgregarNuevo(){
  console.log("Prueba");
 this.router.navigate(['/component/Nuevacotizacion']);
}
  


 //mostrar datos de la sucursal
loadSucursal() {
this.sucursalServices.buscar().subscribe(
  (dato: any) => {
    console.log("Sucursales recibidas:", dato); // Verifica los datos en la consola
    this.sucursales = dato;
    console.log("sucursal: ", dato[0].nombre);
    // Si hay una sucursal y una empresa, la seleccionamos en el combo
    //if (this.sucursalNuevo.empresa) {
      //this.sucursalNuevo.empresa = this.empresas?.find(emp => emp.id === this.sucursalNuevo.empresa?.id);
    }
  //}
);
}


}


