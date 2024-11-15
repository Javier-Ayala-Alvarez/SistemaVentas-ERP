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
      , 
      {
        path: 'cotizaciones',
        loadComponent: () => import('./vistas/cotizaciones/cotizaciones.component')
      }
      , 
      {
        path: 'compras',
        loadComponent: () => import('./vistas/compras/compras.component')
      }
      , 
      {
        path: 'gastos',
        loadComponent: () => import('./vistas/gastos/gastos.component')
      }
      , 
      {
        path: 'cajas',
        loadComponent: () => import('./vistas/cajas/cajas.component')
      }
      , 
      {
        path: 'remesas',
        loadComponent: () => import('./vistas/remesas/remesas.component')
      }
      , 
      {
        path: 'productos',
        loadComponent: () => import('./vistas/productos/productos.component')
      }
      , 
      {
        path: 'unidades',
        loadComponent: () => import('./vistas/unidades/unidades.component')
      }
      , 
      {
        path: 'clientes',
        loadComponent: () => import('./vistas/clientes/clientes.component')
      }
      , 
      {
        path: 'proveedores',
        loadComponent: () => import('./vistas/proveedores/proveedores.component')
      }
      , 
      {
        path: 'empresa',
        loadComponent: () => import('./vistas/empresa/empresa.component')
      }
      , 
      {
        path: 'sucursal',
        loadComponent: () => import('./vistas/sucursal/sucursal.component')
      }
      , 
      {
        path: 'proveedores-reportes',
        loadComponent: () => import('./vistas/proveedores-reportes/proveedores-reportes.component')
      }
      , 
      {
        path: 'clientes-reportes',
        loadComponent: () => import('./vistas/clientes-reportes/clientes-reportes.component')
      }
      , 
      {
        path: 'ventas-fecha',
        loadComponent: () => import('./vistas/ventas-fecha/ventas-fecha.component')
      }
      , 
      {
        path: 'kardex',
        loadComponent: () => import('./vistas/kardex/kardex.component')
      }
    ]
  }  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiBasicRoutingModule {}
