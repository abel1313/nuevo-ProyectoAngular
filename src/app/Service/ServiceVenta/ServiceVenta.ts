

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IVenta } from "src/app/Model/Venta/Venta";
import { IProveedor } from "src/app/Model/Proveedores/IProveedor";
import { UriJava } from "src/app/URISERVER/UriJava";



// import { ServiceAppService } from "../service-app.service";


export class ServiceVenta
{
    
    constructor(private http: HttpClient){}
    
    private uri = new UriJava();
 
     obtenerProveedores()
    {
        return this.http.get(`${this.uri.UriJavaFerreteria}/ventas`);
    }
    guardarProveedor( venta: IVenta ): Observable<any>
    {
       
        return this.http.post(`${this.uri.UriJavaFerreteria}/ventas/saveVenta`, venta);
    }


}
