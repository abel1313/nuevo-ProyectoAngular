import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UriJava } from "src/app/URISERVER/UriJava";
import { EventEmitter } from "@angular/core";
import { IPedido } from "src/app/Model/Pedidos/IPedido";



// import { ServiceAppService } from "../service-app.service";


export class ServicePedido
{
    
    // ventaCliente$ = new EventEmitter<ICliente>();
    // ventaRes$ = new EventEmitter<ICliente>();

    // direccion$ = new EventEmitter<IDireccion>();

    constructor(private http: HttpClient){}
    
    private uri = new UriJava();
 
     obtenerPedidos(): Observable<IPedido[]>
    {
        return this.http.get<IPedido[]>(`${this.uri.UriJavaFerreteria}/pedidos`);
    }
    guardarPedido( pedido: IPedido ): Observable<IPedido>
    {
       
        return this.http.post<IPedido>(`${this.uri.UriJavaFerreteria}/ventas/`, pedido);
    }


}