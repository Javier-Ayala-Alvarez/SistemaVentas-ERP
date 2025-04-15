import { Component } from '@angular/core';
import { ProveedorClass } from '../../clases/proveedor-class';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProveedoresServicesService } from '../../services/proveedores-services.service';

@Component({
  selector: 'app-buscar-proveedor',
  templateUrl: './buscar-proveedor.component.html',
  styleUrl: './buscar-proveedor.component.scss'
})
export class BuscarProveedorComponent {
  proveedor?: ProveedorClass[] = undefined;
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  terminoBusqueda: string = '';
  totalPages: any[] = [];
    constructor(public activeModal: NgbActiveModal, private proveedorServices: ProveedoresServicesService, private router: Router,) {}
    ngOnInit(): void {
      this.loadProveedor();
    }
    //mostrar datos en la tabla
    loadProveedor() {
      this.proveedorServices.load(this.terminoBusqueda, this.page, this.size, this.order, this.asc).subscribe(
        (dato: any) => {
          this.proveedor = dato.content;
          this.isFirst = dato.first;
          this.isLast = dato.last;
          this.totalPages = new Array(dato.totalPages);
        }
      );
    }

     guardar(proveedor: ProveedorClass) {
       // this.unidadMedidaProducto = new UnidadMedidaProductoClass();
        //this.unidadMedidaProducto.unidadMedida = unidadMedida;
        //this.productoServices.agregarUnidadMedida(this.unidadMedidaProducto);
        //this.router.navigate(['/component/AgregarProducto']);
        //this.activeModal.close(); // Cierra el modal (opcional)
    
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
