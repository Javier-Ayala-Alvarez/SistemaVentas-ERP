import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarSucursalComponent } from '../agregar-sucursal/agregar-sucursal.component';
import { SucursalClass } from '../../clases/sucursal-class';
import { SucursalServicesService } from '../../services/sucursal-services.service';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrl: './sucursal.component.scss'
})
export default class SucursalComponent {

  sucursales: SucursalClass[] | undefined;
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  terminoBusqueda: string = '';
  totalPages: any[] = []; 

  constructor(private modalService: NgbModal, private sucursalServices: SucursalServicesService) {
  }
  ngOnInit(): void {
    this.loadSucursales();
  }

  openModal(sucursal?: SucursalClass): void {
    const modalRef = this.modalService.open(AgregarSucursalComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.sucursal = sucursal; // Pasar datos al modal (opcional)
  }
  
  agregar(): void {
    this.openModal();
  }
  
  editar(sucursal: SucursalClass): void {
    this.openModal(sucursal);
  }
  elimiar(sucursal: SucursalClass): void {
    this.sucursalServices.eliminar(sucursal.id ?? 0, sucursal).subscribe(
      () => {
        this.loadSucursales();
      },
    );
   
  }

   
  
  

//mostrar datos en la tabla
  loadSucursales() {
    this.sucursalServices.load(this.terminoBusqueda, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.sucursales = dato.content;
        this.isFirst = dato.first;
        this.isLast = dato.last;
        this.totalPages = new Array(dato.totalPages);
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

}
