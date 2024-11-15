import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-agregar-compras',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatProgressSpinnerModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule,
    FormsModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe,
    MatPaginatorModule, MatTableModule],
  templateUrl: './agregar-compras.component.html',
  styleUrl: './agregar-compras.component.scss'
})
export default class AgregarComprasComponent implements OnInit  {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
  totalCompra = 0;

  openModalProveedor() {
    
    
  }
  openModalProducto() {
 
    
  }

  openModalFormaPago(){
   
  }
}
