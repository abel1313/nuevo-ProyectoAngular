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
import { AgregarProductoComponent } from './Vista/Productos/agregar-producto/agregar-producto.component';


import { NavFerreteriaComponent } from './Vista/Navegacion/nav-ferreteria/nav-ferreteria.component';
import { FootFerreteriaComponent } from './Vista/Footer/foot-ferreteria/foot-ferreteria.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AgregarProveedorComponent } from './Vista/Proveedores/agregar-proveedor/agregar-proveedor.component';
import { BuscarProductosComponent } from './Vista/Productos/buscar-productos/buscar-productos.component';
import { MostrarProductosComponent } from './Vista/Productos/mostrar-productos/mostrar-productos.component';
import { CarritoDetalleComponent } from './Vista/DetalleVenta/carrito-detalle/carrito-detalle.component';
import { AgregarVentaComponent } from './Vista/Venta/agregar-venta/agregar-venta.component';
import { PagosVentaMostrarComponent } from './Vista/PagosVenta/pagos-venta-mostrar/pagos-venta-mostrar.component';
import { BuscarPagosVentaComponent } from './Vista/PagosVenta/BuscarPagos/buscar-pagos-venta/buscar-pagos-venta.component';
import { AgregarClienteComponent } from './Vista/Clientes/AgregarCliente/agregar-cliente/agregar-cliente.component';
import { MostrarClienteComponent } from './Vista/Clientes/MostrarCliente/mostrar-cliente/mostrar-cliente.component';
import { BuscarClienteComponent } from './Vista/Clientes/BuscarCliente/buscar-cliente/buscar-cliente.component';
import { AgregarPersonaComponent } from './Vista/Personas/AgregarPersona/agregar-persona/agregar-persona.component';
import { ActualizarClienteComponent } from './Vista/Clientes/ActualizarCliente/actualizar-cliente/actualizar-cliente.component';

@NgModule({
  declarations: [
    AppComponent,


    NavFerreteriaComponent,
    FootFerreteriaComponent,
    AgregarProductoComponent,
    AgregarProveedorComponent,
    BuscarProductosComponent,
    MostrarProductosComponent,
    CarritoDetalleComponent,
    AgregarVentaComponent,
    PagosVentaMostrarComponent,
    BuscarPagosVentaComponent,
    AgregarClienteComponent,
    MostrarClienteComponent,
    BuscarClienteComponent,
    AgregarPersonaComponent,
    ActualizarClienteComponent,
    


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
