import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BuscarUnidadMedidaComponent } from '../buscar-unidad-medida/buscar-unidad-medida.component';
import { ProductosServicesService } from '../../services/productos-services.service';	
import { ProductoClass } from '../../clases/producto-class'; 
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CategoriasServicesService } from '../../services/categorias-services.service';
import { UnidadMedidaClass } from '../../clases/unidad-medida-class';
import { UnidadMedidaProductoClass } from '../../clases/unidadMedidaProducto';
import { UnidadesServicesService } from '../../services/unidades-services.service';
@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.scss'
})
export default class AgregarProductoComponent {
    unidadMedidaProducto: UnidadMedidaProductoClass[] = [];
  

  productoNuevo: ProductoClass = new ProductoClass(); // Inicialización por defecto
  producto?: ProductoClass; // Recibe la sucursal desde el componente principal
  categorias:any[] =[];
  categoriaSelect:any; 
  selectedImage: File | undefined; // Para almacenar el archivo de logo seleccionado

  constructor(private modalService: NgbModal, private unidadesServices: UnidadesServicesService ,private productoService: ProductosServicesService,private categoria: CategoriasServicesService, private router: Router, private datePipe: DatePipe) {}

  //Valores de inicio
  ngOnInit(): void {
    if (this.producto) {
      this.productoNuevo = { ...this.producto }; // Copia los valores si está definido
    } else {
      this.productoNuevo = new ProductoClass(); // Asegura la inicialización
    } 
    this.loadCategoria();
    this.unidadMedidaProducto = this.productoService.unidadMedidaProducto;
  }
  imagenPreview: string | null = null;



  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string; // Vista previa de la imagen
      };
      reader.readAsDataURL(fileInput.files[0]); // Leer archivo como Data URL
    }
  }
  openModalAgregar (){
    const modalRef = this.modalService.open(BuscarUnidadMedidaComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  }

  eliminarUnidadmedida(producto: UnidadMedidaProductoClass): void {
    if (this.producto?.id) {
      // Simplemente asigna null a la propiedad unidadMedida
      producto.unidadMedida = undefined;
      
      // Si necesitas actualizar en backend
       //this.productoService.modificar(producto.id, producto).subscribe(
        // () => console.log('Unidad de medida eliminada'),
        //error => console.error('Error al eliminar unidad de medida', error)
       //);
    }
  }


  //Guardar Producto
  guardar(){
    const formData = new FormData();
    // Verificar que selectedLogo no sea null y sea de tipo File
    if (this.selectedImage) {
      formData.append('imagen', this.selectedImage);
    }
    
    if (this.producto != null) {
      this.productoService.modificar(this.productoNuevo.id ?? 0, this.productoNuevo, formData).subscribe(()=>
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/component/productos']);
        }));

    } else {
      this.productoService.agregar(this.productoNuevo, formData).subscribe(() =>
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/component/productos']);
        }));
    }
    

  }
  
  //mostrar datos de la sucursal
loadCategoria() {
  this.categoria.listaCombo().subscribe(
    (dato: any) => {
      this.categorias = dato;

      }

  );
}
onLogoSelect(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input?.files && input.files.length > 0) {
    this.selectedImage = input.files[0]; // Guardar el archivo seleccionado
    // Leer el archivo y generar una vista previa
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagenPreview = e.target?.result as string; // Asignar la vista previa del archivo
    };
    reader.readAsDataURL(this.selectedImage);
  }
}
}
