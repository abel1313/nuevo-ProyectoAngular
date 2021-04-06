

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IVenta } from "src/app/Model/Venta/Venta";
import { IProveedor } from "src/app/Model/Proveedores/IProveedor";
import { UriJava } from "src/app/URISERVER/UriJava";
import { EventEmitter } from "@angular/core";
import { ICliente } from "src/app/Model/Clientes/ICliente";
import { IDireccion } from "src/app/Model/Direccion/IDireccion";



// import { ServiceAppService } from "../service-app.service";


export class ServiceVenta
{
    
    ventaCliente$ = new EventEmitter<ICliente>();
    ventaRes$ = new EventEmitter<ICliente>();

    direccion$ = new EventEmitter<IDireccion>();

    constructor(private http: HttpClient, private uriServer: string ){}
    
    
 
     obtenerProveedores()
    {
        return this.http.get(`${this.uriServer}/ventas`);
    }
    guardarProveedor( venta: IVenta ): Observable<any>
    {
       
        return this.http.post(`${this.uriServer}/ventas/saveVenta`, venta);
    }


}
