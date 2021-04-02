import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarMarcasComponent } from 'src/app/Vista/Marcas/Buscar/buscar-marcas/buscar-marcas.component';
import { EditarMarcaComponent } from 'src/app/Vista/Marcas/Editar/editar-marca/editar-marca.component';
import { AgregarMarcasComponent } from 'src/app/Vista/Marcas/Nuevo/agregar-marcas/agregar-marcas.component';

const routes: Routes = 
[
  {
    path: '', children: 
    [
      { path: 'nueva', component: AgregarMarcasComponent },
      { path: 'buscar', component: BuscarMarcasComponent },
      { path: 'editar', component: EditarMarcaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleMarcaRoutingModule { }
