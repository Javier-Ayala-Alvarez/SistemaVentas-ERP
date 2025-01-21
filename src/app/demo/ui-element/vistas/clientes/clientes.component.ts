import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';
import { ClienteClass } from '../../clases/cliente-class';
import { ClientesServicesService } from '../../services/clientes-services.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export default class ClientesComponent {

  clientes: ClienteClass[] | undefined;
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  terminoBusqueda: string = '';
  totalPages: any[] = [];


  constructor(private modalService: NgbModal, private clienteServices: ClientesServicesService) {}


  ngOnInit(): void {
    this.loadclientes();
  }

  agregar(): void{
    this.openModal();
  }

  openModal (cliente?: ClienteClass): void {
    const modalRef = this.modalService.open(AgregarClienteComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  modalRef.componentInstance.cliente = cliente; // Pasar datos al modal (opcional)

  }


  editar(cliente: ClienteClass): void {
    this.openModal(cliente);
   
  }
  eliminar(cliente: ClienteClass): void {
    this.clienteServices.eliminar(cliente.id ?? 0, cliente).subscribe(
      () => {
        this.ngOnInit();
      },
    );
   
  }

  //mostrar datos en la tabla
  loadclientes() {
    this.clienteServices.load(this.terminoBusqueda, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.clientes = dato.content;
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
