import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoDetalleComponent } from 'src/app/Vista/DetalleVenta/carrito-detalle/carrito-detalle.component';
import { ModuleVentaModule } from '../../Ventas/module-venta/module-venta.module';




@NgModule({
  declarations: 
  [
    CarritoDetalleComponent
  ],
  imports: [
    CommonModule,
    ModuleVentaModule
  ],
  exports:
  [
    CarritoDetalleComponent
  ]
})
export class CarritoDetalleModule { }
