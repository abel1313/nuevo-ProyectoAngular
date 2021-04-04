import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimerEjemploRoutingModule } from './primer-ejemplo-routing.module';
import { PrimerEjemploComponent } from 'src/app/Vista/Ejemplos/PrimerEjemplo/primer-ejemplo/primer-ejemplo.component';
import { SegundoEjemploModule } from '../../SegundoEjemplo/segundo-ejemplo/segundo-ejemplo.module';


@NgModule({
  declarations: 
  [
    PrimerEjemploComponent
    
  ],
  imports: 
  [
    CommonModule,
    PrimerEjemploRoutingModule,
    SegundoEjemploModule
  ]
})
export class PrimerEjemploModule { }
