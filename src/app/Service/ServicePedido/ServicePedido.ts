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

    constructor(private http: HttpClient, private uriServer: string ){}
    
    
 
     obtenerPedidos(): Observable<IPedido[]>
    {
        return this.http.get<IPedido[]>(`${this.uriServer}/pedidos`);
    }
    guardarPedido( pedido: IPedido ): Observable<IPedido>
    {
        return this.http.post<IPedido>(`${this.uriServer}/pedidos/guardarPedido`, pedido);
    }


}