import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodigoBarrasComponent } from 'src/app/Vista/CodigoBarra/codigo-barras/codigo-barras.component';

const routes: Routes = 
[
  { path: '', children: 
  [
    { path: 'lector', component: CodigoBarrasComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleCodigoBarraRoutingModule { }
