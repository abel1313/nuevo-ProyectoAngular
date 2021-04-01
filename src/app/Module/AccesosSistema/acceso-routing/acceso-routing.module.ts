import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccederUsuarioComponent } from 'src/app/Vista/InicioSession/acceder-usuario/acceder-usuario.component';
import { RegistrarUsuarioComponent } from 'src/app/Vista/InicioSession/registrar-usuario/registrar-usuario.component';


const routes: Routes = 
[
  {
    path: '',
    children: 
    [
      { path: 'acceso', component: AccederUsuarioComponent },
      { path: 'registrar', component: RegistrarUsuarioComponent },
      { path: '**', redirectTo: 'acceso'}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ]
})
export class AccesoRoutingModule { }
