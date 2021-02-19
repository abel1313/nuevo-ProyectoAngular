import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UriJava } from "src/app/URISERVER/UriJava";



// import { ServiceAppService } from "../service-app.service";


export class ServiceProveedor
{
    
    constructor(private http: HttpClient){}
    
    private uri = new UriJava();
 
     obtenerProveedores()
    {
        
        return this.http.get(`${this.uri.UriJavaFerreteria}/proveedores`);
    }


}