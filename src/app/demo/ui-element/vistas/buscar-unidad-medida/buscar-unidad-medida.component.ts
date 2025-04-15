import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UnidadMedidaClass } from '../../clases/unidad-medida-class';
import { UnidadesServicesService } from '../../services/unidades-services.service';
import { ProductosServicesService } from '../../services/productos-services.service';
import { UnidadMedidaProductoClass } from '../../clases/unidadMedidaProducto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-unidad-medida',
  templateUrl: './buscar-unidad-medida.component.html',
  styleUrl: './buscar-unidad-medida.component.scss'
})
export class BuscarUnidadMedidaComponent {
    unidadMedida: UnidadMedidaClass[] | undefined;
    unidadMedidaProducto: UnidadMedidaProductoClass = new UnidadMedidaProductoClass();
    page: number = 0;
    size: number = 8; 
    order: string = 'id';
    asc: boolean = true;
    isFirst: boolean = false;
    isLast: boolean = false;
    terminoBusqueda: string = '';
    totalPages: any[] = [];
  
  constructor(public activeModal: NgbActiveModal, private unidadServices: UnidadesServicesService, private productoServices: ProductosServicesService,private router: Router,) {}

  ngOnInit(): void {
    this.loadUnidadMedida();
  }
  //mostrar datos en la tabla
  loadUnidadMedida() {
    this.unidadServices.load(this.terminoBusqueda, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.unidadMedida = dato.content;
        this.isFirst = dato.first;
        this.isLast = dato.last;
        this.totalPages = new Array(dato.totalPages);
      }
    );
  }
  guardar(unidadMedida: UnidadMedidaClass) {
    this.unidadMedidaProducto = new UnidadMedidaProductoClass();
    this.unidadMedidaProducto.unidadMedida = unidadMedida;
    this.productoServices.agregarUnidadMedida(this.unidadMedidaProducto);
    this.router.navigate(['/component/AgregarProducto']);
    this.activeModal.close(); // Cierra el modal (opcional)

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
