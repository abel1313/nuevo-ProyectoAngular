import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarClienteComponent } from './Vista/Clientes/ActualizarCliente/actualizar-cliente/actualizar-cliente.component';
import { AgregarClienteComponent } from './Vista/Clientes/AgregarCliente/agregar-cliente/agregar-cliente.component';
import { BuscarClienteComponent } from './Vista/Clientes/BuscarCliente/buscar-cliente/buscar-cliente.component';
import { VentasPagosComponent } from './Vista/GenerarReportes/ventas-pagos/ventas-pagos.component';
import { InicioSessionComponent } from './Vista/InicioSession/inicio-session/inicio-session.component';
import { PagosVentaMostrarComponent } from './Vista/PagosVenta/pagos-venta-mostrar/pagos-venta-mostrar.component';
import { AgregarPermisosComponent } from './Vista/Permisos/AgregarPermisos/agregar-permisos/agregar-permisos.component';
import { MostrarPermisosComponent } from './Vista/Permisos/MostrarPermisos/mostrar-permisos/mostrar-permisos.component';
import { AgregarProductoComponent } from './Vista/Productos/agregar-producto/agregar-producto.component';
import { BuscarProductosComponent } from './Vista/Productos/buscar-productos/buscar-productos.component';
import { EditarProductosComponent } from './Vista/Productos/editar-productos/editar-productos.component';
import { GenerarReportesVentasComponent } from './Vista/Reportes/generar-reportes-ventas/generar-reportes-ventas.component';
import { GenerarReportesComponent } from './Vista/Reportes/generar-reportes/generar-reportes.component';
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
//  { path: 'productos/nuevo', component: AgregarProductoComponent },
//  { path: 'productos/buscar', component: BuscarProductosComponent },
//  { path: 'editarProducto', component: EditarProductosComponent },


//  { path: 'acceso', component: InicioSessionComponent },
 { path: 'permisos/nuevo', component: AgregarPermisosComponent },
 { path: 'permisos/buscar', component: MostrarPermisosComponent },
 { path: 'reportes/reportepago', component: ReportePagoComponent },
 { path: 'reportes/generarreportes', component: GenerarReportesComponent },
 { path: 'reportes/generarreporteventas', component: GenerarReportesVentasComponent },
 { path: 'reportes/ventaspagoscliente', component: VentasPagosComponent },

 {
  path: 'sistema',
  loadChildren: ()=> import('./Module/AccesosSistema/acceso/acceso.module')
  .then( m=> m.AccesoModule )
},

 { path: 'marcas', 
 loadChildren: ()=> import('./Module/Marcas/module-marca/module-marca.module')
 .then( m=> m.ModuleMarcaModule )
},
{
  path: 'proveedores',
  loadChildren: ()=> import('./Module/Proveedor/module-proveedor/module-proveedor.module')
  .then( m=> m.ModuleProveedorModule )
},
{
  path: 'barras',
  loadChildren: ()=> import('./Module/CodigoBarra/module-codigo-barra/module-codigo-barra.module')
  .then( m=> m.ModuleCodigoBarraModule )
},
{
  path: 'productos', 
  loadChildren: ()=> import( './Module/Productos/module-producto/module-producto.module' )
  .then(m=> m.ModuleProductoModule )
},
{
  path: 'clientes', 
  loadChildren: ()=> import( './Module/Clientes/module-cliente/module-cliente.module' )
  .then(m=> m.ModuleClienteModule )
},
{
  path: 'ventas',
  loadChildren: ()=> import('./Module/Ventas/module-venta/module-venta.module')
  .then( m=> m.ModuleVentaModule )
},
{
  path: 'ejemplo',
  loadChildren: ()=> import('./Module/Ejemplo/PrimerEjemplo/primer-ejemplo/primer-ejemplo.module')
  .then( m=> m.PrimerEjemploModule )
},

{
  path: 'error',
  loadChildren: ()=> import('./Module/PaginaNoEncontrada/module-pagina-no-encontrada/module-pagina-no-encontrada.module')
  .then( m=> m.ModulePaginaNoEncontradaModule )
},




//{ path: '**', redirectTo: 'ejemplos/primero', pathMatch: 'full' }
  { path: '**', redirectTo: 'error/paginanoencontrada', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
