import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GenerarReportesComponent } from 'src/app/Vista/Reportes/generar-reportes/generar-reportes.component';

const routes: Routes = 
[
  {
    path: '', children:
    [
      { path: 'generarreportes', component: GenerarReportesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleReportesRoutingModule { }
