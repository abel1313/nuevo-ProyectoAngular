import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { UriJava } from "../../URISERVER/UriJava";
import { Usuario } from "../../Model/Usuarios/Usuario";
import { EventEmitter } from "@angular/core";

import { environment } from "../../../environments/environment";


// import { ServiceAppService } from "../service-app.service";


export class ServiceUsuario
{
    
    constructor(private http: HttpClient, private uriServer: string ){}
    
    private uri = new UriJava();

    permisosVentas$ = new EventEmitter<Boolean>();
    permisosUsuarios$ = new EventEmitter<Boolean>();
     permisosProductos$ = new EventEmitter<Boolean>();
    permisosClientes$ = new EventEmitter<Boolean>();
    nombreUsuario$ = new EventEmitter<string>();

    irRegistrar$ = new EventEmitter<Boolean>();
 
     obtenerUsuarios()
    {
        return this.http.get(`${this.uriServer}/`);
    }
    accesoSistema( usuario: Usuario): Observable<Usuario[]>
    {
        return this.http.post<Usuario[]>(`${this.uriServer}/usuarios/accesousuario`, usuario);
    }

    guardarUsuarioServer( usuario: Usuario): Observable<Usuario>
    {
        return this.http.post<Usuario>(`${this.uriServer}/usuarios/guardarusuario`, usuario);
    }

    existsUsuario( nombreUsuario: string): Observable<Boolean>
    {
        return this.http.get<Boolean>(`${this.uriServer}/usuarios/existsusuario/${nombreUsuario}`);
    }

    getUsuarios(): Observable<Usuario[]>
    {
        return this.http.get<Usuario[]>(`${this.uriServer}/usuarios`);
    }


}