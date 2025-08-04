import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {GastosServicesService } from '../../services/gastos-services.service'; 	
import { GastoClass } from '../../clases/gasto-class';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { CajasServicesService } from '../../services/cajas-services.service';
import { LoginServicesService } from '../../services/login-services.service';

@Component({
  selector: 'app-agregar-gastos',
  templateUrl: './agregar-gastos.component.html',
  styleUrl: './agregar-gastos.component.scss'
})
export class AgregarGastosComponent {
  gastoNuevo: GastoClass = new GastoClass(); // Inicialización por defecto
  gasto?: GastoClass; // Recibe la sucursal desde el componente principal
  sucursales: any[] = [];
  cajas: any[] = [];

  constructor(public activeModal: NgbActiveModal, private loginServices: LoginServicesService, private gastoService: GastosServicesService,private sucursalServices: SucursalServicesService, private router: Router, private datePipe: DatePipe,private cajaServices: CajasServicesService) {}

   //Valores de inicio
   ngOnInit(): void {
    if (this.gasto) {
      this.gastoNuevo = { ...this.gasto }; // Copia los valores si está definido
    } else {
      this.gastoNuevo = new GastoClass(); // Asegura la inicialización
    }
    this.loadSucursal();
  }

   //Guardar Gasto
   guardar(){
    
    if (this.gasto != null) {
      this.gastoNuevo.usuarioModificacion = this.loginServices.getUser();
      this.gastoService.modificar(this.gastoNuevo.id ?? 0, this.gastoNuevo).subscribe(()=>{
        this.cerrarYRecargar();
      });

    } else {
      this.gastoNuevo.usuarioCreacion =this.loginServices.getUser();
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
  //mostrar datos de la sucursal
  loadSucursal() {
    this.sucursalServices.buscar().subscribe((dato: any) => {
      this.sucursales = dato;

      // 1. Si ya hay una sucursal seleccionada previamente (por ID), la usamos
      if (this.gastoNuevo.sucursal?.id) {
        this.gastoNuevo.sucursal = this.sucursales.find(emp => emp.id === this.gastoNuevo.sucursal?.id);
      }
      // 2. Si hay una sucursal con select === true, la usamos
      else {
        const seleccionado = this.sucursales.find(dep => dep.select === true);
        if (seleccionado) {
          this.gastoNuevo.sucursal = seleccionado;
        }
        // 3. Si no, usamos la primera
        else if (this.sucursales.length > 0) {
          this.gastoNuevo.sucursal = this.sucursales[0];
        }
      }

      this.loadCaja();
    });
  }

   loadCaja() {
    const sucursalId = this.gastoNuevo?.sucursal?.id;

    if (!sucursalId) return;

    this.cajaServices.buscar(sucursalId).subscribe((dato: any) => {
      this.cajas = dato;

      // 1. Si ya hay una caja con ID, busca la correspondiente
      if (this.gastoNuevo.caja?.id) {
        this.gastoNuevo.caja = this.cajas.find(c => c.id === this.gastoNuevo.caja?.id);
      }
      // 2. Si hay alguna marcada como seleccionada, usarla
      else {
        const seleccionado = this.cajas.find(c => c.select === true);
        if (seleccionado) {
          this.gastoNuevo.caja = seleccionado;
        }
        // 3. Si no, usar la primera de la lista
        else if (this.cajas.length > 0) {
          this.gastoNuevo.caja = this.cajas[0];
        }
      }
    });
  }
 onSucursalChange(sucursalSeleccionada: any) {
    this.gastoNuevo.sucursal = sucursalSeleccionada;
    this.loadCaja();
  }

}
