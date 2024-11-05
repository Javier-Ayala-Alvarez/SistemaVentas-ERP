import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from 'src/app/theme/layout/admin/navigation/navigation.component';
import { FacturaAdministradorComponent } from 'src/app/demo/ui-element/vistas/factura-administrador/factura-administrador.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'administrador-factura',
        loadComponent: () => import('./vistas/factura-administrador/factura-administrador.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiBasicRoutingModule {}
