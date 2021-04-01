import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccesoRoutingModule } from '../acceso-routing/acceso-routing.module';

import { AccederUsuarioComponent } from 'src/app/Vista/InicioSession/acceder-usuario/acceder-usuario.component';
import { InicioSessionComponent } from 'src/app/Vista/InicioSession/inicio-session/inicio-session.component';
import { RegistrarUsuarioComponent } from 'src/app/Vista/InicioSession/registrar-usuario/registrar-usuario.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';





@NgModule({
  declarations: 
  [
    AccederUsuarioComponent,
    InicioSessionComponent,
    RegistrarUsuarioComponent
    
  ],
  imports: [
  
    AccesoRoutingModule,
    CommonModule,
    FormsModule,
  
  ]
})
export class AccesoModule { }
