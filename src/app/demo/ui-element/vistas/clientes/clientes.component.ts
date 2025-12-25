import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';
import { ClienteClass } from '../../clases/cliente-class';
import { ClientesServicesService } from '../../services/clientes-services.service';
import { OperacionServicesService } from '../../services/operacion-services.service';
import { forkJoin } from 'rxjs';
import { DetalleCreditoComponenteComponent } from '../detalle-credito-componente/detalle-credito-componente.component';
 
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'] // corregido de styleUrl
})
export default class ClientesComponent {
  filtroCodigo: string = '';
  filtroNombre: string = '';
  filtroDui: string = '';
  filtroNit: string = '';
  filtroTelefono: string = '';
  soloConCredito: boolean = false; // Nuevo filtro
  clientes: ClienteClass[] = [];
  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  totalPages: any[] = [];
  totalCreditoGeneral: number = 0; // Total general de crédito

  constructor(
    private modalService: NgbModal,
    private clienteServices: ClientesServicesService,
    private operacionesServices: OperacionServicesService
  ) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  openModal(cliente?: ClienteClass): void {
    const modalRef = this.modalService.open(AgregarClienteComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.cliente = cliente;
    modalRef.result.finally(() => this.loadClientes()); // recargar al cerrar modal
  }

  editar(cliente: ClienteClass): void {
    this.openModal(cliente);
  }

  eliminar(cliente: ClienteClass): void {
    if (confirm(`¿Desea eliminar al cliente ${cliente.nombre}?`)) {
      this.clienteServices.eliminar(cliente.id ?? 0, cliente).subscribe(() => this.loadClientes());
    }
  }

  abrirDetalleCredito(cliente: ClienteClass): void {
    const modalRef = this.modalService.open(DetalleCreditoComponenteComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.cliente = cliente;
    modalRef.result.finally(() => this.loadClientes()); 
  }


loadClientes(): void {
  this.clienteServices
    .load(this.busqueda, this.page, this.size, this.order, this.asc)
    .subscribe((dato: any) => {
      let clientesCargados: ClienteClass[] = dato.content || [];
      this.isFirst = dato.first;
      this.isLast = dato.last;
      this.totalPages = new Array(dato.totalPages);

      // Crear array de observables para totalCredito de cada cliente
      const creditosObservables = clientesCargados.map(cliente =>
        this.operacionesServices.totalCredito(cliente.id ?? 0)
      );

      // Esperar a que todos los observables terminen
      forkJoin(creditosObservables).subscribe((totales: any) => {
        clientesCargados.forEach((cliente, i) => {
          cliente.totalCredito = totales[i] ?? 0;
        });

        // Filtrar solo clientes con crédito si está activado
        if (this.soloConCredito) {
          this.clientes = clientesCargados.filter(c => (c.totalCredito ?? 0) > 0);
        } else {
          this.clientes = clientesCargados;
        }

        // Calcular total general solo de los visibles
        this.totalCreditoGeneral = this.clientes.reduce((sum, c) => sum + (c.totalCredito ?? 0), 0);
      });
    });
}



  paginaSiguiente(): void {
    if (!this.isLast) {
      this.page++;
      this.loadClientes();
    }
  }

  paginaAnterior(): void {
    if (!this.isFirst) {
      this.page--;
      this.loadClientes();
    }
  }

  get busqueda(): string {
    const partes = [];
    if (this.filtroCodigo) partes.push(`codigo:${this.filtroCodigo}`);
    if (this.filtroNombre) partes.push(`nombre:${this.filtroNombre}`);
    if (this.filtroDui) partes.push(`dui:${this.filtroDui}`);
    if (this.filtroNit) partes.push(`nit:${this.filtroNit}`);
    if (this.filtroTelefono) partes.push(`telefono:${this.filtroTelefono}`);
    return partes.join(',');
  }

  ordenarPor(campo: string): void {
    if (this.order === campo) {
      this.asc = !this.asc;
    } else {
      this.order = campo;
      this.asc = true;
    }
    this.loadClientes();
  }
}
