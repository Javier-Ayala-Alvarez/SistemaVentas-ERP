import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosServicesService } from '../../services/productos-services.service';
import { ProductoClass } from '../../clases/producto-class';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadMedidaProductoClass } from '../../clases/unidadMedidaProducto';
import { OperacionDetalleClass } from '../../clases/operacionDetalle';
import { OperacionServicesService } from '../../services/operacion-services.service';
import { imagenes } from 'src/app/config/config';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrl: './buscar-producto.component.scss'
})
export class BuscarProductoComponent {
  filtroCodigo: string = '';
  filtroNombre: string = '';
  filtroDescripcion: string = '';

  unidadesMedidaProducto?: UnidadMedidaProductoClass[];
  operacionDetalle: OperacionDetalleClass = new OperacionDetalleClass();

  producto?: ProductoClass[] = [];
  page: number = 0;
  size: number = 4;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  totalPages: any[] = [];

  imagenRuta: string = '';
  @Input() identificador: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private productoServices: ProductosServicesService,
    private operacion: OperacionServicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.imagenRuta = imagenes;
    this.loadProducto();
  }

  // Mostrar productos
  loadProducto() {
    this.productoServices.load(this.busqueda, this.page, this.size, this.order, this.asc)
      .subscribe((dato: any) => {
        this.producto = dato.content;
        this.isFirst = dato.first;
        this.isLast = dato.last;
        this.totalPages = new Array(dato.totalPages);
      });
  }

  // Mostrar unidades del producto
  loadUnidadProducto(id: any) {
    this.productoServices.listaUnidadProductoList(id).subscribe((dato: any) => {
      this.unidadesMedidaProducto = dato;

      // Para compras el precio es editable/requerido: inicializa a 0 si viene null
      if (this.identificador === 'compra') {
        this.unidadesMedidaProducto?.forEach(u => {
          if (u.precio == null) u.precio = 0;
        });
      }

      // Normaliza valores nulos
      this.unidadesMedidaProducto?.forEach(u => {
        if (u.cantidad == null) u.cantidad = 1;
        if (u.descuento == null) u.descuento = 0;
      });
    });
  }

  guardar(unidadMedidaProducto: UnidadMedidaProductoClass) {
    // Validaciones de seguridad (además del disable en el botón)
    const cantidad = unidadMedidaProducto.cantidad ?? 0;
    const descuento = unidadMedidaProducto.descuento ?? 0;
    const precio = unidadMedidaProducto.precio ?? 0;

    if (cantidad < 1) return;
    if (descuento < 0 || descuento > 100) return;
    if (this.identificador === 'compra' && precio <= 0) return;

    const det = new OperacionDetalleClass();
    det.unidadMedida = unidadMedidaProducto.unidadMedida;
    det.producto = unidadMedidaProducto.producto;
    det.cantidad = cantidad;
    det.descuento = descuento;
    det.precioUnitario = precio;
    det.total = (precio) * (cantidad);

    this.operacion.agregarOperacionDetalle(det);

    if (this.identificador === 'compra') {
      this.router.navigate(['/component/Nuevacompras']);
    } else if (this.identificador === 'cotizacion') {
      this.router.navigate(['/component/Nuevacotizacion']);
    } else if (this.identificador === 'factura') {
      this.router.navigate(['/component/factura']);
    }

    this.activeModal.close();
  }

  // Paginación
  paginaSiguiente(): void {
    if (!this.isLast) {
      this.page++;
      this.loadProducto();
    }
  }
  paginaAnterior(): void {
    if (!this.isFirst) {
      this.page--;
      this.loadProducto();
    }
  }

  get busqueda(): string {
    const partes: string[] = [];
    if (this.filtroCodigo) partes.push(`codigo:${this.filtroCodigo}`);
    if (this.filtroNombre) partes.push(`nombre:${this.filtroNombre}`);
    if (this.filtroDescripcion) partes.push(`descripcion:${this.filtroDescripcion}`);
    return partes.join(',');
  }

  ordenarPor(campo: string): void {
    if (this.order === campo) {
      this.asc = !this.asc;
    } else {
      this.order = campo;
      this.asc = true;
    }
    this.loadProducto();
  }

  productoSeleccionado?: ProductoClass;

seleccionarProducto(producto: ProductoClass): void {
  this.productoSeleccionado = producto;
  this.loadUnidadProducto(producto.id);
}


}
