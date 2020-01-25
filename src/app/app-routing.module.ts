import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'registro', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './pages/registro/registro.module#RegistroPageModule' },
  { path: 'quienes-somos', loadChildren: './pages/quienes-somos/quienes-somos.module#QuienesSomosPageModule' },
  { path: 'inicio', loadChildren: './pages/inicio/inicio.module#InicioPageModule' },
  { path: 'producto', loadChildren: './pages/producto/producto.module#ProductoPageModule' },
  { path: 'detalle-producto', loadChildren: './pages/detalle-producto/detalle-producto.module#DetalleProductoPageModule' },
  { path: 'incidencia', loadChildren: './pages/incidencia/incidencia.module#IncidenciaPageModule' },
  { path: 'detalle-incidencia', loadChildren: './pages/detalle-incidencia/detalle-incidencia.module#DetalleIncidenciaPageModule' },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  { path: 'completar-perfil', loadChildren: './pages/completar-perfil/completar-perfil.module#CompletarPerfilPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
