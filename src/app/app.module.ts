// Angular Import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ChatMsgComponent } from './theme/layout/admin/nav-bar/nav-right/chat-msg/chat-msg.component';
import { ChatUserListComponent } from './theme/layout/admin/nav-bar/nav-right/chat-user-list/chat-user-list.component';
import { FriendComponent } from './theme/layout/admin/nav-bar/nav-right/chat-user-list/friend/friend.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { SharedModule } from './theme/shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AgregarSucursalComponent } from './demo/ui-element/vistas/agregar-sucursal/agregar-sucursal.component';
import { HttpClientModule } from '@angular/common/http';
import SucursalComponent from './demo/ui-element/vistas/sucursal/sucursal.component';
import { AgregarCajaComponent } from './demo/ui-element/vistas/agregar-caja/agregar-caja.component';
import { AgregarClienteComponent } from './demo/ui-element/vistas/agregar-cliente/agregar-cliente.component';
import AgregarComprasComponent from './demo/ui-element/vistas/agregar-compras/agregar-compras.component';
import { AgregarGastosComponent } from './demo/ui-element/vistas/agregar-gastos/agregar-gastos.component';
import AgregarProductoComponent from './demo/ui-element/vistas/agregar-producto/agregar-producto.component';
import { AgregarProveedorComponent } from './demo/ui-element/vistas/agregar-proveedor/agregar-proveedor.component';
import { AgregarRemesaComponent } from './demo/ui-element/vistas/agregar-remesa/agregar-remesa.component';
import { AgregarUnidadMedidaComponent } from './demo/ui-element/vistas/agregar-unidad-medida/agregar-unidad-medida.component';
import { BuscarClienteComponent } from './demo/ui-element/vistas/buscar-cliente/buscar-cliente.component';
import { BuscarProductoComponent } from './demo/ui-element/vistas/buscar-producto/buscar-producto.component';
import { BuscarUnidadMedidaComponent } from './demo/ui-element/vistas/buscar-unidad-medida/buscar-unidad-medida.component';
import CajasComponent from './demo/ui-element/vistas/cajas/cajas.component';
import CategoriaComponent from './demo/ui-element/vistas/categoria/categoria.component';
import ClientesComponent from './demo/ui-element/vistas/clientes/clientes.component';
import ClientesReportesComponent from './demo/ui-element/vistas/clientes-reportes/clientes-reportes.component';
import ComprasComponent from './demo/ui-element/vistas/compras/compras.component';
import cotizacionesComponent from './demo/ui-element/vistas/cotizaciones/cotizaciones.component';
import DashboardComponent from './demo/ui-element/vistas/dashboard/dashboard.component';
import FacturaComponent from './demo/ui-element/vistas/factura/factura.component';
import FacturaAdministradorComponent from './demo/ui-element/vistas/factura-administrador/factura-administrador.component';
import { FormaDePagoComponent } from './demo/ui-element/vistas/forma-de-pago/forma-de-pago.component';
import GastosComponent from './demo/ui-element/vistas/gastos/gastos.component';
import ProductosComponent from './demo/ui-element/vistas/productos/productos.component';
import ProveedoresComponent from './demo/ui-element/vistas/proveedores/proveedores.component';
import ProveedoresReportesComponent from './demo/ui-element/vistas/proveedores-reportes/proveedores-reportes.component';
import RemesasComponent from './demo/ui-element/vistas/remesas/remesas.component';
import UnidadesComponent from './demo/ui-element/vistas/unidades/unidades.component';
import VentasFechaComponent from './demo/ui-element/vistas/ventas-fecha/ventas-fecha.component';
import { MatCardModule } from '@angular/material/card';
import { EmpresaComponent } from './demo/ui-element/vistas/empresa/empresa.component';
import { AgregarCategoriaComponent } from './demo/ui-element/vistas/agregar-categoria/agregar-categoria.component';
import { AgregarCotizacionComponent } from './demo/ui-element/vistas/agregar-cotizacion/agregar-cotizacion.component';
import { BuscarProveedorComponent } from './demo/ui-element/vistas/buscar-proveedor/buscar-proveedor.component';
import { SignInComponent } from './demo/authentication/sign-in/sign-in.component';
import { authInterceptorProviders } from './demo/ui-element/services/auth-interceptor.service';
import { KardexComponent } from './demo/ui-element/vistas/kardex/kardex.component';

@NgModule({
  declarations: [
    SignInComponent,
    AppComponent,
    AdminComponent,
    GuestComponent,
    NavBarComponent,
    NavigationComponent,
    NavLeftComponent,
    NavRightComponent,
    ChatMsgComponent,
    ChatUserListComponent,
    FriendComponent,
    NavContentComponent,
    NavItemComponent,
    NavCollapseComponent,
    NavGroupComponent,
    AgregarSucursalComponent,
    SucursalComponent,
    AgregarCajaComponent,
    AgregarClienteComponent,
    AgregarComprasComponent,
    AgregarGastosComponent,
    AgregarProductoComponent,
    AgregarProveedorComponent,
    AgregarRemesaComponent,
    AgregarSucursalComponent,
    AgregarUnidadMedidaComponent,
    AgregarCategoriaComponent,
    BuscarClienteComponent,
    BuscarProductoComponent,
    BuscarUnidadMedidaComponent,
    CajasComponent,
    CategoriaComponent,
    ClientesComponent,
    ClientesReportesComponent,
    ComprasComponent,
    cotizacionesComponent,
    DashboardComponent,
    EmpresaComponent,
    FacturaComponent,
    FacturaAdministradorComponent,
    FormaDePagoComponent,
    GastosComponent,
    KardexComponent,
    ProductosComponent,
    ProveedoresComponent,
    ProveedoresReportesComponent,
    RemesasComponent,
    SucursalComponent,
    UnidadesComponent,
    VentasFechaComponent,
    AgregarCotizacionComponent,
    BuscarProveedorComponent,
    BuscarProductoComponent,
    SignInComponent
     ],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    MatPaginatorModule,
    HttpClientModule,
    MatCardModule ],
  providers: [
    authInterceptorProviders, {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    provideAnimationsAsync(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
