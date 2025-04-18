import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoClass } from '../../clases/producto-class';
import { ProductosServicesService } from '../../services/productos-services.service'; 
import { loadConfig, baseUrl, imagenes } from '../../services/helper';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html', 
  styleUrl: './productos.component.scss'
})
export default class ProductosComponent {

  productos: ProductoClass[] | undefined;
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  terminoBusqueda: string = '';
  totalPages: any[] = [];
  imagenRuta: string = "";

  constructor(private router: Router, private modalService: NgbModal, private productosService: ProductosServicesService) { }


  ngOnInit(): void {
    this.imagenRuta = imagenes;
    this.loadproductos();
  }

  AgregarNuevo(producto?: ProductoClass): void {
    if (producto) {
      // Navegar con parámetros
      this.router.navigate(['/component/AgregarProducto'], { 
        queryParams: { id: producto.id }
      });
    } else {
      // Navegar sin parámetros para nuevo producto
      this.router.navigate(['/component/AgregarProducto']);
    }
  }

  


  editar(producto: ProductoClass): void {
    this.AgregarNuevo(producto);
  }
  eliminar(producto: ProductoClass): void {
    this.productosService.eliminar(producto.id ?? 0, producto).subscribe(

      () => {
        this.loadproductos();
      });
      }



  //mostrar datos en la tabla
  loadproductos() {
    this.productosService.load(this.terminoBusqueda, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.productos = dato.content;
        this.isFirst = dato.first;
        this.isLast = dato.last;
        this.totalPages = new Array(dato.totalPages);
        
        console.log("esta es la ruta de la imagen ",this.productos);
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
