import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarClienteComponent } from 'src/app/Vista/Clientes/ActualizarCliente/actualizar-cliente/actualizar-cliente.component';
import { AgregarClienteComponent } from 'src/app/Vista/Clientes/AgregarCliente/agregar-cliente/agregar-cliente.component';
import { BuscarClienteComponent } from 'src/app/Vista/Clientes/BuscarCliente/buscar-cliente/buscar-cliente.component';

const routes: Routes = 
[
  {
    path: '',
    children: 
    [
      { path: 'nuevo', component: AgregarClienteComponent },
      { path: 'buscar', component: BuscarClienteComponent },
      { path: 'editarcliente', component: ActualizarClienteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleClienteRoutingModule { }
