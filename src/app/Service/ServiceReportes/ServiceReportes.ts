import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { UriJava } from "../../URISERVER/UriJava";
import { Usuario } from "../../Model/Usuarios/Usuario";
import { EventEmitter } from "@angular/core";
import { IReporteVenta } from "src/app/Model/Reportes/IReporteVenta";
import { IDTOReportesVentas } from "src/app/Model/Reportes/IDTOReportesVentas";




// import { ServiceAppService } from "../service-app.service";


export class ServiceReportes
{
    
    constructor(private http: HttpClient){}
    
    private uri = new UriJava();

    reportesVenta$ = new EventEmitter<string>();
 
    
 
     obtenerReportesVentas( inicio: string, fin: string ): Observable<IReporteVenta[]>
    {
        
        return this.http.get<IReporteVenta[]>(`${this.uri.UriJavaFerreteria}/reportes/ventas/${inicio}/${fin}`);
    }
    // accesoSistema( usuario: Usuario): Observable<Usuario[]>
    // {
    //     return this.http.post<Usuario[]>(`${this.uri.UriJavaFerreteria}/usuarios/accesousuario`, usuario);
    // }

    // guardarUsuarioServer( usuario: Usuario): Observable<Usuario>
    // {
    //     return this.http.post<Usuario>(`${this.uri.UriJavaFerreteria}/usuarios/guardarusuario`, usuario);
    // }

    // existsUsuario( nombreUsuario: string): Observable<Boolean>
    // {
    //     return this.http.get<Boolean>(`${this.uri.UriJavaFerreteria}/usuarios/existsusuario/${nombreUsuario}`);
    // }

    // getUsuarios(): Observable<Usuario[]>
    // {
    //     return this.http.get<Usuario[]>(`${this.uri.UriJavaFerreteria}/usuarios`);
    // }
}