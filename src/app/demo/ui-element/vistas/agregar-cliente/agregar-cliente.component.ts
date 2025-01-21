import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientesServicesService } from '../../services/clientes-services.service';
import { ClienteClass } from '../../clases/cliente-class';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrl: './agregar-cliente.component.scss'
})
export class AgregarClienteComponent {

  clienteNuevo: ClienteClass = new ClienteClass(); // Inicialización por defecto
  cliente?: ClienteClass; // Recibe la sucursal desde el componente principal

  constructor(public activeModal: NgbActiveModal, private clienteService: ClientesServicesService, private router: Router, private datePipe: DatePipe) {}

  //Valores de inicio
  ngOnInit(): void {
    if (this.cliente) {
      this.clienteNuevo = { ...this.cliente }; // Copia los valores si está definido
    } else {
      this.clienteNuevo = new ClienteClass(); // Asegura la inicialización
    }
  }

  //Guardar Gasto
  guardar(){
    if (this.cliente != null) {
      this.clienteService.modificar(this.clienteNuevo.id ?? 0, this.clienteNuevo).subscribe();

    } else {
      this.clienteService.agregar(this.clienteNuevo).subscribe();
    }
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/component/clientes']);
    });
    this.activeModal.close(); // Cierra el modal (opcional)

  }

}
