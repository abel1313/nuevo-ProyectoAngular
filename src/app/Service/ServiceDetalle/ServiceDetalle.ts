import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IDetalle } from "src/app/Model/DetalleVenta/IDetalle";
import { UriJava } from "src/app/URISERVER/UriJava";




export class ServiceDetalle
{

    constructor(private http: HttpClient){}
    
    private uri = new UriJava();
 
     obtenerProveedores()
    {
        return this.http.get(`${this.uri.UriJavaFerreteria}/ventas`);
    }
    guardarProveedor( detalle: IDetalle): Observable<any>
    {
        return this.http.post(`${this.uri.UriJavaFerreteria}/ventas/saveVenta`, detalle);
    }
        
}