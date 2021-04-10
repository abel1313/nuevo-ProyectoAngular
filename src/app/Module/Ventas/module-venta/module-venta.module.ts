import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleVentaRoutingModule } from './module-venta-routing.module';
import { AgregarVentaComponent } from 'src/app/Vista/Venta/agregar-venta/agregar-venta.component';
import { ModulePersonaModule } from '../../Personas/module-persona/module-persona.module';
import { FormsModule } from '@angular/forms';
import { AgregarDireccionModule } from '../../Direccion/agregar-direccion/agregar-direccion.module';
import { PagosVentaMostrarModule } from '../../Pagos/pagos-venta-mostrar/pagos-venta-mostrar.module';
import { MateriaModule } from '../../materia/materia.module';


@NgModule({
  declarations: 
  [
    AgregarVentaComponent,
   
    
    
  ],
  imports: [
    CommonModule,
    ModuleVentaRoutingModule,
    FormsModule,
    ModulePersonaModule,
    PagosVentaMostrarModule,
    AgregarDireccionModule,
    MateriaModule
  ],
  exports:
  [
    AgregarVentaComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class ModuleVentaModule { }
