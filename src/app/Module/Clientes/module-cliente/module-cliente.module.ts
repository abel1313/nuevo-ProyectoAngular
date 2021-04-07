import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleClienteRoutingModule } from './module-cliente-routing.module';
import { AgregarClienteComponent } from 'src/app/Vista/Clientes/AgregarCliente/agregar-cliente/agregar-cliente.component';
import { BuscarClienteComponent } from 'src/app/Vista/Clientes/BuscarCliente/buscar-cliente/buscar-cliente.component';
import { ActualizarClienteComponent } from 'src/app/Vista/Clientes/ActualizarCliente/actualizar-cliente/actualizar-cliente.component';
import { MostrarClienteComponent } from 'src/app/Vista/Clientes/MostrarCliente/mostrar-cliente/mostrar-cliente.component';

import { FormsModule } from '@angular/forms';
import { ModulePersonaModule } from '../../Personas/module-persona/module-persona.module';
import { AgregarDireccionComponent } from 'src/app/Vista/Direccion/agregar-direccion/agregar-direccion.component';
import { BuscarPagosVentaComponent } from 'src/app/Vista/PagosVenta/BuscarPagos/buscar-pagos-venta/buscar-pagos-venta.component';
import { MateriaModule } from '../../materia/materia.module';


@NgModule({
  declarations: 
  [
    ActualizarClienteComponent,
    AgregarClienteComponent,
    BuscarClienteComponent,
    MostrarClienteComponent
    
    
  ],
  imports: [
    CommonModule,
    ModuleClienteRoutingModule,
    FormsModule,
    ModulePersonaModule,
    MateriaModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class ModuleClienteModule { }
