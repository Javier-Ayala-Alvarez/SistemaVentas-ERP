import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuscarUnidadMedidaComponent } from '../buscar-unidad-medida/buscar-unidad-medida.component';
import { ProductosServicesService } from '../../services/productos-services.service';
import { ProductoClass } from '../../clases/producto-class';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CategoriasServicesService } from '../../services/categorias-services.service';
import { UnidadMedidaProductoClass } from '../../clases/unidadMedidaProducto';
import { UnidadesServicesService } from '../../services/unidades-services.service';
import { imagenes } from '../../services/helper';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.scss'
})
export default class AgregarProductoComponent {
  unidadMedidaProducto: UnidadMedidaProductoClass[] = [];
  imagenRuta: string = '';
  productoNuevo: ProductoClass = new ProductoClass();
  producto?: ProductoClass;
  categorias: any[] = [];
  selectedImage: File | undefined;
  id: number = 0;

  // UX validación
  intentoGuardar = false;
  toasts: ToastMsg[] = [];
  imagenPreview: string | null = null;

  constructor(
    private modalService: NgbModal,
    private unidadesServices: UnidadesServicesService,
    private productoService: ProductosServicesService,
    private categoria: CategoriasServicesService,
    private router: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.imagenRuta = imagenes;
    this.productoNuevo = new ProductoClass();
    this.id = this.route.snapshot.queryParams['id'] ?? 0;
    this.unidadMedidaProducto = this.productoService.unidadMedidaProducto;

    this.loadCategoria();
    if (this.id > 0) {
      this.loadProducto(this.id);
    }
  }

  // ---------- Abrir modal U.M. ----------
  openModalAgregar() {
    this.modalService.open(BuscarUnidadMedidaComponent, {
      size: 'lg',
      centered: true
    });
  }

  // ---------- Quitar U.M. ----------
  eliminarUnidadmedida(unidad: UnidadMedidaProductoClass): void {
    this.productoService.eliminarUnidadMedida(unidad).subscribe(() => {
      this.unidadMedidaProducto = this.productoService.unidadMedidaProducto;
    });
  }

  // ---------- Pre-guardar con validaciones + toasts ----------
  preGuardar(form: NgForm) {
    this.intentoGuardar = true;
    form.form.markAllAsTouched();

    // limpiar toasts
    this.toasts = [];
    let id = Date.now();

    const c = form.controls as any;

    // Campos básicos
    if (c['nombre']?.invalid) this.pushToast(id++, 'Ingrese un nombre válido');
    if (c['descripcion']?.invalid) this.pushToast(id++, 'Ingrese una descripción válida');
    if (c['categoriaProducto']?.invalid) this.pushToast(id++, 'Seleccione la categoría');

    // Validar unidades
    if (!this.unidadMedidaProducto || this.unidadMedidaProducto.length === 0) {
      this.pushToast(id++, 'Agregue al menos una unidad de medida');
    } else {
      // Validar precios no negativos y consistentes
      this.unidadMedidaProducto.forEach((um, idx) => {
        const pc = Number(um.precioCompra ?? 0);
        const pv = Number(um.precio ?? 0);

        if (isNaN(pc) || pc < 0) this.pushToast(id++, `Unidad #${idx + 1}: precio de compra inválido`);
        if (isNaN(pv) || pv < 0) this.pushToast(id++, `Unidad #${idx + 1}: precio de venta inválido`);
        if (!isNaN(pc) && !isNaN(pv) && pv < pc) {
          this.pushToast(id++, `Unidad #${idx + 1}: el precio de venta es menor que el de compra`);
        }
      });
    }

    const anyInvalid = form.invalid || this.toasts.length > 0;
    if (anyInvalid) return;

    // OK -> usa tu lógica original de guardar()
    this.guardar();
  }

  // ---------- Guardar (lógica original intacta) ----------
  guardar() {
    const formData = new FormData();
    if (this.selectedImage) {
      formData.append('imagen', this.selectedImage);
    }

    if (this.id > 0) {
      this.productoService
        .modificar(this.productoNuevo.id ?? 0, this.productoNuevo, formData)
        .subscribe(() =>
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/component/productos']);
          })
        );
    } else {
      this.productoService.agregar(this.productoNuevo, formData).subscribe(() =>
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/component/productos']);
        })
      );
    }
  }

  // ---------- Data ----------
  loadCategoria() {
    this.categoria.listaCombo().subscribe((dato: any) => {
      this.categorias = dato;
      if (this.productoNuevo.categoria) {
        this.productoNuevo.categoria = this.categorias?.find(
          emp => emp.id === this.productoNuevo.categoria?.id
        );
      }
    });
  }

  loadProducto(id: number) {
    this.productoService.productoLoad(id).subscribe((dato: any) => {
      this.productoNuevo = dato;
      this.loadCategoria();
      this.productoService.listaUnidadProducto(id).subscribe((unidadMedida: any) => {
        this.unidadMedidaProducto = unidadMedida;
      });
    });
  }

  // ---------- Imagen ----------
  onLogoSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.imagenPreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  // ---------- Toasts helpers ----------
  pushToast(id: number, message: string) {
    this.toasts.push({ id, message });
    setTimeout(() => this.removeToast(id), 4500);
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
}

// interfaz toasts
export interface ToastMsg {
  id: number;
  message: string;
}
