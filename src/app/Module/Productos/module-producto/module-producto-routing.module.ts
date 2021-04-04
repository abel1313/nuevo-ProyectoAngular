import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarProductoComponent } from 'src/app/Vista/Productos/agregar-producto/agregar-producto.component';
import { BuscarProductosComponent } from 'src/app/Vista/Productos/buscar-productos/buscar-productos.component';
import { EditarProductosComponent } from 'src/app/Vista/Productos/editar-productos/editar-productos.component';

const routes: Routes = 
[
  {
    path: '', children: 
    [
      { path: 'nuevo', component: AgregarProductoComponent },
      { path: 'buscar', component: BuscarProductosComponent },
      { path: 'editarProducto', component: EditarProductosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleProductoRoutingModule { }
