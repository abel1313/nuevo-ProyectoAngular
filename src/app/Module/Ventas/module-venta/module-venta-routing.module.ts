import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagosVentaMostrarComponent } from 'src/app/Vista/PagosVenta/pagos-venta-mostrar/pagos-venta-mostrar.component';
import { AgregarVentaComponent } from 'src/app/Vista/Venta/agregar-venta/agregar-venta.component';

const routes: Routes = 
[
  // {
  //   path: '',
  //   children: 
  //   [
  //     { path: 'nueva', component: AgregarVentaComponent },
  //     { path: 'buscar', component: PagosVentaMostrarComponent },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleVentaRoutingModule { }
