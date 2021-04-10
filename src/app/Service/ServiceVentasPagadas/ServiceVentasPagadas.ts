


import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IVenta } from "src/app/Model/Venta/Venta";
import { IVentasPagadas } from "src/app/Model/VentasPagadas/IVentasPagadas";

import { UriJava } from "src/app/URISERVER/UriJava";



// import { ServiceAppService } from "../service-app.service";


export class ServiceVentasPagadas
{
    
    constructor(private http: HttpClient, private uriServer: string ){}
    
    
 
     obtenerVentasPagadas()
    {
        return this.http.get(`${this.uriServer}/ventas`);
    }
    guardarVentasPagadas( ventasPagadas: IVentasPagadas ): Observable<any>
    {
     
        return this.http.post( `${this.uriServer}/ventaspagadas/guardarventapagada`, ventasPagadas );
    }

    // ------------------------------------------------------------------------------------------------------------- //
    guardarVentasPagadasNew( ventasPagadas: IVentasPagadas ): Observable<IVentasPagadas>
    {
     
        return this.http.post<IVentasPagadas>( `${this.uriServer}/ventaspagadas/guardarventapagada`, ventasPagadas );
    }
    // ------------------------------------------------------------------------------------------------------------- //

    guardarVentasPagadasUpdate( ventasPagadas: IVentasPagadas ): Observable<IVentasPagadas>
    {
     
        console.log(ventasPagadas, " ven pag");
        return this.http.put<IVentasPagadas>( `${this.uriServer}/ventaspagadas/actualizarpago/${ventasPagadas.venta.id}`, ventasPagadas );
    }

    guardarVentaPagadaNew( ventasPagadas: IVentasPagadas ): Observable<any>
    {
        return this.http.post( `${this.uriServer}/ventaspagadas/guardarventapagada`, ventasPagadas );
    }


}