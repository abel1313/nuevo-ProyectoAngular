import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarProveedorComponent } from 'src/app/Vista/Proveedores/agregar-proveedor/agregar-proveedor.component';

const routes: Routes = 
[
  {
    path: '', children: 
    [
      { path: 'nuevo', component: AgregarProveedorComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleProveedorRoutingModule { }
