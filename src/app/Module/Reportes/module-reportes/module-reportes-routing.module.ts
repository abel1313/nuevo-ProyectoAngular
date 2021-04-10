import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GenerarReportesComponent } from 'src/app/Vista/Reportes/generar-reportes/generar-reportes.component';
import { PagosClienteComponent } from 'src/app/Vista/Reportes/Pagos/PagosCliente/pagos-cliente/pagos-cliente.component';

const routes: Routes = 
[
  {
    path: '', children:
    [
      { path: 'generarreportes', component: GenerarReportesComponent },
      { path: 'pagocliente', component: PagosClienteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleReportesRoutingModule { }
