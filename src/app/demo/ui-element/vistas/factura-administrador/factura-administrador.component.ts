import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-factura-administrador',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './factura-administrador.component.html',
  styleUrl: './factura-administrador.component.scss'
})

export default class FacturaAdministradorComponent {
  displayedColumns: string[] = ['codigo', 'descripcion', 'cantidad', 'descuento', 'valorUnitario', 'exento', 'iva', 'total', 'eliminar'];
  dataSource = new MatTableDataSource<Producto>([
    { codigo: 'P001', descripcion: 'Producto A', cantidad: 2, descuento: 0.1, valorUnitario: 500, exento: 0, iva: 75, total: 950 },
    { codigo: 'P002', descripcion: 'Producto B', cantidad: 1, descuento: 0.05, valorUnitario: 300, exento: 0, iva: 22.5, total: 307.5 },
    { codigo: 'P003', descripcion: 'Producto C', cantidad: 3, descuento: 0.2, valorUnitario: 200, exento: 0, iva: 60, total: 540 },
  ]);

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
