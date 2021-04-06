
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IVenta } from "src/app/Model/Venta/Venta";
import { IProveedor } from "src/app/Model/Proveedores/IProveedor";
import { UriJava } from "src/app/URISERVER/UriJava";
import { EventEmitter } from "@angular/core";
import { ICliente } from "src/app/Model/Clientes/ICliente";
import { IDireccion } from "src/app/Model/Direccion/IDireccion";



// import { ServiceAppService } from "../service-app.service";


export class ServiceDireccion
{
    
    // ventaCliente$ = new EventEmitter<ICliente>();
    // ventaRes$ = new EventEmitter<ICliente>();

    // direccion$ = new EventEmitter<IDireccion>();

    constructor(private http: HttpClient, private uriServer: string ){}
    
    private uri = new UriJava();
 
     obtenerDireccion(): Observable<IDireccion[]>
    {
        return this.http.get<IDireccion[]>(`${this.uriServer}/direcciones`);
    }
    guardarDireccion( direccion: IDireccion ): Observable<IDireccion>
    {
       
        return this.http.post<IDireccion>(`${this.uriServer}/direcciones`, direccion);
    }


}