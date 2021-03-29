import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarClienteComponent } from './Vista/Clientes/ActualizarCliente/actualizar-cliente/actualizar-cliente.component';
import { AgregarClienteComponent } from './Vista/Clientes/AgregarCliente/agregar-cliente/agregar-cliente.component';
import { BuscarClienteComponent } from './Vista/Clientes/BuscarCliente/buscar-cliente/buscar-cliente.component';
import { InicioSessionComponent } from './Vista/InicioSession/inicio-session/inicio-session.component';
import { PagosVentaMostrarComponent } from './Vista/PagosVenta/pagos-venta-mostrar/pagos-venta-mostrar.component';
import { AgregarPermisosComponent } from './Vista/Permisos/AgregarPermisos/agregar-permisos/agregar-permisos.component';
import { MostrarPermisosComponent } from './Vista/Permisos/MostrarPermisos/mostrar-permisos/mostrar-permisos.component';
import { AgregarProductoComponent } from './Vista/Productos/agregar-producto/agregar-producto.component';
import { BuscarProductosComponent } from './Vista/Productos/buscar-productos/buscar-productos.component';
import { EditarProductosComponent } from './Vista/Productos/editar-productos/editar-productos.component';
import { ReportePagoComponent } from './Vista/Reportes/reporte-pago/reporte-pago.component';
import { AgregarVentaComponent } from './Vista/Venta/agregar-venta/agregar-venta.component';

const routes: Routes = 
[
    // { path: 'login', component: LoginAppComponent },
  // { path: 'registrar', component: RegistrarUsuarioComponent },
 // { path: 'productos', component: MostrarProductoComponent },
 //  { path: 'consultarProductos', component: ConsultarProductoComponent },
  // { path: 'agregarProducto', component: RegistrarProductoComponent },
 //  { path: 'persona', component: AgregarPersonaAppComponent },
 // { path: 'direccion', component: AgregarDireccionAppComponent },
 // { path: 'permiso', component: AgregarPermisoAppComponent },
 { path: 'productos/nuevo', component: AgregarProductoComponent },
 { path: 'productos/buscar', component: BuscarProductosComponent },
 { path: 'editarProducto', component: EditarProductosComponent },
 { path: 'ventas/nueva', component: AgregarVentaComponent },
 { path: 'ventas/buscar', component: PagosVentaMostrarComponent },
 { path: 'clientes/nuevo', component: AgregarClienteComponent },
 { path: 'clientes/buscar', component: BuscarClienteComponent },
 { path: 'editarcliente', component: ActualizarClienteComponent },
 { path: 'acceso', component: InicioSessionComponent },
 { path: 'permisos/nuevo', component: AgregarPermisosComponent },
 { path: 'permisos/buscar', component: MostrarPermisosComponent },
 { path: 'reportes/reportepago', component: ReportePagoComponent },

 { path: '**', redirectTo: 'productos/buscar', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
