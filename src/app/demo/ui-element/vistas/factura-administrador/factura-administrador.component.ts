import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { TipoOperacionServicesService } from '../../services/tipo-operacion-services.service';
import { OperacionClass } from '../../clases/operaciones-class';


/**
 * @title Basic select with initial value and no form
 */
@Component({
  selector: 'app-factura-administrador',
  templateUrl: './factura-administrador.component.html',
  styleUrl: './factura-administrador.component.scss'
})
export default class FacturaAdministradorComponent {
  operacion: OperacionClass = new OperacionClass();

  sucursales: any[] = [];
  tipoOperaciones: any[] = [];



  ngOnInit(): void {
    this.loadTipoOperacion();
    this.loadSucursal();
  }
  constructor(private modalService: NgbModal, private sucursalServices: SucursalServicesService, private tipoOperacionServices: TipoOperacionServicesService, private router: Router, private datePipe: DatePipe, private route: ActivatedRoute, // Usamos ActivatedRoute aquí
  ) {

  }


  //mostrar datos de la sucursal
  loadSucursal() {
    this.sucursalServices.buscar().subscribe(
      (dato: any) => {
        console.log("Sucursales recibidas:", dato[0].nombre); // Verifica los datos en la consola
        this.sucursales = dato;
        if (this.operacion) {
          this.operacion.sucursal = this.sucursales?.find(emp => emp.id === this.operacion.sucursal?.id);
        }
      }
    );
  }


  loadTipoOperacion() {
    this.tipoOperacionServices.buscarTipoOperacion("E").subscribe(
      (dato: any) => {
        this.tipoOperaciones = dato;
        if (this.operacion.tipoOperacion) {
          this.operacion.tipoOperacion = this.tipoOperaciones?.find(emp => emp.id === this.operacion.tipoOperacion?.id);
        }
      }

    );

  }


}







