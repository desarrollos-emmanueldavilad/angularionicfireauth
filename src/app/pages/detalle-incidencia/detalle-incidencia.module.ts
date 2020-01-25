import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalleIncidenciaPage } from './detalle-incidencia.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleIncidenciaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalleIncidenciaPage]
})
export class DetalleIncidenciaPageModule {}
