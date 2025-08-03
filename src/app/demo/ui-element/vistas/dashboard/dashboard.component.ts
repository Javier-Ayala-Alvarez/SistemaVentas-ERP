import { Component } from '@angular/core';
import { ProductoClass } from '../../clases/producto-class';
import { Router, ActivatedRoute } from '@angular/router';
import { OperacionServicesService } from '../../services/operacion-services.service';
import { ProductosServicesService } from '../../services/productos-services.service';
import { UnidadMedidaProductoClass } from '../../clases/unidadMedidaProducto';
import { loadConfig, baseUrl, imagenes } from '../../services/helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent {
   producto?: ProductoClass[] = [];
   unidadesMedidaProducto: { [key: number]: UnidadMedidaProductoClass[] } = {};
   preciosVisible: { [key: number]: boolean } = {};  // Estado de visibilidad de precios para cada producto

   page: number = 0;
   size: number = 8;
   order: string = 'id';
   asc: boolean = true;
   isFirst: boolean = false;
   isLast: boolean = false;
   terminoBusqueda: string = '';
   totalPages: any[] = [];
   imagenRuta: string = "";

   constructor(private productoServices: ProductosServicesService, private operacion: OperacionServicesService, private router: Router, private route: ActivatedRoute) {}

   ngOnInit(): void {
     this.imagenRuta = imagenes;  // Ajusta a tu ruta de imágenes
     this.loadProducto();
   }

   loadProducto() {
     this.productoServices.load(this.terminoBusqueda, this.page, this.size, this.order, this.asc).subscribe(
       (dato: any) => {
         this.producto = dato.content;
         this.isFirst = dato.first;
         this.isLast = dato.last;
         this.totalPages = new Array(dato.totalPages);
       }
     );
   }

   loadUnidadProducto(id: any) {
     this.productoServices.listaUnidadProductoList(id).subscribe(
       (dato: any) => {
         this.unidadesMedidaProducto[id] = dato || [];
         this.togglePreciosVisibility(id);  // Alternar la visibilidad de precios al hacer clic
       }
     );
   }

   // Alternar la visibilidad de precios para un producto específico
   togglePreciosVisibility(id: number): void {
     this.preciosVisible[id] = !this.preciosVisible[id];  // Cambiar el estado de visibilidad
   }

   paginaSiguiente(): void {
     if (!this.isLast) {
       this.page++;
       this.ngOnInit();
     }
   }

   paginaAnterior(): void {
     if (!this.isFirst) {
       this.page--;
       this.ngOnInit();
     }
   }
}
