import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatListModule, MatIconModule, MatProgressSpinnerModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule,
    FormsModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe,
    MatPaginatorModule, MatTableModule
  ],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.scss'
})
export default class ComprasComponent {
  constructor(private router: Router) { }

  AgregarNuevo(){
    console.log("Prueba");
   this.router.navigate(['/Nuevacompras']);
  }
}
