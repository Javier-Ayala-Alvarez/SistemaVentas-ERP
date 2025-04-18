import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosServicesService } from '../../services/productos-services.service';
import { ProductoClass } from '../../clases/producto-class';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorClass } from '../../clases/proveedor-class';
import { loadConfig, baseUrl, imagenes } from '../../services/helper';
import { UnidadMedidaClass } from '../../clases/unidad-medida-class';
import { UnidadMedidaProductoClass } from '../../clases/unidadMedidaProducto';
import { OperacionDetalleClass } from '../../clases/operacionDetalle';
import { OperacionServicesService } from '../../services/operacion-services.service';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrl: './buscar-producto.component.scss'
})
export class BuscarProductoComponent {
  unidadesMedidaProducto?: UnidadMedidaProductoClass[];
  unidadMedidaProducto: UnidadMedidaProductoClass = new UnidadMedidaProductoClass();
  operacionDetalle: OperacionDetalleClass = new OperacionDetalleClass();
   producto?: ProductoClass[] = [];
      page: number = 0;
      size: number = 4;
      order: string = 'id';
      asc: boolean = true;
      isFirst: boolean = false;
      isLast: boolean = false;
      terminoBusqueda: string = '';
      totalPages: any[] = [];
      imagenRuta: string = "";
      cantidad: number = 0;
      descuento: number = 0;
      @Input() identificador: String = "";


        constructor(public activeModal: NgbActiveModal, private productoServices: ProductosServicesService, private operacion: OperacionServicesService, private router: Router, private route: ActivatedRoute) {}
        ngOnInit(): void {
          this.imagenRuta = imagenes;
          this.loadProducto();

        }
        //mostrar datos en la tabla
        loadProducto() {
          this.productoServices.load(this.terminoBusqueda, this.page, this.size, this.order, this.asc).subscribe(
            (dato: any) => {
              console.log( dato.content)
              this.producto = dato.content;
              this.isFirst = dato.first;
              this.isLast = dato.last;
              this.totalPages = new Array(dato.totalPages);
            }
          );
        }
        loadUnidadProducto(id: any) {
          console.log(id);
          this.productoServices.listaUnidadProductoList(id).subscribe(
            (dato: any) => {
              console.log( "s" , dato)
              this.unidadesMedidaProducto = dato;
            }
          );
        }

     
    
         guardar(unidadMedidaProducto: UnidadMedidaProductoClass) {
            this.operacionDetalle = new OperacionDetalleClass();
            this.operacionDetalle.unidadMedida = unidadMedidaProducto.unidadMedida; 
            this.operacionDetalle.producto = unidadMedidaProducto.producto;
            this.operacionDetalle.cantidad = this.cantidad;
            this.operacionDetalle.descuento = this.descuento;
            console.log(unidadMedidaProducto.precio)
            this.operacionDetalle.precioUnitario = unidadMedidaProducto.precio;
            this.operacion.agregarOperacionDetalle(this.operacionDetalle);
            console.log(this.operacionDetalle)
            if(this.identificador == "compra"){
              this.router.navigate(['/component/Nuevacompras']);
            }else if(this.identificador == "cotizacion"){
              this.router.navigate(['/component/Nuevacotizacion']);
            }else if(this.identificador == "factura"){
              this.router.navigate(['/component/factura']);
            }
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
