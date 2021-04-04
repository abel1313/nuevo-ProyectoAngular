import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimerEjemploComponent } from 'src/app/Vista/Ejemplos/PrimerEjemplo/primer-ejemplo/primer-ejemplo.component';

const routes: Routes = 
[
  {
    path: '',
    children: 
    [
       { path: 'primero', component: PrimerEjemploComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrimerEjemploRoutingModule { }
