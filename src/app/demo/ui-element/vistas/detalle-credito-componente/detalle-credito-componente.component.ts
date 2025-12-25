import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperacionServicesService } from '../../services/operacion-services.service';
import { CreditoClass } from '../../clases/credito-class';
import { ClienteClass } from '../../clases/cliente-class';
import { FormaDePagoComponent } from '../forma-de-pago/forma-de-pago.component';

@Component({
  selector: 'app-detalle-credito-componente',
  templateUrl: './detalle-credito-componente.component.html',
  styleUrls: ['./detalle-credito-componente.component.scss']
})
export class DetalleCreditoComponenteComponent implements OnInit {

  creditos: CreditoClass[] = [];

  page: number = 0;
  size: number = 8;
  order: string = 'id';
  asc: boolean = true;

  isFirst: boolean = false;
  isLast: boolean = false;
  totalPages: number[] = [];

  totalCredito: number = 0;
  nombre: string = '';

  @Input() cliente?: ClienteClass;

  constructor(
    public activeModal: NgbActiveModal,
    private operacionesService: OperacionServicesService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadCreditos();
  }

  loadCreditos(): void {
    if (!this.cliente?.id) {
      return;
    }

    this.operacionesService
      .CreditoPage(this.cliente.id, this.page, this.size, this.order, this.asc)
      .subscribe((resp: any) => {

        this.creditos = resp.content ?? [];
        this.nombre = `${this.creditos[0]?.nombreCliente ?? ''} ${this.creditos[0]?.apellidoCliente ?? ''}`.trim();
        this.isFirst = resp.first;
        this.isLast = resp.last;
        this.totalPages = Array.from({ length: resp.totalPages });

        this.calcularTotal();
      });
  }

  calcularTotal(): void {
    this.totalCredito = this.creditos.reduce(
      (acc, item) => acc + (item.montoPagado ?? 0),
      0
    );
  }

  paginaSiguiente(): void {
    if (!this.isLast) {
      this.page++;
      this.loadCreditos();
    }
  }

  paginaAnterior(): void {
    if (!this.isFirst) {
      this.page--;
      this.loadCreditos();
    }
  }

  pagarTodo(): void {
    if (this.totalCredito <= 0) {
      return;
    }
    this.openModalFormaPago();
  }
  openModalFormaPago() {
    const modalRef = this.modalService.open(FormaDePagoComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.identificador = 'credito';
    //modalRef.componentInstance.totalVenta = this.operacion.total;
  }
}
