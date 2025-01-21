import { Component } from '@angular/core';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarCategoriaComponent } from '../agregar-categoria/agregar-categoria.component';
import { CategoriasServicesService } from '../../services/categorias-services.service';
import { CategoriaClass } from '../../clases/categoria-class';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export default class CategoriaComponent {
  categorias: CategoriaClass[] | undefined;
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  terminoBusqueda: string = '';
  totalPages: any[] = [];


  constructor(private modalService: NgbModal, private categoriasServices: CategoriasServicesService) { }
  ngOnInit(): void {
    this.loadcategorias();
  }

  agregar(): void {
    this.openModal();
  }



  openModal (categoria?: CategoriaClass): void {
    const modalRef = this.modalService.open(AgregarCategoriaComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  }

  editar(categoria: CategoriaClass): void {
    this.openModal(categoria);
  }
  eliminar(categoria: CategoriaClass): void {
    this.categoriasServices.eliminar(categoria.id ?? 0, categoria);
    this.loadcategorias();
 
 }

 //mostrar datos en la tabla
 loadcategorias() {
  this.categoriasServices.load(this.terminoBusqueda, this.page, this.size, this.order, this.asc).subscribe(
    (dato: any) => {
      this.categorias = dato.content;
      this.isFirst = dato.first;
      this.isLast = dato.last;
      this.totalPages = new Array(dato.totalPages);
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
