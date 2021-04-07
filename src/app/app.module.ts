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



import { NavFerreteriaComponent } from './Vista/Navegacion/nav-ferreteria/nav-ferreteria.component';
import { FootFerreteriaComponent } from './Vista/Footer/foot-ferreteria/foot-ferreteria.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { BuscarProductosComponent } from './Vista/Productos/buscar-productos/buscar-productos.component';
import { MostrarProductosComponent } from './Vista/Productos/mostrar-productos/mostrar-productos.component';
import { CarritoDetalleComponent } from './Vista/DetalleVenta/carrito-detalle/carrito-detalle.component';
import { AgregarVentaComponent } from './Vista/Venta/agregar-venta/agregar-venta.component';
import { PagosVentaMostrarComponent } from './Vista/PagosVenta/pagos-venta-mostrar/pagos-venta-mostrar.component';

import { AgregarClienteComponent } from './Vista/Clientes/AgregarCliente/agregar-cliente/agregar-cliente.component';
import { MostrarClienteComponent } from './Vista/Clientes/MostrarCliente/mostrar-cliente/mostrar-cliente.component';
import { BuscarClienteComponent } from './Vista/Clientes/BuscarCliente/buscar-cliente/buscar-cliente.component';
import { AgregarPersonaComponent } from './Vista/Personas/AgregarPersona/agregar-persona/agregar-persona.component';
import { ActualizarClienteComponent } from './Vista/Clientes/ActualizarCliente/actualizar-cliente/actualizar-cliente.component';

import { ExampleUsuarioComponent } from './Vista/InicioSession/example-usuario/example-usuario.component';
import { AgregarPermisosComponent } from './Vista/Permisos/AgregarPermisos/agregar-permisos/agregar-permisos.component';
import { MostrarPermisosComponent } from './Vista/Permisos/MostrarPermisos/mostrar-permisos/mostrar-permisos.component';
import { EditarProductosComponent } from './Vista/Productos/editar-productos/editar-productos.component';
import { AgregarDireccionComponent } from './Vista/Direccion/agregar-direccion/agregar-direccion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { MatInputModule } from '@angular/material/input';

import { PaginaNoEncontradaComponent } from './Vista/PaginaNoEncontrada/pagina-no-encontrada/pagina-no-encontrada.component';
import { FechasVentaComponent } from './Vista/Reportes/fechas-venta/fechas-venta.component';
import { GenerarReportesComponent } from './Vista/Reportes/generar-reportes/generar-reportes.component';

//import { MateriaModule } from "./Module/materia/materia.module";

import { MatDatepickerModule } from '@angular/material/datepicker';

import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';

import { GenerarReportesVentasComponent } from './Vista/Reportes/generar-reportes-ventas/generar-reportes-ventas.component';
import { PagosClientesComponent } from './Vista/GenerarReportes/pagos-clientes/pagos-clientes.component';

import { CodigoBarrasComponent } from './Vista/CodigoBarra/codigo-barras/codigo-barras.component';
import { ModuleProductoModule } from './Module/Productos/module-producto/module-producto.module';
import { PrimerEjemploComponent } from './Vista/Ejemplos/PrimerEjemplo/primer-ejemplo/primer-ejemplo.component';





@NgModule({
  declarations: [
    AppComponent,


    NavFerreteriaComponent,
    FootFerreteriaComponent,
    
  
    ExampleUsuarioComponent,
    AgregarPermisosComponent,
    MostrarPermisosComponent,
    
    CodigoBarrasComponent,

    
    
    



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

            // 4to Agregar HttpClientModule para que el service funcione
            HttpClientModule,
            // 7.2 agregar a imports para el forms
            FormsModule,
            
            ReactiveFormsModule,
            
            MatButtonModule,
            MatCardModule,

            MatNativeDateModule,
            BrowserAnimationsModule,
            MatAutocompleteModule,
         
            
    
        
  ],
  providers: [ServiceFerreteriaService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AppModule { }
