import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientesServicesService } from '../../services/clientes-services.service';
import { Router } from '@angular/router';
import { ProveedorClass } from '../../clases/proveedor-class';
import { ClienteClass } from '../../clases/cliente-class';
import { OperacionClass } from '../../clases/operaciones-class';
import { OperacionServicesService } from '../../services/operacion-services.service';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrl: './buscar-cliente.component.scss'
})
export class BuscarClienteComponent {
  cliente?: ClienteClass[] = undefined;
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  terminoBusqueda: string = '';
  totalPages: any[] = [];
  @Input() identificador: String = "";

  constructor(public activeModal: NgbActiveModal, private operacionServices: OperacionServicesService, private clienteServices: ClientesServicesService, private router: Router) { }
  ngOnInit(): void {
    this.loadCliente();
  }
  //mostrar datos en la tabla
  loadCliente() {
    this.clienteServices.load(this.terminoBusqueda, this.page, this.size, this.order, this.asc).subscribe(
      (dato: any) => {
        this.cliente = dato.content;
        this.isFirst = dato.first;
        this.isLast = dato.last;
        this.totalPages = new Array(dato.totalPages);
      }
    );
  }

  guardar(cliente: ClienteClass) {
    this.operacionServices.operacion.cliente = cliente;
    if (this.identificador == "compra") {
      this.router.navigate(['/component/Nuevacompras']);
    } else if (this.identificador == "cotizacion") {
      this.router.navigate(['/component/Nuevacotizacion']);
    } else if (this.identificador == "factura") {
      this.router.navigate(['/component/factura']);
    } this.activeModal.close(); // Cierra el modal (opcional)

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
