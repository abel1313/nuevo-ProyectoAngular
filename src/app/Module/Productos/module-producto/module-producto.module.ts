import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleProductoRoutingModule } from './module-producto-routing.module';
import { AgregarProductoComponent } from 'src/app/Vista/Productos/agregar-producto/agregar-producto.component';
import { EditarProductosComponent } from 'src/app/Vista/Productos/editar-productos/editar-productos.component';
import { BuscarProductosComponent } from 'src/app/Vista/Productos/buscar-productos/buscar-productos.component';
import { MateriaModule } from '../../materia/materia.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MostrarProductosComponent } from 'src/app/Vista/Productos/mostrar-productos/mostrar-productos.component';
import { CarritoDetalleComponent } from 'src/app/Vista/DetalleVenta/carrito-detalle/carrito-detalle.component';
import { AppModule } from 'src/app/app.module';
import { CarritoDetalleModule } from '../../CarritoDetalle/carrito-detalle/carrito-detalle.module';


@NgModule({
  declarations: 
  [

    AgregarProductoComponent,
    EditarProductosComponent,
    BuscarProductosComponent,
    MostrarProductosComponent,
    
    
  ],
  imports: [
    CommonModule,
    ModuleProductoRoutingModule,
    MateriaModule,
    FormsModule,
    ReactiveFormsModule,
    CarritoDetalleModule
    
  ],
  exports:
  [
    MostrarProductosComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class ModuleProductoModule { }
