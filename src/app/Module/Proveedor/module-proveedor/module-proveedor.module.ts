import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleProveedorRoutingModule } from './module-proveedor-routing.module';
import { AgregarProveedorComponent } from 'src/app/Vista/Proveedores/agregar-proveedor/agregar-proveedor.component';
import { MateriaModule } from '../../materia/materia.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: 
  [
    AgregarProveedorComponent
  ],
  imports: [
    CommonModule,
    ModuleProveedorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MateriaModule,
  ]
})
export class ModuleProveedorModule { }
