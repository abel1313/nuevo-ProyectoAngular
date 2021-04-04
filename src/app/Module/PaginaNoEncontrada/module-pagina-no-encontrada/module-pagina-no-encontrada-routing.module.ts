import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNoEncontradaComponent } from 'src/app/Vista/PaginaNoEncontrada/pagina-no-encontrada/pagina-no-encontrada.component';

const routes: Routes = 
[
  {
    path: '', children: 
    [
      { path: 'paginanoencontrada', component: PaginaNoEncontradaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulePaginaNoEncontradaRoutingModule { }
