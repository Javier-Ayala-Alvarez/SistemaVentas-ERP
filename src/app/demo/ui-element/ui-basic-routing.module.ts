import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from 'src/app/theme/layout/admin/navigation/navigation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'administrador-factura',
        loadComponent: () => import('./vistas/factura-administrador/factura-administrador.component')
      }, 
      {
        path: 'dashboard',
        loadComponent: () => import('./vistas/dashboard/dashboard.component')
      }
      , 
      {
        path: 'factura',
        loadComponent: () => import('./vistas/factura/factura.component')
      }
    ]
  }  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiBasicRoutingModule {}
