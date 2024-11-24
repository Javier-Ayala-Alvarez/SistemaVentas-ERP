import { Component, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuscarProductoComponent } from '../buscar-producto/buscar-producto.component';
import { BuscarClienteComponent } from '../buscar-cliente/buscar-cliente.component';
import { FormaDePagoComponent } from '../forma-de-pago/forma-de-pago.component';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';


export interface Producto {
  codigo: string;
  descripcion: string;
  cantidad: number;
  descuento: number;
  valorUnitario: number;
  exento: number;
  iva: number;
  total: number;
}

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export default class cotizacionesComponent implements OnInit {
  
  constructor(private modalService: NgbModal) {}

  openModalAgregar (){
    const modalRef = this.modalService.open(AgregarClienteComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  }


  clientes = [
    { nombre: 'Cliente 1' },
    { nombre: 'Cliente 2' },
    { nombre: 'Cliente 3' },
  ];

  departamentos = ['Departamento A', 'Departamento B', 'Departamento C'];
  municipios = ['Municipio X', 'Municipio Y', 'Municipio Z'];
  distritos = ['Distrito 1', 'Distrito 2', 'Distrito 3'];
  tiposOperacion = ['Operación 1', 'Operación 2', 'Operación 3'];


  subtotal = 0;
  iva = 0;
  retencion = 0;
  totalVenta = 0;

  ngOnInit() {
  }


  openModalCliente() {
    
    this.modalService.open(BuscarClienteComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajustar el tamaño
      centered: true // para centrar el modal
      
    });
  }
  openModalProducto() {
    const modalRef = this.modalService.open(BuscarProductoComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajustar el tamaño
      centered: true // para centrar el modal
    });
    
  }

  openModalFormaPago(){
    const modalRef = this.modalService.open(FormaDePagoComponent, {
      size: 'lg', // 'sm' | 'lg' | 'xl' para ajust
      centered: true
  });
  }
}


