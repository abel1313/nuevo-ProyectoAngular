import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { UriJava } from "../../URISERVER/UriJava";
import { Usuario } from "../../Model/Usuarios/Usuario";
import { EventEmitter } from "@angular/core";




// import { ServiceAppService } from "../service-app.service";


export class ServiceUsuario
{
    
    constructor(private http: HttpClient){}
    
    private uri = new UriJava();

    permisosVentas$ = new EventEmitter<Boolean>();
    permisosUsuarios$ = new EventEmitter<Boolean>();
     permisosProductos$ = new EventEmitter<Boolean>();
    permisosClientes$ = new EventEmitter<Boolean>();
    nombreUsuario$ = new EventEmitter<string>();

    irRegistrar$ = new EventEmitter<Boolean>();
 
     obtenerUsuarios()
    {
        return this.http.get(`${this.uri.UriJavaFerreteria}/`);
    }
    accesoSistema( usuario: Usuario): Observable<Usuario[]>
    {
        return this.http.post<Usuario[]>(`${this.uri.UriJavaFerreteria}/usuarios/accesousuario`, usuario);
    }


}