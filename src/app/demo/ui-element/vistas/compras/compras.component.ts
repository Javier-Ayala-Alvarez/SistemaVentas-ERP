import { Component } from '@angular/core';
import { SucursalClass } from '../../clases/sucursal-class';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.scss'
})
export default class ComprasComponent {
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
    this.loadTipoOperacion();
  }

  AgregarNuevo(){
    console.log("Prueba");
   this.router.navigate(['/component/Nuevacompras']);
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

loadTipoOperacion() {
  this.tipoOperacionServices.buscarTipoOperacion("S").subscribe(
    (dato: any) => {
      console.log("tipoOperacion recibidas:", dato); // Verifica los datos en la consola
      this.tipoOperaciones = dato;
      console.log("tipoOperacion: ", dato[0].nombre);
      // Si hay una sucursal y una empresa, la seleccionamos en el combo
      //if (this.sucursalNuevo.empresa) {
        //this.sucursalNuevo.empresa = this.empresas?.find(emp => emp.id === this.sucursalNuevo.empresa?.id);
      }
    //}
  );
}
}
