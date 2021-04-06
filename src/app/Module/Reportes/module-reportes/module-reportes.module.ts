import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleReportesRoutingModule } from './module-reportes-routing.module';
import { GenerarReportesVentasComponent } from 'src/app/Vista/Reportes/generar-reportes-ventas/generar-reportes-ventas.component';
import { FechasVentaComponent } from 'src/app/Vista/Reportes/fechas-venta/fechas-venta.component';
import { PagosClientesComponent } from 'src/app/Vista/GenerarReportes/pagos-clientes/pagos-clientes.component';
import { MateriaModule } from '../../materia/materia.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenerarReportesComponent } from 'src/app/Vista/Reportes/generar-reportes/generar-reportes.component';


@NgModule({
  declarations: 
  [
    GenerarReportesVentasComponent,
    GenerarReportesComponent,
    FechasVentaComponent,
    PagosClientesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModuleReportesRoutingModule,
    MateriaModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class ModuleReportesModule { }
