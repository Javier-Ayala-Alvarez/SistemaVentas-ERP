import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from 'src/app/theme/layout/admin/navigation/navigation.component';
import SucursalComponent from './vistas/sucursal/sucursal.component';
import ProveedoresComponent from './vistas/proveedores/proveedores.component';
import ProveedoresReportesComponent from './vistas/proveedores-reportes/proveedores-reportes.component';
import ClientesReportesComponent from './vistas/clientes-reportes/clientes-reportes.component';
import VentasFechaComponent from './vistas/ventas-fecha/ventas-fecha.component';
import ClientesComponent from './vistas/clientes/clientes.component';
import { UnidadMedidaClass } from './clases/unidad-medida-class';
import UnidadesComponent from './vistas/unidades/unidades.component';
import CategoriaComponent from './vistas/categoria/categoria.component';
import AgregarProductoComponent from './vistas/agregar-producto/agregar-producto.component';
import ProductosComponent from './vistas/productos/productos.component';
import RemesasComponent from './vistas/remesas/remesas.component';
import CajasComponent from './vistas/cajas/cajas.component';
import GastosComponent from './vistas/gastos/gastos.component';
import AgregarComprasComponent from './vistas/agregar-compras/agregar-compras.component';
import ComprasComponent from './vistas/compras/compras.component';
import cotizacionesComponent from './vistas/cotizaciones/cotizaciones.component';
import FacturaComponent from './vistas/factura/factura.component';
import DashboardComponent from './vistas/dashboard/dashboard.component';
import FacturaAdministradorComponent from './vistas/factura-administrador/factura-administrador.component';
import { EmpresaComponent } from './vistas/empresa/empresa.component';
import { AgregarCotizacionComponent } from './vistas/agregar-cotizacion/agregar-cotizacion.component';
import { SignInComponent } from '../authentication/sign-in/sign-in.component';
import { RoleGuard } from './services/guards.guard';
import { KardexComponent } from './vistas/kardex/kardex.component';
import { InventarioComponent } from './vistas/inventario/inventario.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'administrador-factura',component:FacturaAdministradorComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN','FACTURA', 'GENERAL','SUPERADMIN'] }
      }, 
      {
        path: 'dashboard',component:DashboardComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'FACTURA','GENERAL','SUPERADMIN'] }
      }
      , 
      {
        path: 'factura',component:FacturaComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'FACTURA','GENERAL','SUPERADMIN'] }
      }
      , 
      {
        path: 'cotizaciones',component:cotizacionesComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'GENERAL','SUPERADMIN'] }
      }
      , 
      {
        path: 'Nuevacotizacion',component:AgregarCotizacionComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'GENERAL','SUPERADMIN'] }
      },
      {
        path: 'compras',component:ComprasComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'GENERAL','SUPERADMIN'] }
      },
      {
        path: 'Nuevacompras',component:AgregarComprasComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'GENERAL','SUPERADMIN'] }
      }
      , 
      {
        path: 'gastos',component:GastosComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN','GENERAL','SUPERADMIN'] }
      }
      , 
      {
        path: 'cajas',component:CajasComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'GENERAL','SUPERADMIN'] }
      }
      , 
      {
        path: 'remesas',component:RemesasComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'GENERAL','SUPERADMIN'] }
      }
      , 
      {
        path: 'productos',component:ProductosComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'GENERAL','SUPERADMIN'] }
      },{
        path: 'Inventario',component:InventarioComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'GENERAL','SUPERADMIN'] }
      }, 
      {
        path: 'AgregarProducto',component:AgregarProductoComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'GENERAL','SUPERADMIN'] }
      }, 
      {
        path: 'categoria',component:CategoriaComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'GENERAL','SUPERADMIN'] }
      }
      , 
      {
        path: 'unidades',component:UnidadesComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'GENERAL','SUPERADMIN'] }
      }
      , 
      {
        path: 'clientes',component:ClientesComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'GENERAL','SUPERADMIN'] }
      }
      , 
      {
        path: 'proveedores',component:ProveedoresComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'GENERAL','SUPERADMIN'] }
      }
      , 
      {
        path: 'empresa',component:EmpresaComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN','SUPERADMIN'] }
      }
      , 
      {
        path: 'sucursal', component: SucursalComponent ,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN','SUPERADMIN'] }
      }
      , 
      {
        path: 'proveedores-reportes', component: ProveedoresReportesComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'SUPERADMIN'] }
      }
      , 
      {
        path: 'clientes-reportes', component: ClientesReportesComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN','SUPERADMIN'] }
      }
      , 
      {
        path: 'ventas-fecha', component: VentasFechaComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN','SUPERADMIN'] }
      }
      , 
      {
        path: 'kardex',component: KardexComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'SUPERADMIN'] }
      }
      
      , 
      {
        path: 'Inventario',component: InventarioComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'SUPERADMIN'] }
      }
      , 
      {
        path: 'login',component: SignInComponent,
          canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'FACTURA','GENERAL','SUPERADMIN'] }
      }
    ]
  }  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiBasicRoutingModule {}
