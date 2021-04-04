import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagosVentaMostrarComponent } from 'src/app/Vista/PagosVenta/pagos-venta-mostrar/pagos-venta-mostrar.component';
import { FormsModule } from '@angular/forms';
import { BuscarPagosVentaComponent } from 'src/app/Vista/PagosVenta/BuscarPagos/buscar-pagos-venta/buscar-pagos-venta.component';
import { MateriaModule } from '../../materia/materia.module';



@NgModule({
  declarations: 
  [
    PagosVentaMostrarComponent,
    BuscarPagosVentaComponent,
     
  ],
  imports: [
    CommonModule,
    FormsModule,
    MateriaModule
  ], exports:
  [
    PagosVentaMostrarComponent,
    BuscarPagosVentaComponent,
     
  ]
})
export class PagosVentaMostrarModule { }
