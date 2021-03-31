import { EventEmitter, Injectable } from '@angular/core';

// 1ro importar el modulo de http para las solicitudes del cliente
import { HttpClient } from '@angular/common/http';
import { ServiceProducto } from './ServiceProducto/ServiceProducto';
import { ServiceProveedor } from './ServiceProveedor/ServiceProveedor';
import { ServiceDetalle } from './ServiceProducto/ServiceDetalle';
import { ServiceVenta } from './ServiceVenta/ServiceVenta';
import { ServiceCliente } from './ServiceCliente/ServiceCliente';
import { ServicePagoVenta } from './ServicePagoVenta/ServicePagoVenta';
import { ServiceVentasPagadas } from './ServiceVentasPagadas/ServiceVentasPagadas';
import { ServiceCategoria } from './ServiceCategoria/ServiceCategoria';
import { ServiceUsuario  } from "./ServiceUsuario/ServiceUsuario";

import { ServiceMenu  } from "./ServiceMenu/ServiceMenu";
import { ServicePermisos } from './ServicePermisos/ServicePermisos';
import { ServicePedido } from './ServicePedido/ServicePedido';
import { ServiceDireccion } from './ServiceDireccion/ServiceDireccion';
import { ServiceReportes } from './ServiceReportes/ServiceReportes';



@Injectable({
  providedIn: 'root'
})
export class ServiceFerreteriaService {
  producto$ = new EventEmitter();


  // 2do Iniciar el contructor con las solicitudes del cliente
constructor(private http: HttpClient) { }

// 3ero Métodos del cliente

// ------------------------------ Usuarios ------------------------------------------ //

/*

  obtenerUsuario(idUsurio: number): Observable<Usuario>
{
  return this.http.get(`${this.URI_JAVA}/usuario/login/${idUsurio}`);
}
getOneUsuario(usr: object)
{
// console.log(usr);
  //console.log(`${this.URI_JAVA_Productos}/all/${nombreProducto}`);
  return this.http.post(`${this.URI_JAVA_USUARIOS}`, usr);
}
obtenerUsuarios(): any
{
  return this.http.get(`${this.URI_JAVA}/usuario/login`);
}
guardarUsuario(usuario: Usuario): Observable<Usuario>
{
  return this.http.post(`${this.URI_JAVA}/usuario/login`, usuario);
}
eliminarUsuario(id: number): Observable<Usuario>
{
  return this.http.delete(`${this.URI_JAVA}/usuario/login/${id}`);
}
editarUsuario(id: number, updateUsuario: Usuario): Observable<Usuario>
{
  return this.http.put(`${this.URI_JAVA}/usuario/login/${id}`, updateUsuario);
}

*/

// ------------------------------ Usuarios ------------------------------------------ //

// ------------------------------ Productos ------------------------------------------ //

// generarDetalle(idProducto: number) { 
//return this.http.post(`${this.URI_JAVA_Productos}/generarDetalle/${idProducto}`, 2);
//} 


// ------------------------------ Productos ------------------------------------------ //

serviceProducto = new ServiceProducto(this.http);
serviceProveedor = new ServiceProveedor(this.http);
serviceDetalle = new ServiceDetalle(this.http);

serviceVenta = new ServiceVenta(this.http);

serviceCliente = new ServiceCliente(this.http);

serivicePagosVenta = new ServicePagoVenta(this.http);


seriviceVentasPagadas = new ServiceVentasPagadas(this.http);

// clase service para las categoria
seriviceCategoria = new ServiceCategoria(this.http);

serviceUsuario = new ServiceUsuario(this.http);

serviceMenu = new ServiceMenu(this.http);

servicePermisos = new ServicePermisos(this.http);

servicePedido = new ServicePedido(this.http);

serviceDireccion = new ServiceDireccion(this.http);

serviceReportes = new ServiceReportes( this.http );


/*

serviceVenta = new ServiceVenta(this.http);

serviceProveedor = new ServiceProveedor(this.http);
*/

}
