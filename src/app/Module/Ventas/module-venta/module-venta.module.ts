import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleVentaRoutingModule } from './module-venta-routing.module';
import { AgregarVentaComponent } from 'src/app/Vista/Venta/agregar-venta/agregar-venta.component';
import { PagosVentaMostrarComponent } from 'src/app/Vista/PagosVenta/pagos-venta-mostrar/pagos-venta-mostrar.component';
import { BuscarPagosVentaComponent } from 'src/app/Vista/PagosVenta/BuscarPagos/buscar-pagos-venta/buscar-pagos-venta.component';
import { AgregarDireccionComponent } from 'src/app/Vista/Direccion/agregar-direccion/agregar-direccion.component';
import { AgregarPersonaComponent } from 'src/app/Vista/Personas/AgregarPersona/agregar-persona/agregar-persona.component';
import { ModulePersonaModule } from '../../Personas/module-persona/module-persona.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: 
  [
    AgregarVentaComponent,
    PagosVentaMostrarComponent,
    BuscarPagosVentaComponent,
    AgregarDireccionComponent,
    
  ],
  imports: [
    CommonModule,
    ModuleVentaRoutingModule,
    FormsModule,
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class ModuleVentaModule { }
