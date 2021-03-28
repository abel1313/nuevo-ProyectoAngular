


import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IVenta } from "src/app/Model/Venta/Venta";
import { IVentasPagadas } from "src/app/Model/VentasPagadas/IVentasPagadas";

import { UriJava } from "src/app/URISERVER/UriJava";



// import { ServiceAppService } from "../service-app.service";


export class ServiceVentasPagadas
{
    
    constructor(private http: HttpClient){}
    
    private uri = new UriJava();
 
     obtenerVentasPagadas()
    {
        return this.http.get(`${this.uri.UriJavaFerreteria}/ventas`);
    }
    guardarVentasPagadas( ventasPagadas: IVentasPagadas ): Observable<any>
    {
     
        return this.http.post( `${this.uri.UriJavaFerreteria}/ventaspagadas/guardarventapagada`, ventasPagadas );
    }

    guardarVentaPagadaNew( ventasPagadas: IVentasPagadas ): Observable<any>
    {
        return this.http.post( `${this.uri.UriJavaFerreteria}/ventaspagadas/guardarventapagada`, ventasPagadas );
    }


}