import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import { CategoriaClass } from '../../clases/categoria-class';
import { CategoriasServicesService } from '../../services/categorias-services.service';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrl: './agregar-categoria.component.scss'
})
export class AgregarCategoriaComponent {

  categoriaNuevo: CategoriaClass = new CategoriaClass(); // Inicialización por defecto
  categoria?: CategoriaClass; // Recibe la sucursal desde el componente principal

  constructor(public activeModal: NgbActiveModal, private categoriaService: CategoriasServicesService, private router: Router, private datePipe: DatePipe) { }

  //Valores de inicio
  ngOnInit(): void {
    if (this.categoria) {
      this.categoriaNuevo = { ...this.categoria }; // Copia los valores si está definido
    } else {
      this.categoriaNuevo = new CategoriaClass(); // Asegura la inicialización
    }
  }

   //Guardar Categoria
   guardar(){
    if (this.categoria != null) {
      this.categoriaService.modificar(this.categoriaNuevo.id ?? 0, this.categoriaNuevo).subscribe();

    } else {
      this.categoriaService.agregar(this.categoriaNuevo).subscribe();
    }
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/component/categorias']);
    });
    this.activeModal.close(); // Cierra el modal (opcional)

  }


}
