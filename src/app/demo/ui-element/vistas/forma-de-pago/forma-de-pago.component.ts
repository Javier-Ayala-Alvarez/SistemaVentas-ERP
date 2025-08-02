import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormaPagoClass } from '../../clases/forma-pago-class';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { OperacionServicesService } from '../../services/operacion-services.service';
import { FormaPagoServicesService } from '../../services/forma-pago.services.service';
import { FormaPagoOperacion } from '../../clases/FormaPagoOperacion';
import { filter } from 'rxjs';

@Component({
  selector: 'app-forma-de-pago',
  templateUrl: './forma-de-pago.component.html',
  styleUrl: './forma-de-pago.component.scss'
})
export class FormaDePagoComponent {
  formaPago?: FormaPagoClass[];
  formaPagoOperacion?: FormaPagoOperacion = new FormaPagoOperacion();
  formaPagoOperacionList?: FormaPagoOperacion[];
  totalFormaPago?: number;
  cambio?: number = 0;
  efectivo?: number = 0;

  @Input() identificador: String = "";
  @Input() totalVenta: number = 0;
  constructor(public activeModal: NgbActiveModal, private formaServices: FormaPagoServicesService, private operacion: OperacionServicesService, private router: Router, private route: ActivatedRoute) {
    this.formaPagoOperacion = new FormaPagoOperacion();
  }
  ngOnInit(): void {
    this.loadFormaPago();
    
    this.formaPagoOperacionList = this.operacion.formaPagoOperacion;
    this.totalizacion();
  }
  loadFormaPago(): void {
    this.formaServices.listaFormaPago().subscribe(
      (dato: any) => {
        this.formaPago = dato;
      }
    );
  }
  Agregar(forma: FormaPagoClass) {
    this.formaPagoOperacion!.formasPago = forma;
    this.totalizacion();

  }
  guardar() {
    this.formaPagoOperacion!.total = this.totalFormaPago;
    this.operacion.agregarFormaPagoOperacion(this.formaPagoOperacion!);
    this.formaPagoOperacionList = this.operacion.formaPagoOperacion;
    this.totalizacion();
  }
  eliminarFormaPago(forma: FormaPagoOperacion) {
    this.operacion.eliminarFormaPagoOperacion(forma).subscribe((dato: any) => {
      this.formaPagoOperacionList = this.operacion.formaPagoOperacion;
      this.totalizacion();
    }
    );
  }
  guardarOperacion() {
    this.operacion.guardarOperacion().subscribe((dato: any) => {
      this.formaPagoOperacionList = this.operacion.formaPagoOperacion;
      if (this.identificador == "compra") {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/component/Nuevacompras']);
        });
      } else if (this.identificador == "cotizacion") {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/component/Nuevacotizacion']);
        });
      } else if (this.identificador == "factura") {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/component/factura']);
        });
      }
      this.activeModal.close(); // Cierra el modal (opcional)
    });

  }

  totalizacion() {
    this.efectivo = 0;
    this.cambio = 0;
  
    if (this.formaPagoOperacionList) {
      for (let item of this.formaPagoOperacionList) {
        this.efectivo += Number(item.total ?? 0); // Usa 0 si item.total es null o undefined
      }
    }
  
    this.cambio = (this.efectivo ?? 0) - (this.totalVenta ?? 0);
  }
  


}
