import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulePaginaNoEncontradaRoutingModule } from './module-pagina-no-encontrada-routing.module';
import { PaginaNoEncontradaComponent } from 'src/app/Vista/PaginaNoEncontrada/pagina-no-encontrada/pagina-no-encontrada.component';


@NgModule({
  declarations: 
  [
    PaginaNoEncontradaComponent,
  ],
  imports: [
    CommonModule,
    ModulePaginaNoEncontradaRoutingModule
  ]
})
export class ModulePaginaNoEncontradaModule { }
