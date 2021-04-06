import { HttpClient } from "@angular/common/http";
import { EventEmitter } from "@angular/core";

import { Observable } from "rxjs";
import { IProveedor } from "src/app/Model/Proveedores/IProveedor";
import { IProveedorAll } from "src/app/Model/Proveedores/IProveedorAll";
import { UriJava } from "src/app/URISERVER/UriJava";



// import { ServiceAppService } from "../service-app.service";


export class ServiceProveedor
{
    datosProveedor$ = new EventEmitter<IProveedor>();


    constructor(private http: HttpClient, private uriServer: string){}
    
    

  
 
     obtenerProveedores(): Observable<IProveedor[]>
    {
        return this.http.get<IProveedor[]>(`${this.uriServer}/proveedoress`);
    }
    nuevoProveedor(proveedor: IProveedor): Observable<IProveedor>
    {
        return this.http.post<IProveedor>(`${this.uriServer}/proveedoress`, proveedor);
    }
    guardarProveedor(proveedor: IProveedor): Observable<any>
    {
        return this.http.post(`${this.uriServer}/proveedores`, proveedor);
    }

    getAllProveedores(): Observable<IProveedorAll[]>
    {
        return this.http.get<IProveedorAll[]>(`${this.uriServer}/proveedores`);
    }
    obtenerProveedoresMarcas(): Observable<IProveedor[]>
    {
        return this.http.get<IProveedor[]>(`${this.uriServer}/proveedores`);
    }


}