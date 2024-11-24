import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import { MatNativeDateModule} from '@angular/material/core';


interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}

/**
 * @title Basic select with initial value and no form
 */
@Component({
  selector: 'app-factura-administrador',
  templateUrl: './factura-administrador.component.html',
  styleUrl: './factura-administrador.component.scss'
})
export default class FacturaAdministradorComponent {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'San Vicente'},
    {value: 'pizza-1', viewValue: 'San Salvador'},
    {value: 'tacos-2', viewValue: 'San Miguel'},
  ];
  cars: Car[] = [
    {value: 'ford', viewValue: '----'},
    {value: 'chevrolet', viewValue: 'Contado'},
    {value: 'dodge', viewValue: 'Credito'},
  ];
  selectedFood = this.foods[2].value;
  selectedCar = this.cars[0].value;

  selectCar(event: Event) {
    this.selectedCar = (event.target as HTMLSelectElement).value;
  }

}







