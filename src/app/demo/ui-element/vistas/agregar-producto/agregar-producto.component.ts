import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BuscarUnidadMedidaComponent } from '../buscar-unidad-medida/buscar-unidad-medida.component';
import { ProductosServicesService } from '../../services/productos-services.service';	
import { ProductoClass } from '../../clases/producto-class'; 
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.scss'
})
export default class AgregarProductoComponent {

  productoNuevo: ProductoClass = new ProductoClass(); // Inicialización por defecto
  producto?: ProductoClass; // Recibe la sucursal desde el componente principal

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, private productoService: ProductosServicesService, private router: Router, private datePipe: DatePipe) {}

  //Valores de inicio
  ngOnInit(): void {
    if (this.producto) {
      this.productoNuevo = { ...this.producto }; // Copia los valores si está definido
    } else {
      this.productoNuevo = new ProductoClass(); // Asegura la inicialización
    }
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


  //Guardar Producto
  guardar(){
    if (this.producto != null) {
      this.productoService.modificar(this.productoNuevo.id ?? 0, this.productoNuevo).subscribe();

    } else {
      this.productoService.agregar(this.productoNuevo).subscribe();
    }
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/component/productos']);
    });
    this.activeModal.close(); // Cierra el modal (opcional)

  }
}
