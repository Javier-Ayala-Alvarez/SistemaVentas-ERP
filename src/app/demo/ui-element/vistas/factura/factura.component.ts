import { Component, OnInit, ViewChild } from '@angular/core';
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
  styleUrls: ['./factura.component.scss']
})
export default class FacturaComponent implements OnInit {
  
  displayedColumns: string[] = ['codigo', 'descripcion', 'cantidad', 'descuento', 'valorUnitario', 'exento', 'iva', 'total', 'eliminar'];
  dataSource = new MatTableDataSource<Producto>([
    { codigo: 'P001', descripcion: 'Producto A', cantidad: 2, descuento: 0.1, valorUnitario: 500, exento: 0, iva: 75, total: 950 },
    { codigo: 'P002', descripcion: 'Producto B', cantidad: 1, descuento: 0.05, valorUnitario: 300, exento: 0, iva: 22.5, total: 307.5 },
    { codigo: 'P003', descripcion: 'Producto C', cantidad: 3, descuento: 0.2, valorUnitario: 200, exento: 0, iva: 60, total: 540 },
  ]);

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
    this.dataSource.paginator = this.paginator;
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = this.dataSource.data.reduce((sum, item) => sum + item.valorUnitario * item.cantidad, 0);
    this.iva = this.dataSource.data.reduce((sum, item) => sum + item.iva, 0);
    this.retencion = 0; // Asignar retención si es necesario
    this.totalVenta = this.subtotal + this.iva - this.retencion;
  }
}
