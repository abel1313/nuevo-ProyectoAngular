import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarMarcasComponent } from 'src/app/Vista/Marcas/Buscar/buscar-marcas/buscar-marcas.component';
import { AgregarMarcasComponent } from 'src/app/Vista/Marcas/Nuevo/agregar-marcas/agregar-marcas.component';

const routes: Routes = 
[
  {
    path: '', children: 
    [
      { path: 'nuevo', component: AgregarMarcasComponent },
      { path: 'buscar', component: BuscarMarcasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleMarcaRoutingModule { }
