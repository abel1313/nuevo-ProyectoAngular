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
import { ServiceMarca } from './ServiceMarcas/ServiceMarca';

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServiceFerreteriaService {
  producto$ = new EventEmitter();
  uri: string = '';

  // 2do Iniciar el contructor con las solicitudes del cliente
constructor(private http: HttpClient) 
{

 }

// 3ero Métodos del cliente

// ------------------------------ Usuarios ------------------------------------------ //


// ------------------------------ Productos ------------------------------------------ //

serviceProducto = new ServiceProducto(this.http, environment.appUri );
serviceProveedor = new ServiceProveedor(this.http, environment.appUri );
serviceDetalle = new ServiceDetalle(this.http, environment.appUri);

serviceVenta = new ServiceVenta(this.http, environment.appUri);

serviceCliente = new ServiceCliente(this.http, environment.appUri);

serivicePagosVenta = new ServicePagoVenta(this.http, environment.appUri);


seriviceVentasPagadas = new ServiceVentasPagadas(this.http, environment.appUri);

// clase service para las categoria
seriviceCategoria = new ServiceCategoria(this.http, environment.appUri);

serviceUsuario = new ServiceUsuario(this.http, environment.appUri);

serviceMenu = new ServiceMenu(this.http, environment.appUri);

servicePermisos = new ServicePermisos(this.http, environment.appUri);

servicePedido = new ServicePedido(this.http, environment.appUri);

serviceDireccion = new ServiceDireccion(this.http, environment.appUri);

serviceReportes = new ServiceReportes( this.http , environment.appUri);

servicemarca = new ServiceMarca( this.http , environment.appUri);


/*

serviceVenta = new ServiceVenta(this.http);

serviceProveedor = new ServiceProveedor(this.http);
*/

}
