import { Component } from '@angular/core';
import { AgregarRemesaComponent } from '../agregar-remesa/agregar-remesa.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RemesasServicesService } from '../../services/remesas-services.service';
import { RemesaClass } from '../../clases/remesa-class';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { CajasServicesService } from '../../services/cajas-services.service';

@Component({
  selector: 'app-remesas',
  templateUrl: './remesas.component.html',
  styleUrl: './remesas.component.scss'
})
export default class RemesasComponent {
  filtroCodigo: string = '';
  filtroCantidad: string = '';
  filtroIdSucursal: string = '';
  filtroIdCaja: string = '';

  remesas: RemesaClass[] | undefined;
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  terminoBusqueda: string = '';
  totalPages: any[] = [];
  sucursales: any[] = [];
  sucursalSelect: any;
  cajaSelect: any;
  cajas: any[] = [];
  caja: any;

  constructor(private modalService: NgbModal, private cajaServices: CajasServicesService, private remesasServices: RemesasServicesService, private sucursalServices: SucursalServicesService, private cajasServices: CajasServicesService) { }

  ngOnInit(): void {
    this.loadRemesas();
    this.loadSucursal();
    this.loadCajas();

  }

  agregar(): void {
    this.openModal();
  }

  openModal(remesa?: RemesaClass): void {
    const modalRef = this.modalService.open(AgregarRemesaComponent, {
      size: 'lg',
      centered: true
    });
    // Pasar datos al modal
    if (remesa) {
      modalRef.componentInstance.remesa = remesa;
    }

  }

  editar(remesa: RemesaClass): void {
    this.openModal(remesa);
  }
  eliminar(remesa: RemesaClass): void {
    this.remesasServices.eliminar(remesa.id ?? 0, remesa).subscribe(

      () => {
        this.loadRemesas();
      }

    );
  }

  //mostrar datos en la tabla
  loadRemesas() {
    this.loadCajas();
    this.remesasServices.load(this.busqueda, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.remesas = dato.content;
        this.isFirst = dato.first;
        this.isLast = dato.last;
        this.totalPages = new Array(dato.totalPages);
      }
    );
  }

  //mostrar datos de la empresa
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
  loadCajas() {
    if (this.filtroIdSucursal) {
      this.cajasServices.buscar01().subscribe(
        (dato: any) => {
          this.cajas = dato;
        }

      );
    }
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
  get busqueda(): string {
    const partes = [];
    if (this.filtroCodigo) partes.push(`codigo:${this.filtroCodigo}`);
    if (this.filtroIdSucursal) partes.push(`idSucursal:${this.filtroIdSucursal}`);
    if (this.filtroIdCaja) partes.push(`idCaja:${this.cajaSelect}`);
    if (this.filtroCantidad) partes.push(`cantidad:${this.filtroCantidad}`);
    // if (this.filtroNit) partes.push(`nit:${this.filtroNit}`);
    return partes.join(',');
  }
  ordenarPor(campo: string): void {
    if (this.order === campo) {
      this.asc = !this.asc;
    } else { 
      this.order = campo;
      this.asc = true;
    }
    this.loadRemesas();
  }

}
