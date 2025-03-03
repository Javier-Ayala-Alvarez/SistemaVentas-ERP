import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarCajaComponent } from '../agregar-caja/agregar-caja.component';
import { CajasServicesService } from '../../services/cajas-services.service';
import { CajaClass } from '../../clases/caja-class';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { SucursalClass } from '../../clases/sucursal-class';



@Component({
  selector: 'app-cajas',
  templateUrl: './cajas.component.html',
  styleUrl: './cajas.component.scss'
})
export default class CajasComponent {
  cajas: CajaClass[] | undefined;
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  selectComboSucursal?: SucursalClass = new SucursalClass();
  totalPages: any[] = [];
  sucursales: any[]= [];
  constructor(private modalService: NgbModal, private cajasServices: CajasServicesService, private sucursalServices: SucursalServicesService) { }


  ngOnInit(): void {
    this.loadcajas();
    this.loadSucursal();
    
    
  }

  agregar(): void {
    this.openModal();
  }

  openModal(caja?: CajaClass): void {
    const modalRef = this.modalService.open(AgregarCajaComponent, {
      size: 'lg',
      centered: true
    });
    // Pasar datos al modal
  if (caja) {
    modalRef.componentInstance.caja = caja;
  }
    
  }


  
  editar(caja: CajaClass): void {
    this.openModal(caja);
  }
  eliminar(caja: CajaClass): void {
    this.cajasServices.eliminar(caja.id ?? 0, caja);
    this.loadcajas();
  }


  //mostrar datos en la tabla
  loadcajas() {
    this.cajasServices.load(this.selectComboSucursal?.id || 0, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.cajas = dato.content;
        this.isFirst = dato.first;
        this.isLast = dato.last;
        this.totalPages = new Array(dato.totalPages);
        console.log("Datos<",this.cajas)
      }
    );
  }


  //Ir a la siguiente pagina
  paginaSiguiente(): void {
    if (!this.isLast) {
      this.page++;
      this.ngOnInit();
    }
  }
  //ir a la pagina anterior
  paginaAnterior(): void {
    if (!this.isFirst) {
      this.page--;
      this.ngOnInit();
    }
  }

  //mostrar datos de la sucursal
loadSucursal() {
  this.sucursalServices.buscar().subscribe(
    (dato: any) => {
      console.log("Sucursales recibidas:", dato); // Verifica los datos en la consola
      this.sucursales = dato;
      // Si hay una sucursal y una empresa, la seleccionamos en el combo
      //if (this.sucursalNuevo.empresa) {
        //this.sucursalNuevo.empresa = this.empresas?.find(emp => emp.id === this.sucursalNuevo.empresa?.id);
      }
    //}
  );
}

  

}
