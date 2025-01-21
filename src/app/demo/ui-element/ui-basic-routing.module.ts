import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from 'src/app/theme/layout/admin/navigation/navigation.component';
import SucursalComponent from './vistas/sucursal/sucursal.component';
import ProveedoresComponent from './vistas/proveedores/proveedores.component';
import ProveedoresReportesComponent from './vistas/proveedores-reportes/proveedores-reportes.component';
import ClientesReportesComponent from './vistas/clientes-reportes/clientes-reportes.component';
import VentasFechaComponent from './vistas/ventas-fecha/ventas-fecha.component';
import KardexComponent from './vistas/kardex/kardex.component';
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

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'administrador-factura',component:FacturaAdministradorComponent
      }, 
      {
        path: 'dashboard',component:DashboardComponent
      }
      , 
      {
        path: 'factura',component:FacturaComponent
      }
      , 
      {
        path: 'cotizaciones',component:cotizacionesComponent
      }
      , 
      {
        path: 'compras',component:ComprasComponent
      },
      {
        path: 'Nuevacompras',component:AgregarComprasComponent
      }
      , 
      {
        path: 'gastos',component:GastosComponent
      }
      , 
      {
        path: 'cajas',component:CajasComponent
      }
      , 
      {
        path: 'remesas',component:RemesasComponent
      }
      , 
      {
        path: 'productos',component:ProductosComponent
      },
      {
        path: 'AgregarProducto',component:AgregarProductoComponent
      }, 
      {
        path: 'categoria',component:CategoriaComponent
      }
      , 
      {
        path: 'unidades',component:UnidadesComponent
      }
      , 
      {
        path: 'clientes',component:ClientesComponent
      }
      , 
      {
        path: 'proveedores',component:ProveedoresComponent
      }
      , 
      {
        path: 'empresa',component:EmpresaComponent
      }
      , 
      {
        path: 'sucursal', component: SucursalComponent 
      }
      , 
      {
        path: 'proveedores-reportes', component: ProveedoresReportesComponent
      }
      , 
      {
        path: 'clientes-reportes', component: ClientesReportesComponent
      }
      , 
      {
        path: 'ventas-fecha', component: VentasFechaComponent
      }
      , 
      {
        path: 'kardex',component: KardexComponent
      }
    ]
  }  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiBasicRoutingModule {}
