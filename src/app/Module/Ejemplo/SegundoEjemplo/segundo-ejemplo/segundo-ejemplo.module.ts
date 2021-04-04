import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegundoEjemploRoutingModule } from './segundo-ejemplo-routing.module';
import { SegundoEjemploComponent } from 'src/app/Vista/Ejemplos/SegundoEjemplo/segundo-ejemplo/segundo-ejemplo.component';


@NgModule({
  declarations: 
  [
    SegundoEjemploComponent
  ],
  imports: [
    CommonModule,
    SegundoEjemploRoutingModule
  ],
  exports:
  [
    SegundoEjemploComponent
  ]
})
export class SegundoEjemploModule { }
