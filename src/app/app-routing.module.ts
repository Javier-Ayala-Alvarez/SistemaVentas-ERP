import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  // Rutas para usuarios no autenticados (Guest)
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./demo/authentication/sign-in/sign-in.component').then(m => m.SignInComponent)
      },
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./demo/authentication/sign-in/sign-in.component').then(m => m.SignInComponent)
      }
    ]
  },

  // Rutas protegidas para usuarios autenticados (Admin)
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'component',
        loadChildren: () =>
          import('./demo/ui-element/ui-basic.module').then(m => m.UiBasicModule)
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
