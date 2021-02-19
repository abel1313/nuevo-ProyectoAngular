import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// 3er paso Agregar/Importar HttpClientMode habilitar el service y agregarlo a imports
import { HttpClientModule } from '@angular/common/http';
// 5to Agregar/Importar la clase servicio para que los service funcione
import { ServiceFerreteriaService } from './Service/service-ferreteria.service';
// 7tmo agregar el modulo de forms para la interpolacion y agregar en imports
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarProductoComponent } from './Vista/Prductos/agregar-producto/agregar-producto.component';

import { NavFerreteriaComponent } from './Vista/Navegacion/nav-ferreteria/nav-ferreteria.component';
import { FootFerreteriaComponent } from './Vista/Footer/foot-ferreteria/foot-ferreteria.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AgregarProveedorComponent } from './Vista/Proveedores/agregar-proveedor/agregar-proveedor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavFerreteriaComponent,
    FootFerreteriaComponent,
    AgregarProductoComponent,
    AgregarProveedorComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

            // 4to Agregar HttpClientModule para que el service funcione
            HttpClientModule,
            // 7.2 agregar a imports para el forms
            FormsModule,
            
            ReactiveFormsModule,
            AutocompleteLibModule
    
        
  ],
  providers: [ServiceFerreteriaService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AppModule { }
