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
  selector: 'app-factura',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatListModule, MatIconModule, MatProgressSpinnerModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule,
    FormsModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe,
    MatPaginatorModule, MatTableModule
  ],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export default class FacturaComponent implements OnInit {
  
  constructor(private modalService: NgbModal) {}


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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
  }


  openModalCliente() {
    
    const modalRef1 = this.modalService.open(BuscarClienteComponent, {
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

